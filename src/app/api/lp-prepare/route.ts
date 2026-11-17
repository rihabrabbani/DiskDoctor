import { NextResponse, type NextRequest } from 'next/server';
import { FILES_NEEDED, URGENCY } from '@/lp/config/form';
import { LP_FORM_GUID_IS_PLACEHOLDER, LP_SUBMIT_URL } from '@/lp/config/hubspot';
import { checkPrepareToken } from '@/lp/prepareToken';

// "Help us prepare" answers from /thank-you (ads brief 16 Nov): urgency and files needed, added to the
// contact the landing-page form just created. HubSpot's Forms API matches the contact by email, so this
// re-submits the same form with the same email and phone (both required there) plus the two answers.
// Only a lead signed by /api/lp-lead in the last 2 hours is accepted.

const str = (value: unknown, max = 200) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

const reject = (reason: string, status = 400) => {
  console.warn(`[lp-prepare] rejected: ${reason}`);
  return NextResponse.json({ ok: false }, { status });
};

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return reject('bad json');
  }

  const submissionId = str(body.submissionId, 64);
  const email = str(body.email).toLowerCase();
  const phone = str(body.phone, 40);
  const urgency = str(body.urgency, 40);
  const filesNeeded = Array.isArray(body.filesNeeded) ? body.filesNeeded.map((s) => str(s, 80)) : [];

  if (!checkPrepareToken(str(body.token, 200), submissionId, email, phone)) return reject('token', 403);
  if (urgency && !(URGENCY as readonly string[]).includes(urgency)) return reject('urgency');
  if (!filesNeeded.every((s) => (FILES_NEEDED as readonly string[]).includes(s))) return reject('files needed');
  if (!urgency && filesNeeded.length === 0) return reject('nothing to add');
  if (LP_FORM_GUID_IS_PLACEHOLDER) return reject('placeholder form', 503);

  const values: Record<string, string> = {
    email,
    phone,
    dd_urgency: urgency,
    dd_files_needed: [...new Set(filesNeeded)].join(';'),
  };
  const hutk = req.cookies.get('hubspotutk')?.value;
  const payload = {
    fields: Object.entries(values)
      .filter(([, value]) => value)
      .map(([name, value]) => ({ objectTypeId: '0-1', name, value })),
    context: {
      ...(hutk ? { hutk } : {}),
      pageUri: str(body.pageUri, 1000),
      pageName: 'Thank you: help us prepare',
    },
  };

  try {
    const res = await fetch(LP_SUBMIT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      console.error(`[lp-prepare] HubSpot ${res.status}: ${(await res.text()).slice(0, 1000)}`);
      return NextResponse.json({ ok: false }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[lp-prepare] HubSpot request failed', error);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
