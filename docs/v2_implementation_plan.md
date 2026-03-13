# DiskDoctor AI Blog Generation — V2 Implementation Plan

**Date:** March 2026  
**Scope:** Four architecture upgrades to the AI blog generation pipeline.  
**Key constraint:** No Vercel environment variable access — all secrets stored in MongoDB `settings` collection.

---

## Overview of Changes

| # | Feature | Files Modified |
|---|---------|---------------|
| 1 | Tavily Search API Integration | `src/lib/search.ts`, `src/lib/openai.ts`, `src/app/api/admin/ai-settings/route.ts`, `src/app/admin/dashboard/page.tsx`, `src/app/api/blogs/ai-generate/route.ts` |
| 2 | Zero-Hallucination Internal Backlinking | `src/lib/openai.ts` |
| 3 | JSON Integrity & Token Limit | `src/lib/openai.ts` |
| 4 | Auto-Save Draft to MongoDB | `src/app/api/blogs/ai-generate/route.ts`, `src/app/admin/dashboard/page.tsx`, `src/app/admin/editor/page.tsx` |

---

## Feature 1 — Integrate Tavily Search API

### How Tavily Works
- **Endpoint:** `POST https://api.tavily.com/search`
- **Auth:** `Authorization: Bearer <tavilyApiKey>` header
- **Key params:** `query`, `search_depth: "basic"` (1 credit), `include_answer: true`, `max_results: 5`
- **Response shape:**
```json
{
  "answer": "LLM-synthesized answer to the query",
  "results": [
    { "title": "...", "url": "https://...", "content": "NLP snippet ~300 chars", "score": 0.92 }
  ]
}
```

The `answer` field is an LLM-written synthesis — far superior to a Wikipedia snippet. We inject both `answer` and the individual `results` into the research context.

---

### 1.1 — Replace `src/lib/search.ts`

Full replacement. The new function accepts `tavilyApiKey` as its first argument. If the key is absent, it falls back to the Wikipedia API so the system degrades gracefully.

```typescript
// src/lib/search.ts

export interface SearchResult {
    title: string;
    url: string;
    snippet: string;
}

/**
 * Performs a web search using the Tavily Search API.
 * Falls back to Wikipedia if no Tavily key is provided.
 * 
 * Tavily API docs: https://docs.tavily.com/documentation/api-reference/endpoint/search
 * Auth: Bearer token in Authorization header.
 * Cost: 1 API credit per request on search_depth: "basic".
 */
export async function performWebSearch(
    tavilyApiKey: string,
    query: string,
    limit: number = 5
): Promise<SearchResult[]> {

    // ── Tavily path ──────────────────────────────────────────────
    if (tavilyApiKey) {
        try {
            const response = await fetch('https://api.tavily.com/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tavilyApiKey}`,
                },
                body: JSON.stringify({
                    query,
                    search_depth: 'basic',
                    include_answer: true,
                    max_results: limit,
                    topic: 'general',
                }),
            });

            if (!response.ok) {
                const err = await response.text();
                console.error(`[Tavily] Search failed (${response.status}):`, err);
                // Fall through to Wikipedia fallback
            } else {
                const data = await response.json();
                const results: SearchResult[] = [];

                // Inject the synthesized answer as a premium first result
                if (data.answer) {
                    results.push({
                        title: `Tavily AI Answer for: "${query}"`,
                        url: 'https://tavily.com',
                        snippet: data.answer,
                    });
                }

                if (data.results && Array.isArray(data.results)) {
                    data.results.forEach((item: any) => {
                        if (item.url && item.content) {
                            results.push({
                                title: item.title || item.url,
                                url: item.url,
                                snippet: item.content,
                            });
                        }
                    });
                }

                console.log(`[Tavily] Got ${results.length} results for: "${query}"`);
                return results;
            }
        } catch (error) {
            console.error('[Tavily] Fetch error, falling back to Wikipedia:', error);
        }
    }

    // ── Wikipedia fallback ───────────────────────────────────────
    console.warn('[Search] No Tavily key — falling back to Wikipedia API.');
    try {
        const fetchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&srlimit=${limit}`;
        const response = await fetch(fetchUrl, {
            headers: { 'User-Agent': 'DiskDoctorBot/2.0 (diskdoctorsamerica.com)' },
        });
        if (!response.ok) return [];
        const data = await response.json();
        const results: SearchResult[] = [];
        if (data.query?.search) {
            data.query.search.forEach((item: any) => {
                results.push({
                    title: item.title,
                    url: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title.replace(/ /g, '_'))}`,
                    snippet: item.snippet.replace(/<[^>]*>?/gm, '').trim(),
                });
            });
        }
        return results;
    } catch (error) {
        console.error('[Wikipedia fallback] Error:', error);
        return [];
    }
}
```

---

### 1.2 — Update `src/lib/openai.ts` — Settings helpers + `GenerateBlogParams`

#### 1.2a — Update `saveAISettings` to persist `tavilyApiKey`

**File:** `src/lib/openai.ts`

Find the `saveAISettings` function and replace it:

```typescript
// BEFORE:
export async function saveAISettings(data: {
    apiKey: string;
    model: string;
    imageModel: string;
}) {

// AFTER:
export async function saveAISettings(data: {
    apiKey: string;
    model: string;
    imageModel: string;
    tavilyApiKey?: string;
}) {
```

And inside the `$set` block, add `tavilyApiKey`:

```typescript
// BEFORE:
            $set: {
                type: 'ai_config',
                provider: 'openai',
                apiKey: data.apiKey,
                model: data.model || 'gpt-4o-mini',
                imageModel: data.imageModel || 'dall-e-3',
                updatedAt: new Date().toISOString(),
            }

// AFTER:
            $set: {
                type: 'ai_config',
                provider: 'openai',
                apiKey: data.apiKey,
                model: data.model || 'gpt-4o-mini',
                imageModel: data.imageModel || 'dall-e-3',
                tavilyApiKey: data.tavilyApiKey || '',
                updatedAt: new Date().toISOString(),
            }
```

#### 1.2b — Update `GenerateBlogParams` interface to accept `tavilyApiKey`

Find the `interface GenerateBlogParams` block and replace it:

```typescript
// BEFORE:
interface GenerateBlogParams {
    mode: 'guided' | 'magic';
    topic?: string;
    notes?: string;
    targetWordCount?: number;
    existingTitles?: string[];
    onProgress?: (step: number, message: string) => void;
}

// AFTER:
interface GenerateBlogParams {
    mode: 'guided' | 'magic';
    topic?: string;
    notes?: string;
    targetWordCount?: number;
    existingTitles?: string[];
    tavilyApiKey?: string;          // ← NEW: fetched from MongoDB settings
    onProgress?: (step: number, message: string) => void;
}
```

#### 1.2c — Update the search call inside `generateBlogContent`

Find this line inside `generateBlogContent`:

```typescript
// BEFORE:
const searchPromises = queryObj.queries.map((q: string) => performWebSearch(q, 3));

// AFTER:
const searchPromises = queryObj.queries.map((q: string) =>
    performWebSearch(params.tavilyApiKey || '', q, 5)
);
```

---

### 1.3 — Update `src/app/api/admin/ai-settings/route.ts`

Full replacement of this file:

```typescript
// src/app/api/admin/ai-settings/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getAISettings, saveAISettings, testConnection } from '@/lib/openai';

export async function GET(request: NextRequest) {
    try {
        const settings = await getAISettings();
        if (!settings) {
            return NextResponse.json({
                success: true,
                settings: {
                    apiKey: '',
                    model: 'gpt-4o-mini',
                    imageModel: 'dall-e-3',
                    tavilyApiKey: '',       // ← NEW
                }
            });
        }
        return NextResponse.json({
            success: true,
            settings: {
                apiKey: settings.apiKey,
                model: settings.model || 'gpt-4o-mini',
                imageModel: settings.imageModel || 'dall-e-3',
                tavilyApiKey: settings.tavilyApiKey || '',  // ← NEW
            }
        });
    } catch (error) {
        console.error('Error fetching AI settings:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch settings' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { apiKey, model, imageModel, tavilyApiKey } = body;  // ← tavilyApiKey added

        if (!apiKey) {
            return NextResponse.json(
                { success: false, message: 'OpenAI API Key is required' },
                { status: 400 }
            );
        }

        // Validate OpenAI key
        const isValid = await testConnection(apiKey);
        if (!isValid) {
            return NextResponse.json(
                { success: false, message: 'Invalid OpenAI API Key. Please verify and try again.' },
                { status: 401 }
            );
        }

        // No validation needed for Tavily key — simply store it
        await saveAISettings({ apiKey, model, imageModel, tavilyApiKey });

        return NextResponse.json({
            success: true,
            message: 'AI settings saved successfully',
        });
    } catch (error) {
        console.error('Error saving AI settings:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to save settings' },
            { status: 500 }
        );
    }
}
```

---

### 1.4 — Update `src/app/admin/dashboard/page.tsx` — AI Settings UI

#### 1.4a — Add `aiTavilyKey` state variable

Find the block of AI state declarations near the top of the component and add the new state:

```tsx
// BEFORE:
  const [aiApiKey, setAiApiKey] = useState('');
  const [aiModel, setAiModel] = useState('gpt-4o-mini');
  const [aiImageModel, setAiImageModel] = useState('dall-e-3');

// AFTER:
  const [aiApiKey, setAiApiKey] = useState('');
  const [aiModel, setAiModel] = useState('gpt-4o-mini');
  const [aiImageModel, setAiImageModel] = useState('dall-e-3');
  const [aiTavilyKey, setAiTavilyKey] = useState('');   // ← NEW
```

#### 1.4b — Load `tavilyApiKey` from settings in `fetchAISettings`

```tsx
// BEFORE:
      if (data.success && data.settings) {
        setAiApiKey(data.settings.apiKey);
        setAiModel(data.settings.model || 'gpt-4o-mini');
        setAiImageModel(data.settings.imageModel || 'dall-e-3');
      }

// AFTER:
      if (data.success && data.settings) {
        setAiApiKey(data.settings.apiKey);
        setAiModel(data.settings.model || 'gpt-4o-mini');
        setAiImageModel(data.settings.imageModel || 'dall-e-3');
        setAiTavilyKey(data.settings.tavilyApiKey || '');   // ← NEW
      }
```

#### 1.4c — Include `tavilyApiKey` in `handleSaveSettings` POST body

```tsx
// BEFORE:
        body: JSON.stringify({ apiKey: aiApiKey, model: aiModel, imageModel: aiImageModel })

// AFTER:
        body: JSON.stringify({
          apiKey: aiApiKey,
          model: aiModel,
          imageModel: aiImageModel,
          tavilyApiKey: aiTavilyKey,    // ← NEW
        })
```

#### 1.4d — Add Tavily Key input field inside the AI Settings modal

Find the Image Model `<div>` block inside the settings modal and add the new field **after** it:

```tsx
                {/* ADD THIS ENTIRE BLOCK after the Image Model div */}
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
                    Tavily Search API Key
                    <a
                      href="https://app.tavily.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-xs text-[var(--color-primary)] underline"
                    >
                      Get free key (1,000/mo)
                    </a>
                  </label>
                  <input
                    type="password"
                    value={aiTavilyKey}
                    onChange={e => setAiTavilyKey(e.target.value)}
                    placeholder="tvly-..."
                    className="w-full px-4 py-2.5 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                  />
                  <p className="text-xs text-[var(--color-text-tertiary)] mt-1.5">
                    Powers live SERP research during generation. Falls back to Wikipedia if not set.
                  </p>
                </div>
```

---

### 1.5 — Update `src/app/api/blogs/ai-generate/route.ts` — Pass `tavilyApiKey`

Find the `generateBlogContent(...)` call and add the new param:

```typescript
// BEFORE:
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

// AFTER:
                    const generatedBlog = await generateBlogContent(
                        settings.apiKey,
                        settings.model || 'gpt-4o',
                        {
                            mode,
                            topic: finalTopic,
                            notes: finalNotes,
                            targetWordCount: targetWordCount || 1200,
                            existingTitles,
                            tavilyApiKey: settings.tavilyApiKey || '',   // ← NEW
                            onProgress: (step: number, message: string) => {
                                sendUpdate(step, message);
                            }
                        }
                    );
```

---

## Feature 2 — Zero-Hallucination Internal Backlinking

**Problem:** The model invents URLs like `/services/data-recovery-tips` that return 404s.  
**Solution:** Inject a hard-coded map of every real URL into both the system prompt and the user prompt, with a strict prohibition on inventing URLs.

---

### 2.1 — Add `INTERNAL_LINK_MAP` constant to `src/lib/openai.ts`

Insert this constant **before** the `SYSTEM_PROMPT` declaration:

```typescript
// ─── Internal Link Map ───────────────────────────────────────────────
// This is the ONLY approved list of URLs the AI may use in <a> tags.
// Derived from src/data/navigation.ts and src/data/locations.ts.

export const INTERNAL_LINK_MAP: Record<string, string> = {
    // ── Core Services ─────────────────────────────────────────
    'Hard Drive Data Recovery':     '/services/hard-drive-recovery',
    'SSD Recovery':                 '/services/ssd-recovery',
    'NVMe Recovery':                '/services/ssd-recovery',
    'RAID Recovery':                '/services/raid-recovery',
    'RAID & Server Recovery':       '/services/raid-recovery',
    'Mac Recovery':                 '/services/mac-recovery',
    'Mac Data Recovery':            '/services/mac-recovery',
    'Windows Recovery':             '/services/windows-recovery',
    'Windows Data Recovery':        '/services/windows-recovery',
    'Linux Recovery':               '/services/linux-recovery',
    'UNIX Recovery':                '/services/unix-recovery',
    'Mobile Recovery':              '/services/mobile-recovery',
    'iPhone Data Recovery':         '/services/mobile-recovery',
    'Android Data Recovery':        '/services/mobile-recovery',
    'Photo Recovery':               '/services/photo-recovery',
    'File Recovery':                '/services/file-recovery',
    'Email Recovery':               '/services/email-recovery',
    'Virtual Machine Recovery':     '/services/virtual-recovery',
    'Remote Data Recovery':         '/services/remote-recovery',
    'Data Security':                '/services/data-security',
    'Email Security':               '/services/email-security',
    'Data Backup':                  '/services/data-backup',
    'Data Cloning':                 '/services/data-cloning',
    'Data Duplication':             '/services/data-duplication',
    // ── Location Pages ────────────────────────────────────────
    'Data Recovery Columbia MD':    '/columbia-md',
    'Data Recovery Baltimore MD':   '/baltimore-md',
    'Data Recovery Washington DC':  '/washington-dc',
    'Data Recovery Alexandria VA':  '/alexandria-va',
    'Data Recovery Arlington VA':   '/arlington-va',
    'Data Recovery Rockville MD':   '/rockville-md',
    'Data Recovery Annapolis MD':   '/annapolis-md',
    'Data Recovery Frederick MD':   '/frederick-md',
    'Data Recovery McLean VA':      '/mclean-va',
    'Data Recovery Tysons VA':      '/tysons-va',
    'Data Recovery Great Falls VA': '/great-falls-va',
    'Data Recovery Potomac MD':     '/potomac-md',
    // ── Static Pages ──────────────────────────────────────────
    'Free Evaluation':              '/contact',
    'Contact DiskDoctor':           '/contact',
    'All Locations':                '/locations',
    'Blog':                         '/blog',
};

// Pre-built formatted string injected into prompts
export const INTERNAL_LINK_MAP_STRING = Object.entries(INTERNAL_LINK_MAP)
    .map(([label, url]) => `  - "${label}" → ${url}`)
    .join('\n');
```

---

### 2.2 — Update `SYSTEM_PROMPT` to include the backlinking rule

Find the `SYSTEM_PROMPT` constant and append the new section at the **end of the string**, before the closing backtick:

```typescript
// BEFORE (end of SYSTEM_PROMPT):
- Use bullet points and numbered lists for readability`;

// AFTER:
- Use bullet points and numbered lists for readability

INTERNAL LINKING — CRITICAL RULE:
When you write HTML <a> tags inside section content, you are ONLY permitted to link to URLs from the approved map below. 
DO NOT invent URLs. DO NOT modify or extend any URL in the list.
DO NOT use full domain URLs — use relative paths exactly as shown.

APPROVED INTERNAL LINK MAP:
${INTERNAL_LINK_MAP_STRING}

Example of a CORRECT link: <a href="/services/raid-recovery">RAID data recovery</a>
Example of an INCORRECT link (NEVER DO THIS): <a href="/services/hard-drive-data-recovery-tips">...</a>`;
```

---

### 2.3 — Reinforce in the user prompt injection inside `generateBlogContent`

Find the `INTERNAL LINKS` instruction inside `userPrompt` (the line that starts with `INTERNAL LINKS: You MUST also organically include...`) and replace the entire sentence:

```typescript
// BEFORE:
    INTERNAL LINKS: You MUST also organically include at least 2 internal HTML <a> hyperlinks in your "sections.content" pointing to DiskDoctor services (e.g., <a href="/services/hard-drive-recovery">hard drive recovery</a>, <a href="/services/raid-recovery">RAID data recovery</a>, <a href="/services/ssd-recovery">SSD recovery</a>, <a href="/services/mac-recovery">Mac recovery</a>).

// AFTER:
    INTERNAL LINKS: You MUST organically include at least 2 internal HTML <a> hyperlinks in your "sections.content". 
    You are STRICTLY FORBIDDEN from inventing URLs. You MUST ONLY use URLs from this approved map:
    ${INTERNAL_LINK_MAP_STRING}
    Correct example: <a href="/services/raid-recovery">RAID data recovery</a>
    Wrong example (NEVER): <a href="/blog/how-to-recover-data">...</a>
```

---

## Feature 3 — Guaranteeing JSON Integrity & Preventing Truncation

Two changes to the `generateBlogContent` drafting call in `src/lib/openai.ts`.

---

### 3.1 — Increase `max_tokens` from 4096 to 8192

Find:

```typescript
// BEFORE:
        max_tokens: 4096,

// AFTER:
        max_tokens: 8192,
```

---

### 3.2 — Replace `response_format` with Strict Structured Outputs JSON Schema

Replace the entire `response_format` argument in the drafting `client.chat.completions.create(...)` call:

```typescript
// BEFORE:
        response_format: { type: 'json_object' },

// AFTER:
        response_format: {
            type: 'json_schema',
            json_schema: {
                name: 'blog_payload',
                strict: true,
                schema: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string',
                            description: 'Blog post title, 50–60 characters, compelling and keyword-rich.',
                        },
                        excerpt: {
                            type: 'string',
                            description: '150–160 character summary for the blog listing page.',
                        },
                        metaDescription: {
                            type: 'string',
                            description: '120–155 character meta description for search results. Include a CTA.',
                        },
                        focusKeyword: {
                            type: 'string',
                            description: 'Primary SEO keyword, 2–4 words.',
                        },
                        category: {
                            type: 'string',
                            enum: [
                                'Data Recovery',
                                'Tips & Guides',
                                'Technology',
                                'Business',
                                'News',
                                'Case Studies',
                            ],
                        },
                        tags: {
                            type: 'array',
                            items: { type: 'string' },
                            description: 'Array of 4–6 relevant tags.',
                        },
                        keyTakeaways: {
                            type: 'array',
                            items: { type: 'string' },
                            description: 'Array of 3–5 single-sentence takeaways.',
                        },
                        sections: {
                            type: 'array',
                            description: 'Main body sections of the blog.',
                            items: {
                                type: 'object',
                                properties: {
                                    heading: {
                                        type: 'string',
                                        description: 'Section heading — will render as <h2>.',
                                    },
                                    content: {
                                        type: 'string',
                                        description: 'Full HTML content using <p>, <ul>, <ol>, <strong>, <h3>, <a> tags.',
                                    },
                                    imagePrompt: {
                                        type: ['string', 'null'],
                                        description: 'Detailed image generation prompt for this section. Provide in exactly 2 sections; set to null for all others.',
                                    },
                                    insertCtaAfter: {
                                        type: 'boolean',
                                        description: 'Set to true for 1 mid-body section to inject a Call-to-Action widget.',
                                    },
                                },
                                required: ['heading', 'content', 'imagePrompt', 'insertCtaAfter'],
                                additionalProperties: false,
                            },
                        },
                        statistics: {
                            type: 'array',
                            description: 'At least 2 factual statistics extracted from the live research context.',
                            items: {
                                type: 'object',
                                properties: {
                                    quote: {
                                        type: 'string',
                                        description: 'The direct quote or statistic.',
                                    },
                                    sourceName: {
                                        type: 'string',
                                        description: 'Human-readable source name, e.g. "Backblaze" or "IBM Security".',
                                    },
                                    sourceUrl: {
                                        type: 'string',
                                        description: 'Full URL of the source article.',
                                    },
                                },
                                required: ['quote', 'sourceName', 'sourceUrl'],
                                additionalProperties: false,
                            },
                        },
                        faqs: {
                            type: 'array',
                            description: 'Between 3 and 5 FAQ pairs targeting search intent.',
                            items: {
                                type: 'object',
                                properties: {
                                    question: {
                                        type: 'string',
                                        description: 'Common user question relating to the topic.',
                                    },
                                    answer: {
                                        type: 'string',
                                        description: 'Clear concise answer, 2–3 sentences.',
                                    },
                                },
                                required: ['question', 'answer'],
                                additionalProperties: false,
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
                    additionalProperties: false,
                },
            },
        },
```

> **Note:** With strict structured outputs, you no longer need the verbose JSON schema instructions at the bottom of `userPrompt`. Remove the second `CRITICAL INSTRUCTION` block entirely (the one starting with `Respond in this exact JSON format:` and containing the raw JSON template). Keep only the first `CRITICAL INSTRUCTION` block that describes inline images, statistics, and internal links.

---

### 3.3 — Remove Duplicate `CRITICAL INSTRUCTION` Block

In `userPrompt`, locate and **delete** the entire second `CRITICAL INSTRUCTION` block. It begins with:

```
\n\nCRITICAL INSTRUCTION: You must strictly output the response in the exact JSON format below. DO NOT output raw text.\n    \nRespond in this exact JSON format:\n{
```

And ends with the closing `}` of the JSON template followed by the comment `// Generate between 3 and 5 FAQs`. Delete everything from that second `CRITICAL INSTRUCTION:` line to the end of the `userPrompt +=` statement that contains it.

---

## Feature 4 — Auto-Save to Prevent Data/Credit Loss

**Problem:** After ~60–90 seconds of API calls and DALL-E spend, the only persistence is a `sessionStorage` key. A single tab close destroys the entire result.  
**Solution:** Immediately after generation + image fetching, insert the blog as a `draft` in MongoDB. Send the draft's `id` back through SSE. Redirect the editor to hydrate from the DB.

---

### 4.1 — Update `src/app/api/blogs/ai-generate/route.ts`

#### 4.1a — Add new imports at the top

```typescript
// Add to existing imports:
import { calculateReadingTime, calculateWordCount } from '@/lib/slugify';
import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_AUTHOR } from '@/lib/types';
```

#### 4.1b — Update `sendUpdate` helper to support `draftId`

```typescript
// BEFORE:
                const sendUpdate = (step: number, message: string, blog?: any) => {
                    const data = JSON.stringify({ step, message, blog });
                    controller.enqueue(encoder.encode(`data: ${data}\n\n`));
                };

// AFTER:
                const sendUpdate = (step: number, message: string, blog?: any, draftId?: string) => {
                    const payload: Record<string, any> = { step, message };
                    if (blog) payload.blog = blog;
                    if (draftId) payload.draftId = draftId;
                    const data = JSON.stringify(payload);
                    controller.enqueue(encoder.encode(`data: ${data}\n\n`));
                };
```

#### 4.1c — Replace the final `sendUpdate` call with auto-save + ID dispatch

Find this block at the end of the streaming handler (after `await Promise.all(imagePromises)`):

```typescript
                    // Step 5: Finalizing
                    sendUpdate(5, "Finalizing assets...", {
                        ...generatedBlog,
                        slug,
                        featuredImage
                    });
```

Replace it with:

```typescript
                    // Step 5: Auto-save draft to MongoDB
                    sendUpdate(5, "Saving draft to database...");

                    // Build the full text for word count + reading time
                    const fullTextContent = generatedBlog.sections
                        .map((s: any) => `${s.heading} ${s.content.replace(/<[^>]*>/g, '')}`)
                        .join(' ');

                    const draftBlog = {
                        id: uuidv4(),
                        slug,
                        title: generatedBlog.title,
                        sections: generatedBlog.sections,
                        faqs: generatedBlog.faqs,
                        keyTakeaways: generatedBlog.keyTakeaways || [],
                        excerpt: generatedBlog.excerpt,
                        metaDescription: generatedBlog.metaDescription,
                        focusKeyword: generatedBlog.focusKeyword,
                        author: DEFAULT_AUTHOR,
                        category: generatedBlog.category || 'Data Recovery',
                        tags: generatedBlog.tags || [],
                        featuredImage: featuredImage || null,
                        images: [],
                        status: 'draft' as const,
                        scheduledAt: null,
                        readingTime: calculateReadingTime(fullTextContent),
                        wordCount: calculateWordCount(fullTextContent),
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    };

                    await blogsCollection.insertOne(draftBlog);
                    console.log(`[AI Gen] Draft auto-saved with id: ${draftBlog.id}`);

                    // Send only the draft ID — no massive payload through SSE
                    sendUpdate(5, "Draft saved! Opening editor...", undefined, draftBlog.id);
```

---

### 4.2 — Update `src/app/admin/dashboard/page.tsx` — SSE Reader

Find the `if (data.blog)` block inside the SSE `while` loop and replace it:

```tsx
// BEFORE:
                 if (data.blog) {
                    sessionStorage.setItem('aiGeneratedBlog', JSON.stringify(data.blog));
                    router.push('/admin/editor?ai=true');
                    return; // Successfully finished
                 }

// AFTER:
                 if (data.draftId) {
                    // Draft was auto-saved to DB — route directly to editor
                    router.push(`/admin/editor?id=${data.draftId}`);
                    return; // Successfully finished
                 }
```

> **Note:** The `sessionStorage` write is completely removed. The `?ai=true` flag is replaced by `?id=<uuid>`.

---

### 4.3 — Update `src/app/admin/editor/page.tsx` — DB Hydration + Update on Save

#### 4.3a — Add `editingDraftId` state variable

Find the existing state declarations and add:

```tsx
// BEFORE:
    const [isAIGenerated, setIsAIGenerated] = useState(false);

// AFTER:
    const [isAIGenerated, setIsAIGenerated] = useState(false);
    const [editingDraftId, setEditingDraftId] = useState<string | null>(null); // ← NEW
```

#### 4.3b — Update the initialization `useEffect` to handle `?id=` query param

Replace the entire `useEffect` (the one that checks `ai=true`) with:

```tsx
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            router.push('/admin/login');
            return;
        }

        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const draftId = params.get('id');

            // ── NEW: Hydrate from MongoDB by draft ID ──────────────────────
            if (draftId) {
                fetch(`/api/blogs/${draftId}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.success && data.blog) {
                            const blog = data.blog;
                            setFormData(prev => ({
                                ...prev,
                                title: blog.title || prev.title,
                                sections: blog.sections?.length > 0 ? blog.sections : prev.sections,
                                faqs: blog.faqs || prev.faqs,
                                keyTakeaways: blog.keyTakeaways || prev.keyTakeaways,
                                excerpt: blog.excerpt || prev.excerpt,
                                metaDescription: blog.metaDescription || prev.metaDescription,
                                focusKeyword: blog.focusKeyword || prev.focusKeyword,
                                category: blog.category || prev.category,
                                tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : prev.tags,
                                slug: blog.slug || prev.slug,
                                featuredImage: blog.featuredImage || prev.featuredImage,
                                status: blog.status || prev.status,
                            }));
                            slugTouched.current = !!blog.slug;
                            setIsAIGenerated(true);
                            setEditingDraftId(draftId);   // track for PUT vs POST
                        } else {
                            console.error('Draft not found:', draftId);
                        }
                    })
                    .catch(err => console.error('Failed to load draft from DB:', err))
                    .finally(() => setIsInitialized(true));
                return; // Prevent falling through to setIsInitialized(true) below
            }

            // ── EXISTING: Hydrate from sessionStorage (legacy / manual flow) ───
            if (window.location.search.includes('ai=true')) {
                const aiData = sessionStorage.getItem('aiGeneratedBlog');
                if (aiData) {
                    try {
                        const parsed = JSON.parse(aiData);
                        setFormData(prev => ({
                            ...prev,
                            title: parsed.title || prev.title,
                            sections: parsed.sections && parsed.sections.length > 0 ? parsed.sections : prev.sections,
                            faqs: parsed.faqs || prev.faqs,
                            keyTakeaways: parsed.keyTakeaways || prev.keyTakeaways,
                            excerpt: parsed.excerpt || prev.excerpt,
                            metaDescription: parsed.metaDescription || prev.metaDescription,
                            focusKeyword: parsed.focusKeyword || prev.focusKeyword,
                            category: parsed.category || prev.category,
                            tags: parsed.tags ? parsed.tags.join(', ') : prev.tags,
                            slug: parsed.slug || prev.slug,
                            featuredImage: parsed.featuredImage || prev.featuredImage,
                        }));
                        slugTouched.current = !!parsed.slug;
                        setIsAIGenerated(true);
                        sessionStorage.removeItem('aiGeneratedBlog');
                    } catch (e) {
                        console.error('Failed to parse AI data from sessionStorage:', e);
                    }
                }
            }
            setIsInitialized(true);
        }
    }, [router]);
```

#### 4.3c — Update `handleSave` to PUT when editing an existing draft

Find the `fetch('/api/blogs', {` call inside `handleSave` and replace it:

```tsx
// BEFORE:
            const response = await fetch('/api/blogs', {
                method: 'POST',
                body: submitData,
            });

// AFTER:
            const response = await fetch(
                editingDraftId ? `/api/blogs/${editingDraftId}` : '/api/blogs',
                {
                    method: editingDraftId ? 'PUT' : 'POST',
                    body: submitData,
                }
            );
```

And after a successful save, clear `editingDraftId` to prevent a second duplicate PUT:

```tsx
// BEFORE:
            if (data.success) {
                setLastSaved(new Date().toLocaleTimeString());
                const statusLabel = status === 'published' ? 'Published' : status === 'scheduled' ? 'Scheduled' : 'Draft saved';
                alert(`${statusLabel} successfully!`);
                router.push('/admin/dashboard');

// AFTER:
            if (data.success) {
                setLastSaved(new Date().toLocaleTimeString());
                setEditingDraftId(null);  // ← clear so subsequent saves use POST
                const statusLabel = status === 'published' ? 'Published' : status === 'scheduled' ? 'Scheduled' : 'Draft saved';
                alert(`${statusLabel} successfully!`);
                router.push('/admin/dashboard');
```

---

## Complete File Change Summary

| File | Change type | Summary |
|------|------------|---------|
| `src/lib/search.ts` | **Full replacement** | Tavily as primary, Wikipedia as fallback; new `tavilyApiKey` first param |
| `src/lib/openai.ts` | **Multiple edits** | `saveAISettings` + `GenerateBlogParams` types; `INTERNAL_LINK_MAP`; updated SYSTEM_PROMPT; new `response_format` strict schema; `max_tokens: 8192`; remove duplicate CRITICAL INSTRUCTION |
| `src/app/api/admin/ai-settings/route.ts` | **Full replacement** | Exposes + persists `tavilyApiKey` |
| `src/app/admin/dashboard/page.tsx` | **Multiple edits** | `aiTavilyKey` state; Tavily field in modal; `handleSaveSettings` body; SSE reader uses `draftId` |
| `src/app/api/blogs/ai-generate/route.ts` | **Multiple edits** | Passes `tavilyApiKey`; updated `sendUpdate` signature; auto-saves draft + sends `draftId` |
| `src/app/admin/editor/page.tsx` | **Multiple edits** | `editingDraftId` state; `?id=` DB hydration path; `handleSave` uses PUT for existing drafts |

---

## Testing Checklist

After applying all changes, verify each feature:

### Feature 1 — Tavily
- [ ] Open AI Settings modal → Tavily key field is visible
- [ ] Enter `tvly-dev-1R29zc-...` key → click Save & Verify → success
- [ ] Open browser Network tab → trigger MagicAI generation → look for `POST api.tavily.com/search` requests during step 2
- [ ] Server logs show `[Tavily] Got X results for: "..."` lines
- [ ] Without a Tavily key saved → logs show `[Search] No Tavily key — falling back to Wikipedia API.` (graceful fallback)

### Feature 2 — Internal Links
- [ ] Generated blog HTML contains `<a href="/services/...">` links
- [ ] All generated href values match entries in `INTERNAL_LINK_MAP` exactly
- [ ] No invented URLs like `/blog/...` or `/services/custom-thing` appear

### Feature 3 — JSON Integrity
- [ ] Long blog requests (2000+ word target) no longer produce JSON parse errors
- [ ] Server logs show no `Unexpected end of JSON input` errors
- [ ] The returned blog always has all expected fields (`sections`, `faqs`, `keyTakeaways`, `statistics`)
- [ ] `response_format.type === 'json_schema'` is visible in OpenAI API logs

### Feature 4 — Auto-Save
- [ ] After generation completes, check MongoDB `blogDB.blogs` — a new document with `status: "draft"` should appear
- [ ] Browser is redirected to `/admin/editor?id=<uuid>`
- [ ] Editor correctly pre-fills all fields from the DB document
- [ ] Editing and clicking "Save Draft" or "Publish" uses `PUT /api/blogs/<uuid>` (check Network tab — method should be PUT)
- [ ] Navigating away from the editor and back to the dashboard → the draft is visible in the Drafts tab
- [ ] Simulating data loss: close the editor tab mid-fill → reopen dashboard → draft is still listed

---

## Notes & Caveats

1. **Tavily free tier** gives 1,000 credits/month. Each blog generation triggers 3 search queries = 3 credits. At that rate, the free tier supports ~333 blog generations per month.

2. **Strict JSON schema + `max_tokens: 8192`** requires a model that supports Structured Outputs. `gpt-4o` and `gpt-4o-mini` both support it. `gpt-4-turbo` does **not**. If using `gpt-4-turbo`, keep `response_format: { type: 'json_object' }` and `max_tokens: 4096`.

3. **The `editingDraftId` clearing** in `handleSave` ensures that if the user publishes and then wants to create a second blog, the editor correctly POSTs rather than PUTting to the old draft ID.

4. **The `[id]` legacy editor** (`src/app/admin/editor/[id]/page.tsx`) is unchanged and still works for editing existing published posts via the "Edit" button in the dashboard. Only the new AI-generated flow uses the main editor page (`/admin/editor/page.tsx`) with the `?id=` query param.
