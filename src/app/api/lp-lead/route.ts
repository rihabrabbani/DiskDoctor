import { NextResponse, type NextRequest } from 'next/server';
import {
  ATTRIBUTION_FIELDS,
  BUSINESS_OR_PERSONAL,
  DEVICE_VALUES,
  STATES,
  STEER_DEVICE,
  SYMPTOMS,
  URGENCY,
} from '@/lp/config/form';
import { LP_FORM_GUID_IS_PLACEHOLDER, LP_SUBMIT_URL } from '@/lp/config/hubspot';
import { isValidEmail, isValidPhone, toE164 } from '@/lp/phone';

// Landing-page form → HubSpot Forms API (unauthenticated submit endpoint, form "LP – free evaluation").
// The visitor only ever sees {ok}; HubSpot errors are logged here.

const MIN_FILL_MS = 3000;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const VARIANT = /^(md|va)\/(hard-drive|data-recovery|ssd)$|^all\/raid$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Best effort: per server instance, no shared store. HubSpot's own spam filtering stays on.
const recent = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > RATE_LIMIT;
}

const str = (value: unknown, max = 500) => (typeof value === 'string' ? value.trim().slice(0, max) : '');
const oneOf = <T extends string>(value: string, options: readonly T[]) => (options as readonly string[]).includes(value);

const reject = (reason: string, status = 400) => {
  console.warn(`[lp-lead] rejected: ${reason}`);
  return NextResponse.json({ ok: false }, { status });
};

export async function POST(req: NextRequest) {
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim();

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return reject('bad json');
  }

  if (str(body.website)) return reject('honeypot');
  if (typeof body.elapsedMs !== 'number' || body.elapsedMs < MIN_FILL_MS) return reject('too fast');
  if (ip && rateLimited(ip)) return reject('rate limit', 429);

  const submissionId = str(body.submissionId, 64);
  const variant = str(body.variant, 40);
  const device = str(body.device, 80);
  const state = str(body.state, 80);
  const urgency = str(body.urgency, 40);
  const name = str(body.name, 200).replace(/\s+/g, ' ');
  const phone = str(body.phone, 40);
  const email = str(body.email, 200);
  const symptoms = Array.isArray(body.symptoms) ? body.symptoms.map((s) => str(s, 80)) : [];
  const isRaid = device === DEVICE_VALUES.raid;

  if (!UUID.test(submissionId)) return reject('submission id');
  if (!VARIANT.test(variant)) return reject('variant');
  if (!oneOf(device, Object.values(DEVICE_VALUES)) || device === STEER_DEVICE) return reject('device');
  if (!oneOf(state, STATES)) return reject('state');
  if (urgency && !oneOf(urgency, URGENCY)) return reject('urgency');
  if (!symptoms.every((s) => oneOf(s, SYMPTOMS))) return reject('symptoms');
  if (!name || !isValidPhone(phone) || !isValidEmail(email)) return reject('contact fields');

  if (LP_FORM_GUID_IS_PLACEHOLDER) {
    console.error('[lp-lead] LP_FORM_GUID is still the placeholder in src/lp/config/hubspot.ts; lead not sent.');
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  const [firstname, ...rest] = name.split(' ');
  const values: Record<string, string> = {
    firstname,
    lastname: rest.join(' '),
    phone: toE164(phone),
    email: email.toLowerCase(),
    service_state: state,
    recovery_device_type: device,
    dd_symptoms: [...new Set(symptoms)].join(';'),
    dd_urgency: urgency,
    message: str(body.message, 2000),
    dd_lp_variant: variant,
    dd_submission_id: submissionId,
  };
  if (isRaid) {
    const bop = str(body.businessOrPersonal, 20);
    if (oneOf(bop, BUSINESS_OR_PERSONAL)) values.business_or_personal = bop;
    const count = parseInt(str(body.driveCount, 6), 10);
    if (count > 0 && count < 1000) values.dd_drive_count = String(count);
  }
  const attribution = (body.attribution && typeof body.attribution === 'object' ? body.attribution : {}) as Record<
    string,
    unknown
  >;
  for (const key of ATTRIBUTION_FIELDS) values[key] = str(attribution[key]);

  const hutk = req.cookies.get('hubspotutk')?.value;
  const payload = {
    fields: Object.entries(values)
      .filter(([, value]) => value)
      .map(([name, value]) => ({ objectTypeId: '0-1', name, value })),
    context: {
      ...(hutk ? { hutk } : {}),
      pageUri: str(body.pageUri, 1000),
      pageName: str(body.pageName, 300),
      ...(ip ? { ipAddress: ip } : {}),
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
      console.error(`[lp-lead] HubSpot ${res.status}: ${(await res.text()).slice(0, 1000)}`);
      return NextResponse.json({ ok: false }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[lp-lead] HubSpot request failed', error);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
