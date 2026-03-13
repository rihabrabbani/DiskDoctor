/**
 * OpenAI integration for AI blog generation.
 * Uses GPT-4o for text generation and DALL-E 3 for featured images.
 */

import OpenAI from 'openai';
import clientPromise, { DB_NAME } from './mongodb';
import { uploadImageToDB } from './storage';
import { performWebSearch } from './search';
import { serviceRoutes } from '../data/navigation';
import { locations } from '../data/locations';

const SETTINGS_COLLECTION = 'settings';

// ─── Settings helpers ───

export async function getAISettings() {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const settings = await db.collection(SETTINGS_COLLECTION).findOne({ type: 'ai_config' });
    return settings;
}

export async function saveAISettings(data: {
    apiKey: string;
    model: string;
    imageModel: string;
    tavilyApiKey?: string;
}) {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    await db.collection(SETTINGS_COLLECTION).updateOne(
        { type: 'ai_config' },
        {
            $set: {
                type: 'ai_config',
                provider: 'openai',
                apiKey: data.apiKey,
                model: data.model || 'gpt-4o-mini',
                imageModel: data.imageModel || 'dall-e-3',
                tavilyApiKey: data.tavilyApiKey || '',
                updatedAt: new Date().toISOString(),
            }
        },
        { upsert: true }
    );
}

// ─── OpenAI client ───

export function getOpenAIClient(apiKey: string) {
    return new OpenAI({ apiKey });
}

export async function testConnection(apiKey: string): Promise<boolean> {
    try {
        const client = getOpenAIClient(apiKey);
        await client.models.list();
        return true;
    } catch {
        return false;
    }
}

// ─── Blog Generation ───

const INTERNAL_LINK_MAP: Record<string, string> = {
    'Contact DiskDoctor': '/contact',
    'All Locations': '/locations',
    'DiskDoctor Blog': '/blog',
    ...Object.fromEntries(serviceRoutes.map((route) => [route.label, route.href])),
    ...Object.fromEntries(locations.map((location) => [`Data Recovery ${location.fullName}`, `/${location.slug}`])),
};

const INTERNAL_LINK_MAP_STRING = Object.entries(INTERNAL_LINK_MAP)
    .map(([label, url]) => `- "${label}" => ${url}`)
    .join('\n');

const APPROVED_INTERNAL_URLS = new Set(Object.values(INTERNAL_LINK_MAP));

function sanitizeInternalLinks(html: string): { content: string; removed: number } {
    let removed = 0;
    const content = html.replace(
        /<a\b([^>]*?)href=(['"])(.*?)\2([^>]*)>([\s\S]*?)<\/a>/gi,
        (fullMatch, preAttrs, quote, href, postAttrs, innerHtml) => {
            const normalizedHref = String(href || '').split('#')[0].split('?')[0];

            // Only police internal relative paths.
            if (normalizedHref.startsWith('/')) {
                if (!APPROVED_INTERNAL_URLS.has(normalizedHref)) {
                    removed += 1;
                    return innerHtml; // keep visible text, remove bad link wrapper
                }
            }

            return fullMatch;
        }
    );

    return { content, removed };
}

const SYSTEM_PROMPT = `You are a professional SEO blog writer for DiskDoctor Data Recovery (diskdoctorsamerica.com).

DiskDoctor is a data recovery company based in Columbia, Maryland and Tysons, Virginia. They specialize in:
- Hard drive recovery (HDD, SSD, NVMe)
- RAID array recovery
- Mobile device data recovery (iPhone, Android)
- Server and enterprise recovery
- Forensic data recovery
- Flash drive and memory card recovery

They have a 95% success rate, offer free evaluations, and have been operating since 1991.

WRITING GUIDELINES:
- Write in a professional but accessible tone
- Target 1000-1500 words unless told otherwise
- Use proper HTML formatting: <h2> for sections, <h3> for subsections, <p> for paragraphs, <ul>/<ol> for lists, <strong> for emphasis
- Wrap EVERY text block in <p> tags. DO NOT use raw text or \n spacing.
- Keep paragraphs extremely short (2-3 sentences max) for high readability.
- Use bullet points and bold text frequently to make the content scannable.

REQUIRED BLOG STRUCTURE:
1. Compelling Introduction: Hook the reader and introduce the problem.
2. The Core Issue: Explain the "Why/What" simply.
3. Actionable Steps/Guide: The main body, heavily utilizing H2/H3 headings and bulleted lists.
4. Prevention & Tips: Give extra value to the reader.
5. Conclusion & Call-to-Action: Summarize, and advise them to contact DiskDoctor for a free evaluation if they need professional help.

SEO GUIDELINES:
- Include the focus keyword in the first 100 words
- Use the focus keyword 3-5 times naturally throughout
- Structure with H2 → H3 heading hierarchy
- Use bullet points and numbered lists for readability

INTERNAL LINKING (CRITICAL):
- When writing internal HTML <a> links, you MUST ONLY use the URLs from the approved link map below.
- NEVER invent, modify, or guess internal URLs.
- NEVER use full domain URLs for internal links; use relative paths exactly as listed.

APPROVED INTERNAL LINK MAP:
${INTERNAL_LINK_MAP_STRING}`;

interface GenerateBlogParams {
    mode: 'guided' | 'magic';
    topic?: string;
    notes?: string;
    targetWordCount?: number;
    existingTitles?: string[];
    tavilyApiKey?: string;
    onProgress?: (step: number, message: string) => void;
}

interface GeneratedBlog {
    title: string;
    excerpt: string;
    sections: any[];
    faqs: any[];
    keyTakeaways?: string[];
    metaDescription: string;
    focusKeyword: string;
    category: string;
    tags: string[];
}

export async function analyzeBlogsAndSuggestTopic(
    apiKey: string,
    model: string,
    existingTitles: string[]
): Promise<{ title: string; focusKeyword: string; reasoning: string }> {
    const client = getOpenAIClient(apiKey);

    const existingList = existingTitles.length > 0
        ? existingTitles.map((t, i) => `${i + 1}. ${t}`).join('\n')
        : 'No existing blog posts yet.';

    const response = await client.chat.completions.create({
        model,
        messages: [
            {
                role: 'system',
                content: `You are an SEO content strategist for DiskDoctor Data Recovery. Your job is to suggest the BEST next blog post topic.

Consider:
- What topics would attract people searching for data recovery help
- High-intent keywords (people actively needing recovery services)
- Problem-aware keywords (people experiencing data loss symptoms)  
- Educational content that builds authority
- Local SEO opportunities (Maryland, Virginia, DC area)
- Current trends in data recovery, cybersecurity, and digital storage

IMPORTANT: The topic must be DIFFERENT from all existing blog posts listed below.`
            },
            {
                role: 'user',
                content: `Here are our existing blog posts:\n\n${existingList}\n\nSuggest the single best next blog post topic. Consider what's missing, what would be valuable for our audience, and what has good search potential.

Respond in this exact JSON format:
{
  "title": "The suggested blog post title (50-60 chars, compelling, keyword-rich)",
  "focusKeyword": "the primary SEO keyword to target (2-4 words)",
  "reasoning": "Brief explanation of why this topic (1-2 sentences)"
}`
            }
        ],
        temperature: 0.8,
        response_format: { type: 'json_object' },
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return {
        title: result.title || 'Untitled',
        focusKeyword: result.focusKeyword || '',
        reasoning: result.reasoning || '',
    };
}

export async function generateBlogContent(
    apiKey: string,
    model: string,
    params: GenerateBlogParams
): Promise<GeneratedBlog> {
    const client = getOpenAIClient(apiKey);

    const wordCount = params.targetWordCount || 1200;

    let userPrompt = '';

    if (params.mode === 'guided') {
        userPrompt = `Write a blog post about: "${params.topic}"
${params.notes ? `Additional instructions: ${params.notes}` : ''}
Target approximately ${wordCount} words.`;
    } else {
        userPrompt = `Write a blog post with the title: "${params.topic}"
Focus keyword: "${params.notes || ''}"
Target approximately ${wordCount} words.`;
    }

    if (params.existingTitles && params.existingTitles.length > 0) {
        userPrompt += `\n\nExisting blog posts (for context, avoid repeating their content):\n${params.existingTitles.slice(0, 15).map(t => `- ${t}`).join('\n')}`;
    }

    params.onProgress?.(2, "Generating highly specific Wikipedia search queries...");

    // --- DEEP RESEARCH STEP 1: GENERATE DATA-DRIVEN QUERIES ---
    const queryPrompt = `You are a Senior SEO Researcher. To write an authoritative, factual article about "${params.topic}", you need hard data.
Do NOT search for broad topics. You must search for specific, highly-citable data points that would exist in an encyclopedia.
Return exactly 3 highly specific Wikipedia search queries. Examples:
- "Hard disk drive failure rates"
- "Ransomware statistics timeline"
- "Data recovery forensic methods"

Return in exact JSON format:
{ "queries": ["query 1", "query 2", "query 3"] }`;

    let searchResultsContext = '';
    try {
        const queryResponse = await client.chat.completions.create({
            model,
            messages: [{ role: 'system', content: queryPrompt }],
            temperature: 0.5,
            response_format: { type: 'json_object' }
        });
        const queryObj = JSON.parse(queryResponse.choices[0].message.content || '{}');
        
        // --- DEEP RESEARCH STEP 2: EXECUTE SEARCHES ---
        if (queryObj.queries && Array.isArray(queryObj.queries)) {
            console.log(`[Deep Research] Executing searches:`, queryObj.queries);
            params.onProgress?.(2, `Executing Deep Web Research for citations...`);
            const searchPromises = queryObj.queries.map((q: string) =>
                performWebSearch(params.tavilyApiKey || '', q, 5)
            );
            const resultsNested = await Promise.all(searchPromises);
            const flatResults = resultsNested.flat();
            
            if (flatResults.length > 0) {
                searchResultsContext = `\n\nLIVE WEB RESEARCH CONTEXT (Use this to cite facts, statistics, and align with competitor content):\n`;
                flatResults.forEach((res, i) => {
                    searchResultsContext += `Source ${i+1}: ${res.title}\nURL: ${res.url}\nExcerpt: ${res.snippet}\n\n`;
                });
                console.log(`[Deep Research] Gathered ${flatResults.length} live snippets.`);
            }
        }
    } catch (error) {
        console.error('[Deep Research] Failed to perform web search phase:', error);
    }
    
    userPrompt += searchResultsContext;

        userPrompt += `\n\nCRITICAL INSTRUCTION:
    INLINE IMAGES: In at least 2 of your sections, you MUST provide an "imagePrompt" string describing a contextual photo for that section. Example: "A highly detailed close-up of a scratched HDD platter". We will generate an AI image from this prompt and place it at the beginning of the section.
    
    STATISTICS & QUOTES: You MUST extract at least 2 specific statistics or direct quotes from the LIVE WEB RESEARCH CONTEXT. Put these in the top-level "statistics" JSON array. We will format them automatically. Do NOT put them in the section content.

    INTERNAL LINKS: You MUST organically include at least 2 internal HTML <a> hyperlinks in your "sections.content".
    You are STRICTLY FORBIDDEN from inventing URLs.
    You MUST ONLY use URLs from this approved internal link map:
    ${INTERNAL_LINK_MAP_STRING}
    Correct example: <a href="/services/raid-recovery">RAID data recovery</a>
    Wrong example (NEVER): <a href="/services/my-custom-recovery-url">...</a>`;

    params.onProgress?.(3, "Drafting SEO-optimized content, layout, and takeaways. This may take a minute...");

    const response = await client.chat.completions.create({
        model,
        messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 8192,
        response_format: {
            type: 'json_schema',
            json_schema: {
                name: 'blog_payload',
                strict: true,
                schema: {
                    type: 'object',
                    additionalProperties: false,
                    properties: {
                        title: { type: 'string' },
                        excerpt: { type: 'string' },
                        metaDescription: { type: 'string' },
                        focusKeyword: { type: 'string' },
                        category: {
                            type: 'string',
                            enum: ['Data Recovery', 'Tips & Guides', 'Technology', 'Business', 'News', 'Case Studies'],
                        },
                        tags: {
                            type: 'array',
                            items: { type: 'string' },
                        },
                        keyTakeaways: {
                            type: 'array',
                            items: { type: 'string' },
                        },
                        sections: {
                            type: 'array',
                            items: {
                                type: 'object',
                                additionalProperties: false,
                                properties: {
                                    heading: { type: 'string' },
                                    content: { type: 'string' },
                                    imagePrompt: {
                                        anyOf: [{ type: 'string' }, { type: 'null' }],
                                    },
                                    insertCtaAfter: { type: 'boolean' },
                                },
                                required: ['heading', 'content', 'imagePrompt', 'insertCtaAfter'],
                            },
                        },
                        statistics: {
                            type: 'array',
                            items: {
                                type: 'object',
                                additionalProperties: false,
                                properties: {
                                    quote: { type: 'string' },
                                    sourceName: { type: 'string' },
                                    sourceUrl: { type: 'string' },
                                },
                                required: ['quote', 'sourceName', 'sourceUrl'],
                            },
                        },
                        faqs: {
                            type: 'array',
                            items: {
                                type: 'object',
                                additionalProperties: false,
                                properties: {
                                    question: { type: 'string' },
                                    answer: { type: 'string' },
                                },
                                required: ['question', 'answer'],
                            },
                        },
                    },
                    required: [
                        'title',
                        'excerpt',
                        'metaDescription',
                        'focusKeyword',
                        'category',
                        'tags',
                        'keyTakeaways',
                        'sections',
                        'statistics',
                        'faqs',
                    ],
                },
            },
        },
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');

    // 1. Process Sections & Generate Inline Images natively within the JSON array
    if (result.sections && Array.isArray(result.sections)) {
        let imageCount = 0;
        for (let i = 0; i < result.sections.length; i++) {
            const section = result.sections[i];
            
            // Assign a unique ID for React rendering
            section.id = 'sec_' + Date.now() + '_' + i;

            // Enforce zero-hallucination internal links (only allow approved map URLs)
            if (typeof section.content === 'string' && section.content.length > 0) {
                const sanitized = sanitizeInternalLinks(section.content);
                section.content = sanitized.content;
                if (sanitized.removed > 0) {
                    console.warn(`[Internal Link Guard] Removed ${sanitized.removed} invalid internal link(s) from section ${i + 1}.`);
                }
            }
            
            // We now leave inline image generation up to the API route to handle concurrently via Promise.all
            
            // Inject one statistic at the end of the section if available
            if (result.statistics && Array.isArray(result.statistics) && i < result.statistics.length) {
                const stat = result.statistics[i];
                 if (stat.quote && stat.sourceUrl) {
                    const statHtml = `\n<blockquote class="p-6 my-8 border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-900 dark:text-indigo-100 rounded-lg shadow-sm font-medium italic">\n"${stat.quote}"\n<br><span class="text-sm font-normal text-indigo-600 dark:text-indigo-400 mt-2 block">— <a href="${stat.sourceUrl}" target="_blank" rel="noopener noreferrer" class="underline hover:text-indigo-800">${stat.sourceName || 'Source'}</a></span>\n</blockquote>\n\n`;
                    section.content = section.content + statHtml;
                 }
            }
        }
    }

    // 2. Process FAQs natively
    if (result.faqs && Array.isArray(result.faqs)) {
        for (let i = 0; i < result.faqs.length; i++) {
           result.faqs[i].id = 'faq_' + Date.now() + '_' + i;
        }
    }

    return {
        title: result.title || params.topic || 'Untitled',
        excerpt: result.excerpt || '',
        sections: result.sections || [],
        faqs: result.faqs || [],
        keyTakeaways: result.keyTakeaways || [],
        metaDescription: result.metaDescription || '',
        focusKeyword: result.focusKeyword || '',
        category: result.category || 'Data Recovery',
        tags: Array.isArray(result.tags) ? result.tags : [],
    };
}

// ─── Image Generation ───

export async function generateFeaturedImage(
    apiKey: string,
    model: string,
    title: string,
    excerpt: string,
    isInline: boolean = false
): Promise<string> {
    const client = getOpenAIClient(apiKey);

    let prompt = '';
    
    if (isInline) {
        prompt = `A hyper-realistic, high-end product photograph of: ${excerpt}. The subject MUST be completely isolated on a pure, solid white background layer. Clean, minimalist studio lighting, extreme detail. Absolutely no text, words, watermarks, or logos in the image.`;
    } else {
        prompt = `A highly realistic, premium editorial photograph representing the concept of: "${title}". Context: ${excerpt}. Cinematic lighting, shallow depth of field, high-end corporate technology photography style. Realistic textures and natural colors. Absolutely no text, words, watermarks, or logos in the image.`;
    }

    const response = await client.images.generate({
        model: model || 'dall-e-3',
        prompt,
        n: 1,
        quality: 'hd',
        style: 'natural',
        size: isInline ? '1024x1024' : '1792x1024',
        response_format: 'b64_json',
    });

    const b64Json = response.data?.[0]?.b64_json;
    if (!b64Json) {
        throw new Error('No image returned from OpenAI');
    }

    const buffer = Buffer.from(b64Json, 'base64');
    
    const filename = `blog_ai_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.png`;
    const imageUrl = await uploadImageToDB(buffer, 'image/png', filename);

    return imageUrl;
}
