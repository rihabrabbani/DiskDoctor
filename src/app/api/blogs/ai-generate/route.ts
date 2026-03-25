import { NextRequest, NextResponse } from 'next/server';
import { getAISettings, analyzeBlogsAndSuggestTopic, generateBlogContent, generateFeaturedImage } from '@/lib/openai';
import clientPromise, { DB_NAME, COLLECTION_NAME } from '@/lib/mongodb';
import { AIGenerateRequest } from '@/lib/types';
import { generateUniqueSlug, calculateReadingTime, calculateWordCount } from '@/lib/slugify';
import { DEFAULT_AUTHOR } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

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
                const sendUpdate = (step: number, message: string, blog?: any, draftId?: string) => {
                    const payload: Record<string, any> = { step, message };
                    if (blog) payload.blog = blog;
                    if (draftId) payload.draftId = draftId;
                    const data = JSON.stringify(payload);
                    controller.enqueue(encoder.encode(`data: ${data}\n\n`));
                };

                let telemetryMode = mode;
                let telemetryTopic = topic;
                let draftId = uuidv4();
                
                // Track usage across steps
                let tokenUsage = { promptTokens: 0, completionTokens: 0, totalTokens: 0 };
                let imagesGenerated = 0;
                
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
                        telemetryTopic = finalTopic;
                        
                        // Accumulate ideation tokens
                        if (suggestion.usage) {
                            tokenUsage.promptTokens += suggestion.usage.promptTokens;
                            tokenUsage.completionTokens += suggestion.usage.completionTokens;
                            tokenUsage.totalTokens += suggestion.usage.totalTokens;
                        }
                    } else if (!finalTopic) {
                        throw new Error('Topic is required for guided mode');
                    }

                    // ====== PROGRESSIVE SAVE 1: INITIAL DRAFT CREATION ======
                    
                    const initialSlug = finalTopic ? await generateUniqueSlug(finalTopic, blogsCollection) : `draft-${draftId}`;

                    const draftBlog = {
                        id: draftId,
                        slug: initialSlug,
                        title: finalTopic || 'Drafting...',
                        sections: [],
                        faqs: [],
                        keyTakeaways: [],
                        excerpt: '',
                        metaDescription: '',
                        focusKeyword: finalNotes || '',
                        author: DEFAULT_AUTHOR,
                        category: 'Data Recovery',
                        tags: [],
                        featuredImage: null,
                        images: [],
                        status: 'draft' as const,
                        scheduledAt: null,
                        readingTime: 0,
                        wordCount: 0,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    };

                    await blogsCollection.insertOne(draftBlog);
                    console.log(`[AI Gen] Progressive Save 1: Empty Draft created with id: ${draftId}`);

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
                            tavilyApiKey: settings.tavilyApiKey || '',
                            onProgress: (step: number, message: string) => {
                                sendUpdate(step, message);
                            }
                        }
                    );
                    
                    if (generatedBlog.usage) {
                        tokenUsage.promptTokens += generatedBlog.usage.promptTokens;
                        tokenUsage.completionTokens += generatedBlog.usage.completionTokens;
                        tokenUsage.totalTokens += generatedBlog.usage.totalTokens;
                    }

                    console.log(`[AI Gen] Generated blog titled "${generatedBlog.title}". Section count: ${generatedBlog.sections.length}.`);

                    // Generate final Slug
                    const slug = await generateUniqueSlug(generatedBlog.title, blogsCollection);

                    // ====== PROGRESSIVE SAVE 2: UPDATE WITH TEXT CONTENT BEFORE GENERATING EXPENSIVE IMAGES ======
                    const fullTextContent = generatedBlog.sections
                        .map((section: any) => `${section.heading || ''} ${(section.content || '').replace(/<[^>]*>/g, ' ')}`)
                        .join(' ')
                        .replace(/\s+/g, ' ')
                        .trim();

                    await blogsCollection.updateOne({ id: draftId }, {
                        $set: {
                            slug,
                            title: generatedBlog.title,
                            sections: generatedBlog.sections,
                            faqs: generatedBlog.faqs,
                            keyTakeaways: generatedBlog.keyTakeaways || [],
                            excerpt: generatedBlog.excerpt,
                            metaDescription: generatedBlog.metaDescription,
                            focusKeyword: generatedBlog.focusKeyword,
                            category: generatedBlog.category || 'Data Recovery',
                            tags: generatedBlog.tags || [],
                            readingTime: calculateReadingTime(fullTextContent),
                            wordCount: calculateWordCount(fullTextContent),
                            updatedAt: new Date().toISOString()
                        }
                    });
                    console.log(`[AI Gen] Progressive Save 2: Draft ${draftId} securely updated with text generation progress.`);


                    // Step 4: Concurrent Media Generation
                    sendUpdate(4, "Generating highly-detailed media assets in parallel...");
                    let featuredImage = '';
                    let imageTokenUsage = { inputTokens: 0, outputTokens: 0 };
                    
                    try {
                        const imagePromises: Promise<void>[] = [];
                        
                        // 1. Queue Featured Image
                        const featuredPromise = generateFeaturedImage(
                            settings.apiKey,
                            settings.imageModel || 'gpt-image-1-mini',
                            generatedBlog.title,
                            generatedBlog.excerpt
                        ).then(result => {
                            featuredImage = result.url;
                            imageTokenUsage.inputTokens += result.usage.inputTokens;
                            imageTokenUsage.outputTokens += result.usage.outputTokens;
                        }).catch(e => console.error('Featured Img Error:', e));
                        
                        imagePromises.push(featuredPromise);
                        
                        // 2. Queue Inline Images
                        let inlineCount = 0;
                        for (const section of generatedBlog.sections) {
                            if (section.imagePrompt && inlineCount < 2) {
                                const p = generateFeaturedImage(
                                    settings.apiKey,
                                    settings.imageModel || 'gpt-image-1-mini',
                                    "Inline Blog Image",
                                    section.imagePrompt,
                                    true
                                ).then(result => {
                                    section.image = result.url;
                                    imagesGenerated++;
                                    imageTokenUsage.inputTokens += result.usage.inputTokens;
                                    imageTokenUsage.outputTokens += result.usage.outputTokens;
                                }).catch(e => console.error('Inline Img Error:', e));
                                imagePromises.push(p);
                                inlineCount++;
                            }
                        }
                        
                        // Execute all image generations at the exact same time
                        await Promise.all(imagePromises);
                    } catch (mediaError: any) {
                        console.error('Error during concurrent media generation:', mediaError);
                    }

                    // Step 5: Finalizing and auto-saving draft to MongoDB
                    sendUpdate(5, "Finalizing assets and saving draft...");

                    const inlineImages = generatedBlog.sections
                        .map((section: any) => section?.image)
                        .filter((img: any): img is string => typeof img === 'string' && img.length > 0);

                    // ====== PROGRESSIVE SAVE 3: FINAL MEDIA INJECTION ======
                    await blogsCollection.updateOne({ id: draftId }, {
                        $set: {
                            featuredImage: featuredImage || null,
                            images: [...new Set(inlineImages)],
                            sections: generatedBlog.sections,
                            updatedAt: new Date().toISOString()
                        }
                    });
                    console.log(`[AI Gen] Progressive Save 3: Media finalized. Draft fully saved with id: ${draftId}`);
                    
                    if (featuredImage) imagesGenerated++;

                    // LOG TELEMETRY FOR SUCCESS
                    const aiLogsCollection = db.collection('ai_logs');
                    await aiLogsCollection.insertOne({
                        draftId,
                        timestamp: new Date().toISOString(),
                        model: settings.model || 'gpt-4o',
                        imageModel: settings.imageModel || 'gpt-image-1-mini',
                        promptTokens: tokenUsage.promptTokens,
                        completionTokens: tokenUsage.completionTokens,
                        totalTokens: tokenUsage.totalTokens,
                        imageInputTokens: imageTokenUsage.inputTokens,
                        imageOutputTokens: imageTokenUsage.outputTokens,
                        imageCount: imagesGenerated,
                        topic: telemetryTopic,
                        mode: telemetryMode,
                        status: 'success',
                        error: null
                    });
                    console.log(`[AI Gen] Telemetry Log saved for successful draft ${draftId}`);

                    // Send only draft id (not full payload) to prevent client-side loss and large SSE payloads
                    sendUpdate(5, "Draft saved. Opening editor...", undefined, draftId);
                    
                } catch (streamError: any) {
                    console.error('Error in streaming AI blog generation:', streamError);
                    
                    // LOG TELEMETRY FOR FAILURE
                    try {
                        const aiLogsCollection = db.collection('ai_logs');
                        await aiLogsCollection.insertOne({
                            draftId,
                            timestamp: new Date().toISOString(),
                            model: settings.model || 'gpt-4o',
                            imageModel: settings.imageModel || 'gpt-image-1-mini',
                            promptTokens: tokenUsage.promptTokens,
                            completionTokens: tokenUsage.completionTokens,
                            totalTokens: tokenUsage.totalTokens,
                            imageCount: imagesGenerated,
                            topic: telemetryTopic,
                            mode: telemetryMode,
                            status: 'failed',
                            error: streamError?.message || 'Unknown stream error'
                        });
                        console.log(`[AI Gen] Telemetry Log saved for failed draft ${draftId}`);
                    } catch (logErr) {
                        console.error('Failed to write telemetry failure log:', logErr);
                    }

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
