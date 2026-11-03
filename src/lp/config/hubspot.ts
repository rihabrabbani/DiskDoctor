import { HUBSPOT_PORTAL_ID } from '@/lib/site';

// GUID of the HubSpot form "LP – free evaluation". Not secret: it appears in every embedded form.
// TODO: replace with the real GUID once the form exists. While it is the placeholder,
// /api/lp-lead logs and refuses every submission instead of posting to HubSpot.
export const LP_FORM_GUID = '00000000-0000-0000-0000-000000000000';
export const LP_FORM_GUID_IS_PLACEHOLDER = LP_FORM_GUID === '00000000-0000-0000-0000-000000000000';

export const LP_SUBMIT_URL = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${LP_FORM_GUID}`;
