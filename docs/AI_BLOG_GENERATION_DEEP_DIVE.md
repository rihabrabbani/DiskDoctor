# DiskDoctor AI Blog Generation: Deep Dive

This document explains the **full end-to-end AI blog generation pipeline** in this project: modes, prompts, APIs, web research sources, image generation, storage, and publishing flow.

---

## 1) High-level architecture

The system is a multi-step pipeline:

1. Admin opens **MagicAI** in dashboard.
2. Frontend calls `POST /api/blogs/ai-generate`.
3. Backend streams progress with **Server-Sent Events (SSE)**.
4. Backend may ideate topic (Magic mode), then performs deep research, then drafts structured JSON blog content.
5. Backend generates featured + inline images using OpenAI image API.
6. Backend sends final generated blog payload in SSE.
7. Frontend stores payload in `sessionStorage` and redirects to editor.
8. Editor pre-fills fields from AI payload.
9. Human reviews/edits and saves/publishes via `POST /api/blogs`.

---

## 2) Main files involved

- `src/app/admin/dashboard/page.tsx` (MagicAI UI + SSE consumer)
- `src/app/api/blogs/ai-generate/route.ts` (AI orchestration + streaming)
- `src/lib/openai.ts` (prompting, text generation, image generation)
- `src/lib/search.ts` (Wikipedia search integration)
- `src/app/admin/editor/page.tsx` (consumes generated payload, manual save/publish)
- `src/app/api/blogs/route.ts` (persists blog to MongoDB)
- `src/lib/storage.ts` + `src/app/api/images/[id]/route.ts` (GridFS image storage/serving)
- `src/app/api/admin/ai-settings/route.ts` (stores/validates OpenAI settings)

---

## 3) Step-by-step runtime flow

## Step 0: AI settings are loaded and validated

### UI behavior
- Dashboard loads settings from `GET /api/admin/ai-settings`.
- User can save key/model/image model via `POST /api/admin/ai-settings`.

### Backend behavior
- Settings are stored in MongoDB `settings` collection with `type: "ai_config"`.
- Key is validated by calling OpenAI `models.list()` before save.

Stored shape:
- `apiKey`
- `model` (default `gpt-4o-mini` in settings route, often used as `gpt-4o` fallback in generation route)
- `imageModel` (default `dall-e-3`)

---

## Step 1: User starts generation from dashboard

When user clicks **Generate Now**:
- Frontend posts to `POST /api/blogs/ai-generate` with JSON:

```json
{
  "mode": "magic" | "guided",
  "topic": "...",      
  "notes": "...",      
  "targetWordCount": 1200
}
```

- Frontend opens SSE stream reader and parses `data: { ... }` messages.
- Progress steps shown in UI:
  1. Ideation & Topic Selection
  2. Deep Web Research
  3. Drafting Content & SEO
  4. Generating Media & Images
  5. Finalizing Assets

---

## Step 2: Backend initializes generation context

Inside `POST /api/blogs/ai-generate`:

1. Reads AI settings from MongoDB.
2. Loads all existing blog titles from `blogDB.blogs` collection.
3. Starts an SSE stream.
4. Defines `sendUpdate(step, message, blog?)` to emit progress packets.

SSE packet format:

```text
data: {"step":2,"message":"..."}

```

Final packet includes `blog` object:

```text
data: {"step":5,"message":"Finalizing assets...","blog":{...}}

```

---

## Step 3: Topic ideation (Magic mode only)

If mode is `magic`:
- Calls `analyzeBlogsAndSuggestTopic()` with existing titles.
- Model is asked to find a **new, non-duplicative, high-intent topic**.
- Returns JSON:
  - `title`
  - `focusKeyword`
  - `reasoning`

If mode is `guided`:
- Uses user-provided `topic`; throws if missing.

---

## Step 4: Deep web research orchestration

Inside `generateBlogContent()` there are two research sub-steps.

### 4.1 Query generation prompt
Model first generates exactly 3 specific research queries (JSON output).
It is explicitly guided toward **Wikipedia-citable factual queries**.

### 4.2 Web search execution
For each generated query, backend runs:
- `performWebSearch(query, 3)`
- Source is Wikipedia API endpoint:

`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=<encoded>&utf8=&format=json&srlimit=3`

Then it builds `searchResultsContext` with:
- Source title
- URL
- Snippet

That context is appended to the writing prompt as “LIVE WEB RESEARCH CONTEXT”.

### Important clarification about DuckDuckGo/Google
Current runtime search in production code uses **Wikipedia API only** via `src/lib/search.ts`.

There are experimental local test scripts in project root:
- `test-ddg.js`
- `test-search.js`
- `test-google.js`

These are **not used by the live AI generation route**.

---

## Step 5: Content drafting prompt (core text generation)

The drafting call sends:
- `SYSTEM_PROMPT` (brand, SEO, structure, formatting requirements)
- dynamic `userPrompt` (mode/topic/notes/word target + existing titles + research context + JSON schema requirements)

### Core instructions enforced in prompts
- Professional SEO writer voice for DiskDoctor.
- Target word count ~1000–1500 (or requested target).
- HTML formatting requirements (`<h2>`, `<h3>`, `<p>`, `<ul>/<ol>`, `<strong>`).
- Strict blog structure (intro, problem, guide, prevention, CTA).
- Keyword usage constraints.
- Must output strict JSON (`response_format: json_object`).
- Must include:
  - `sections[]`
  - `faqs[]` (3 to 5)
  - `keyTakeaways[]`
  - `statistics[]` extracted from research context
  - at least 2 internal links to service pages in section HTML
  - at least 2 `imagePrompt` values for section-level inline images

### Output schema requested from model
Top-level keys requested:
- `title`
- `excerpt`
- `metaDescription`
- `focusKeyword`
- `category`
- `tags`
- `keyTakeaways`
- `sections`
- `statistics`
- `faqs`

---

## Step 6: Post-processing after content JSON returns

After parsing model output:

1. **Sections normalization**
   - Adds section `id` values (`sec_<timestamp>_<index>`).
   - Injects one research statistic blockquote into section content when available.

2. **FAQ normalization**
   - Adds FAQ `id` values (`faq_<timestamp>_<index>`).

3. Returns `GeneratedBlog` object (title/excerpt/sections/faqs/etc).

---

## Step 7: Image generation (featured + inline)

In `/api/blogs/ai-generate`, step 4 runs image generation concurrently via `Promise.all`.

### 7.1 Featured image prompt template
Used when `isInline = false`:

> A highly realistic, premium editorial photograph representing the concept of: "{title}". Context: {excerpt}. Cinematic lighting, shallow depth of field, high-end corporate technology photography style. Realistic textures and natural colors. Absolutely no text, words, watermarks, or logos in the image.

Settings:
- model: configured `imageModel` (default `dall-e-3`)
- `quality: "hd"`
- `style: "natural"`
- `size: "1792x1024"`
- `response_format: "b64_json"`

### 7.2 Inline image prompt template
Used when `isInline = true` and for max 2 sections that have `imagePrompt`:

> A hyper-realistic, high-end product photograph of: {section.imagePrompt}. The subject MUST be completely isolated on a pure, solid white background layer. Clean, minimalist studio lighting, extreme detail. Absolutely no text, words, watermarks, or logos in the image.

Settings:
- model: configured `imageModel`
- `quality: "hd"`
- `style: "natural"`
- `size: "1024x1024"`
- `response_format: "b64_json"`

### 7.3 Storage path
- OpenAI returns base64 image.
- Backend decodes to buffer.
- `uploadImageToDB()` saves file in MongoDB GridFS (`images` bucket).
- Returned URL shape: `/api/images/<id>`.

---

## Step 8: Final SSE payload and frontend handoff

After images are done:
- Backend emits step 5 with full blog payload including:
  - `slug` (generated unique slug)
  - `featuredImage`
  - section data (including inline `image` URLs where generated)

Frontend dashboard behavior:
- Stores payload in `sessionStorage` under key `aiGeneratedBlog`.
- Redirects to `/admin/editor?ai=true`.

---

## Step 9: Editor ingestion and human-in-the-loop review

In editor page:
- Detects `?ai=true`.
- Reads `sessionStorage.aiGeneratedBlog`.
- Prefills form fields:
  - title, sections, faqs, keyTakeaways, excerpt, metaDescription,
  - focusKeyword, category, tags, slug, featuredImage.
- Shows AI-generated banner reminding user to review before publishing.

Nothing is auto-saved to DB at this stage.

---

## Step 10: Persisting blog to database

When user saves/publishes from editor:
- Sends `FormData` to `POST /api/blogs`.
- API parses arrays (`sections`, `faqs`, `keyTakeaways`) from JSON strings.
- Computes `readingTime` and `wordCount` from section text.
- Stores blog document in `blogDB.blogs` with:
  - id/slug/title/content fields
  - status (`draft` | `published` | `scheduled`)
  - optional `scheduledAt`
  - images and featured image
  - timestamps

If scheduled, publish state is later flipped by `GET /api/blogs/publish-scheduled` cron endpoint.

---

## 4) APIs involved (complete list)

### AI configuration
- `GET /api/admin/ai-settings`
- `POST /api/admin/ai-settings`

### AI generation
- `POST /api/blogs/ai-generate` (SSE stream response)

### Blog persistence and management
- `GET /api/blogs?admin=true`
- `POST /api/blogs`
- `GET /api/blogs/[id]`
- `PUT /api/blogs/[id]`
- `DELETE /api/blogs/[id]`
- `GET /api/blogs/publish-scheduled`

### Image storage/serving
- `POST /api/upload` (manual uploads from editor)
- `GET /api/images/[id]` (GridFS image serving)

### External APIs
- OpenAI Chat Completions API (topic + content generation)
- OpenAI Images API (featured/inline generation)
- Wikipedia Search API (`w/api.php?action=query&list=search...`)

---

## 5) Data contracts and expected shapes

### `AIGenerateRequest`
- `mode`: `guided | magic`
- `topic?`
- `notes?`
- `targetWordCount?`

### Generated blog payload returned in SSE final message
Contains at least:
- `title`
- `slug`
- `excerpt`
- `metaDescription`
- `focusKeyword`
- `category`
- `tags[]`
- `keyTakeaways[]`
- `sections[]`
- `faqs[]`
- `featuredImage`

---

## 6) Error handling and fallbacks

- Missing API key: generation route returns `401`.
- Guided mode without topic: throws validation error.
- Research phase failures: logged, generation still continues without research context.
- Image generation failures: logged per image; blog generation still completes.
- SSE parse issues on client: guarded and ignored for partial chunks.

This design favors **completion over hard-fail**, so user still gets a draft even if sub-steps fail.

---

## 7) Operational notes and caveats

1. **Search provider in runtime is Wikipedia only** (not DuckDuckGo/Google).
2. **At most 2 inline images** are generated (even if more sections include prompts).
3. AI output is not persisted automatically; editor review is required.
4. Prompt currently includes duplicated “CRITICAL INSTRUCTION” block (harmless but redundant).
5. Statistics are appended as styled blockquotes inside section HTML.

---

## 8) Practical sequence summary (request → publish)

1. Configure key/model (`/api/admin/ai-settings`).
2. Click MagicAI Generate (`/api/blogs/ai-generate`).
3. (Magic mode) ideate topic.
4. Generate research queries.
5. Query Wikipedia API.
6. Draft structured SEO blog JSON.
7. Generate featured + inline images in parallel.
8. Stream final payload to frontend.
9. Load payload in editor.
10. Human edits + save/publish (`/api/blogs`).
11. Optional scheduled publishing via cron endpoint.

---

## 9) Security/storage notes

- OpenAI key is stored in MongoDB settings document.
- Generated images are stored in MongoDB GridFS and served through `/api/images/[id]`.
- Public blog endpoints only return published posts unless `admin=true` is provided.

---

## 10) Quick troubleshooting checklist

If generation appears broken:

1. Verify OpenAI key in AI settings route.
2. Confirm model/image model exist and are accessible.
3. Check SSE stream in browser network tab for `data:` progress packets.
4. Check server logs for:
   - research phase errors,
   - image generation errors,
   - JSON parse errors.
5. Confirm final payload reaches `sessionStorage.aiGeneratedBlog`.
6. Confirm editor loads with `?ai=true` and data is not blocked by browser storage settings.

---

## 11) Suggested future improvements

- Add source quality filtering/scoring for research snippets.
- Add citation traceability UI (show which stat came from which source).
- Add schema validation for model JSON before accepting payload.
- Add retry/backoff around image generation.
- Add optional automatic draft save after generation.
- Add telemetry for average generation duration and step failure rates.
