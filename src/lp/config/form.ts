// LpForm options. Values are HubSpot property values and must match the portal exactly.

export const DEVICE_VALUES = {
  external: 'External or desktop hard drive',
  laptop: 'Laptop hard drive',
  ssd: 'SSD / NVMe',
  raid: 'RAID, NAS or server',
  phone: 'Phone, SD card or USB stick',
  other: 'Other',
} as const;

export type DeviceValue = (typeof DEVICE_VALUES)[keyof typeof DEVICE_VALUES];

export const DEVICES: { label: string; value: DeviceValue }[] = [
  { label: 'External hard drive', value: DEVICE_VALUES.external },
  { label: 'Laptop hard drive', value: DEVICE_VALUES.laptop },
  { label: 'SSD or NVMe', value: DEVICE_VALUES.ssd },
  { label: 'RAID, NAS or server', value: DEVICE_VALUES.raid },
  { label: 'Phone, SD card or USB stick', value: DEVICE_VALUES.phone },
  { label: 'Something else', value: DEVICE_VALUES.other },
];

/** Polite stop: no step 2 and no lead for this device. */
export const STEER_DEVICE: DeviceValue = DEVICE_VALUES.phone;

/** dd_symptoms options = these labels. */
export const SYMPTOMS = [
  'Clicking or beeping',
  'Not detected',
  'Dropped',
  'Water or power damage',
  'Asks to format',
  'Deleted files',
  'Something else',
] as const;

/** dd_urgency options. */
export const URGENCY = ['Today', 'This week', 'No rush'] as const;

/** service_state options. */
export const STATES = [
  'Maryland',
  'Virginia',
  'Washington, DC',
  'Delaware',
  'Pennsylvania',
  'New Jersey',
  'New York',
  'Other US state',
] as const;

export const BUSINESS_OR_PERSONAL = ['Business', 'Personal'] as const;

export const LEAD_CHANNELS = [
  'google_ads',
  'organic_search',
  'gbp',
  'lsa',
  'direct',
  'referral',
  'other',
  'ai_assistant',
] as const;

/** The 11 dd_ attribution hidden fields, filled from the dd_attr cookie GTM sets. */
export const ATTRIBUTION_FIELDS = [
  'dd_gclid',
  'dd_gbraid',
  'dd_wbraid',
  'dd_utm_source',
  'dd_utm_medium',
  'dd_utm_campaign',
  'dd_utm_term',
  'dd_utm_content',
  'dd_landing_page',
  'dd_lead_channel',
  'dd_ga_client_id',
] as const;

export type Attribution = Partial<Record<(typeof ATTRIBUTION_FIELDS)[number], string>>;
