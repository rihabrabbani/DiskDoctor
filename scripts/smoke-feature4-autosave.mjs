const BASE_URL = 'http://localhost:3000';

async function runSmokeTest() {
  console.log('--- Feature 4 Smoke Test: Auto-save + draftId SSE flow ---');

  const response = await fetch(`${BASE_URL}/api/blogs/ai-generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mode: 'guided',
      topic: 'How to recover deleted SSD files without making it worse',
      notes: 'Keep practical and include FAQs',
      targetWordCount: 800,
    }),
  });

  if (!response.ok || !response.body) {
    const text = await response.text().catch(() => '');
    throw new Error(`Generation request failed: ${response.status} ${text}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let buffer = '';
  let finalPayload = null;

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const chunks = buffer.split('\n\n');
    buffer = chunks.pop() || '';

    for (const chunk of chunks) {
      if (!chunk.startsWith('data: ')) continue;
      try {
        const payload = JSON.parse(chunk.slice(6));
        if (payload.error) {
          throw new Error(payload.error);
        }
        console.log(`[SSE] step=${payload.step ?? '-'} message="${payload.message ?? ''}"`);

        if (payload.draftId || payload.blog) {
          finalPayload = payload;
        }
      } catch (err) {
        // ignore partial parse errors
      }
    }
  }

  if (!finalPayload) {
    throw new Error('No final SSE payload received');
  }

  console.log('\nFinal SSE payload keys:', Object.keys(finalPayload));

  if (!finalPayload.draftId) {
    throw new Error('Expected final SSE payload to include draftId');
  }

  if (finalPayload.blog) {
    throw new Error('Expected final SSE payload to NOT include blog object');
  }

  const draftId = finalPayload.draftId;
  console.log('Draft ID:', draftId);

  const draftRes = await fetch(`${BASE_URL}/api/blogs/${draftId}`);
  const draftJson = await draftRes.json();

  if (!draftRes.ok || !draftJson.success || !draftJson.blog) {
    throw new Error('Could not fetch auto-saved draft via /api/blogs/[id]');
  }

  const draft = draftJson.blog;
  console.log('\nDraft Verification:');
  console.log(`- status: ${draft.status}`);
  console.log(`- slug: ${draft.slug}`);
  console.log(`- title: ${draft.title}`);
  console.log(`- sections: ${Array.isArray(draft.sections) ? draft.sections.length : 0}`);
  console.log(`- faqs: ${Array.isArray(draft.faqs) ? draft.faqs.length : 0}`);

  if (draft.status !== 'draft') {
    throw new Error(`Expected draft.status to be "draft", got "${draft.status}"`);
  }

  if (!draft.id || draft.id !== draftId) {
    throw new Error('Draft ID mismatch between SSE payload and saved document');
  }

  console.log('\n✅ PASS: Full Feature 4 flow works (SSE draftId + DB auto-save + retrievable draft).');
}

runSmokeTest().catch((err) => {
  console.error('\n❌ FAIL:', err.message || err);
  process.exit(1);
});
