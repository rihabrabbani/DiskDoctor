import { createHmac, timingSafeEqual } from 'crypto';

// Signs the lead behind the optional "Help us prepare" answers on /thank-you, so /api/lp-prepare only
// updates the contact that just sent the form. The key comes from a server-only secret: LP_PREPARE_SECRET
// if set, else the MongoDB URI (always set in production). With neither, the questions don't show.

const secret = () => process.env.LP_PREPARE_SECRET || process.env.MONGODB_URI || '';

/** Answers are accepted for 2 hours after the lead. */
const MAX_AGE_MS = 2 * 60 * 60 * 1000;

const sign = (payload: string) =>
  createHmac('sha256', `lp-prepare:${secret()}`).update(payload).digest('base64url');

export function prepareToken(submissionId: string, email: string, phone: string): string {
  if (!secret()) return '';
  const issued = Date.now().toString(36);
  return `${issued}.${sign(`${issued}|${submissionId}|${email}|${phone}`)}`;
}

export function checkPrepareToken(token: string, submissionId: string, email: string, phone: string): boolean {
  if (!secret()) return false;
  const [issued, mac] = token.split('.');
  const age = Date.now() - parseInt(issued, 36);
  if (!mac || !(age >= 0 && age < MAX_AGE_MS)) return false;
  const expected = Buffer.from(sign(`${issued}|${submissionId}|${email}|${phone}`));
  const given = Buffer.from(mac);
  return expected.length === given.length && timingSafeEqual(expected, given);
}
