import { NextRequest, NextResponse } from 'next/server';
import { getAISettings, analyzeBlogsAndSuggestTopic, generateBlogContent, generateFeaturedImage } from '@/lib/openai';
import clientPromise, { DB_NAME, COLLECTION_NAME } from '@/lib/mongodb';
import { AIGenerateRequest } from '@/lib/types';
import { generateUniqueSlug } from '@/lib/slugify';

export async function POST(request: NextRequest) {
    try {
        const settings = await getAISettings();
        if (!settings || !settings.apiKey) {
            return NextResponse.json({ success: false, message: 'OpenAI API key not configured. Please set it in AI Settings.' }, { status: 401 });
        }

        const body: AIGenerateRequest = await request.json();
        const { mode, topic, notes, targetWordCount } = body;

        const client = await clientPromise;
        const db = client.db(DB_NAME);
        const blogsCollection = db.collection(COLLECTION_NAME);

        // Fetch existing blog titles for context/uniqueness
        const existingBlogs = await blogsCollection.find({}, { projection: { title: 1 } }).toArray();
        const existingTitles = existingBlogs.map(b => b.title);

        let finalTopic = topic;
        let finalNotes = notes;

        // MagicAI mode: suggest a unique topic first
        if (mode === 'magic') {
            const suggestion = await analyzeBlogsAndSuggestTopic(
                settings.apiKey,
                settings.model || 'gpt-4o',
                existingTitles
            );
            
            finalTopic = suggestion.title;
            finalNotes = suggestion.focusKeyword; // use focus keyword as guidance
        } else if (!finalTopic) {
            return NextResponse.json({ success: false, message: 'Topic is required for guided mode' }, { status: 400 });
        }

        // Generate Text Content
        const generatedBlog = await generateBlogContent(
            settings.apiKey,
            settings.model || 'gpt-4o',
            {
                mode,
                topic: finalTopic,
                notes: finalNotes,
                targetWordCount: targetWordCount || 1200,
                existingTitles
            }
        );

        console.log(`[AI Gen] Generated blog titled "${generatedBlog.title}". Section count: ${generatedBlog.sections.length}.`);

        // Generate Slug
        const slug = await generateUniqueSlug(generatedBlog.title, blogsCollection);

        // Generate Image using DALL-E 3
        let featuredImage = '';
        try {
            featuredImage = await generateFeaturedImage(
                settings.apiKey,
                settings.imageModel || 'dall-e-3',
                generatedBlog.title,
                generatedBlog.excerpt
            );
        } catch (imgError: any) {
            console.error('Error generating image:', imgError?.message || imgError);
            console.error('Cloudinary vars:', {
                cloudName: process.env.CLOUDINARY_CLOUD_NAME ? 'set' : 'missing',
                apiKey: process.env.CLOUDINARY_API_KEY ? 'set' : 'missing',
                apiSecret: process.env.CLOUDINARY_API_SECRET ? 'set' : 'missing'
            });
            // We just leave featuredImage empty if it fails
        }

        return NextResponse.json({
            success: true,
            blog: {
                ...generatedBlog,
                slug,
                featuredImage
            }
        });

    } catch (error: any) {
        console.error('Error in AI blog generation:', error);
        return NextResponse.json({ 
            success: false, 
            message: error?.message || 'Failed to generate blog content' 
        }, { status: 500 });
    }
}
