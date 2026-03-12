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

        const encoder = new TextEncoder();

        const stream = new ReadableStream({
            async start(controller) {
                const sendUpdate = (step: number, message: string, blog?: any) => {
                    const data = JSON.stringify({ step, message, blog });
                    controller.enqueue(encoder.encode(`data: ${data}\n\n`));
                };

                try {
                    let finalTopic = topic;
                    let finalNotes = notes;

                    // Step 1: Ideation (MagicAI mode)
                    if (mode === 'magic') {
                        sendUpdate(1, "Analyzing existing blogs and ideating a highly-ranking topic...");
                        const suggestion = await analyzeBlogsAndSuggestTopic(
                            settings.apiKey,
                            settings.model || 'gpt-4o',
                            existingTitles
                        );
                        finalTopic = suggestion.title;
                        finalNotes = suggestion.focusKeyword; 
                    } else if (!finalTopic) {
                        throw new Error('Topic is required for guided mode');
                    }

                    // Step 2 & 3: Research and Drafting
                    const generatedBlog = await generateBlogContent(
                        settings.apiKey,
                        settings.model || 'gpt-4o',
                        {
                            mode,
                            topic: finalTopic,
                            notes: finalNotes,
                            targetWordCount: targetWordCount || 1200,
                            existingTitles,
                            onProgress: (step: number, message: string) => {
                                sendUpdate(step, message);
                            }
                        }
                    );

                    console.log(`[AI Gen] Generated blog titled "${generatedBlog.title}". Section count: ${generatedBlog.sections.length}.`);

                    // Generate Slug
                    const slug = await generateUniqueSlug(generatedBlog.title, blogsCollection);

                    // Step 4: Concurrent Media Generation
                    sendUpdate(4, "Generating highly-detailed media assets in parallel...");
                    let featuredImage = '';
                    
                    try {
                        const imagePromises: Promise<void>[] = [];
                        
                        // 1. Queue Featured Image
                        const featuredPromise = generateFeaturedImage(
                            settings.apiKey,
                            settings.imageModel || 'dall-e-3',
                            generatedBlog.title,
                            generatedBlog.excerpt
                        ).then(url => { featuredImage = url; }).catch(e => console.error('Featured Img Error:', e));
                        
                        imagePromises.push(featuredPromise);
                        
                        // 2. Queue Inline Images
                        let inlineCount = 0;
                        for (const section of generatedBlog.sections) {
                            if (section.imagePrompt && inlineCount < 2) {
                                const p = generateFeaturedImage(
                                    settings.apiKey,
                                    settings.imageModel || 'dall-e-3',
                                    "Inline Blog Image",
                                    section.imagePrompt,
                                    true
                                ).then(url => { section.image = url; }).catch(e => console.error('Inline Img Error:', e));
                                imagePromises.push(p);
                                inlineCount++;
                            }
                        }
                        
                        // Execute all image generations at the exact same time
                        await Promise.all(imagePromises);
                    } catch (mediaError: any) {
                        console.error('Error during concurrent media generation:', mediaError);
                    }

                    // Step 5: Finalizing
                    sendUpdate(5, "Finalizing assets...", {
                        ...generatedBlog,
                        slug,
                        featuredImage
                    });
                    
                } catch (streamError: any) {
                    console.error('Error in streaming AI blog generation:', streamError);
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: streamError?.message || 'Failed to generate blog content' })}\n\n`));
                } finally {
                    controller.close();
                }
            }
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });

    } catch (error: any) {
        console.error('Error parsing request:', error);
        return NextResponse.json({ 
            success: false, 
            message: error?.message || 'Bad Request' 
        }, { status: 400 });
    }
}
