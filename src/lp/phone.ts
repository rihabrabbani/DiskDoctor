// Shared by LpForm and /api/lp-lead.

export const phoneDigits = (phone: string) => phone.replace(/\D/g, '');

export const isValidPhone = (phone: string) => phoneDigits(phone).length >= 10;

export const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

/** E.164 with a US default: 10 digits → +1XXXXXXXXXX. */
export function toE164(phone: string): string {
  const digits = phoneDigits(phone);
  if (phone.trim().startsWith('+')) return `+${digits}`;
  if (digits.length === 10) return `+1${digits}`;
  return `+${digits}`;
}
