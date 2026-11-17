'use client';

import { useEffect, useRef, useState, type FocusEvent, type FormEvent } from 'react';
import { DEVICES, DEVICE_VALUES, LEAD_CHANNELS, SYMPTOMS, type Attribution, type DeviceValue } from '@/lp/config/form';
import { LAB_PHONE, LAB_TEL } from '@/lp/config/areas';
import { LP_FORM_GUID } from '@/lp/config/hubspot';
import { isValidEmail, isValidPhone, toE164 } from '@/lp/phone';
import LpIcon from './LpIcon';

// Ads brief 16 Nov, change 2: two steps. Step 1 picks the device; step 2 asks for name, phone and email
// (all required, as in the HubSpot form), with "What happened?" and a one-line note as optional extras.
// Urgency and "what do you need back" are asked on /thank-you after the lead is in (LpPrepare).
// Hidden fields, the honeypot, the events and the dd_lead / dd_ec / dd_form_submit handoff are unchanged.

type Step = 1 | 2;
type Touch = Partial<Record<'gclid' | 'gbraid' | 'wbraid' | 'src' | 'med' | 'cmp' | 'term' | 'cnt' | 'lp' | 'ch', string>>;
type DdAttr = { first?: Touch; last?: Touch };
type Errors = Partial<Record<'name' | 'phone' | 'email', string>>;

const URL_KEYS = [
  'gclid',
  'gbraid',
  'wbraid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'matchtype',
  'loc_physical_ms',
] as const;
type LandingParams = Partial<Record<(typeof URL_KEYS)[number] | 'lp', string>>;

function cookie(name: string) {
  const row = document.cookie.split('; ').find((c) => c.startsWith(`${name}=`));
  return row ? row.slice(name.length + 1) : '';
}

function session(key: string) {
  try {
    return sessionStorage.getItem(key) || '';
  } catch {
    return '';
  }
}

// dd_attr is set by GTM on every page: JSON {first, last}, possibly URI-encoded.
function readAttr(): DdAttr {
  const raw = cookie('dd_attr');
  if (!raw) return {};
  for (const decode of [(s: string) => s, decodeURIComponent]) {
    try {
      const value = JSON.parse(decode(raw));
      if (value && typeof value === 'object') return value as DdAttr;
    } catch {}
  }
  return {};
}

// Ad parameters from the landing URL. Kept in sessionStorage so they survive a reload or a
// second page view without them; a URL that has any of them replaces what was stored.
function readLandingParams(): LandingParams {
  const query = new URLSearchParams(location.search);
  const fresh: LandingParams = {};
  for (const key of URL_KEYS) {
    const value = query.get(key);
    if (value) fresh[key] = value.slice(0, 200);
  }
  if (Object.keys(fresh).length === 0) {
    try {
      return JSON.parse(session('dd_lp_url') || '{}') as LandingParams;
    } catch {
      return {};
    }
  }
  const params = { ...fresh, lp: location.pathname };
  try {
    sessionStorage.setItem('dd_lp_url', JSON.stringify(params));
  } catch {}
  return params;
}

// Hidden fields from dd_attr `last`, falling back to `first` for click IDs and the landing page.
// Without dd_attr (GTM blocked), they come from the landing URL instead.
function attributionFields(attr: DdAttr, url: LandingParams): Attribution {
  const gaClientId = cookie('_ga').match(/\d+\.\d+$/)?.[0] || '';
  if (!attr.last && !attr.first) {
    const clicked = Boolean(url.gclid || url.gbraid || url.wbraid);
    return {
      dd_gclid: url.gclid || '',
      dd_gbraid: url.gbraid || '',
      dd_wbraid: url.wbraid || '',
      dd_utm_source: url.utm_source || '',
      dd_utm_medium: url.utm_medium || '',
      dd_utm_campaign: url.utm_campaign || '',
      dd_utm_term: url.utm_term || '',
      dd_utm_content: url.utm_content || '',
      dd_landing_page: clicked ? url.lp || location.pathname : '',
      dd_lead_channel: clicked ? 'google_ads' : 'unknown',
      dd_ga_client_id: gaClientId,
    };
  }
  const last = attr.last || {};
  const first = attr.first || {};
  const get = (key: keyof Touch, fallback = false) => last[key] || (fallback ? first[key] : '') || '';
  const ch = get('ch');
  return {
    dd_gclid: get('gclid', true),
    dd_gbraid: get('gbraid', true),
    dd_wbraid: get('wbraid', true),
    dd_utm_source: get('src'),
    dd_utm_medium: get('med'),
    dd_utm_campaign: get('cmp'),
    dd_utm_term: get('term'),
    dd_utm_content: get('cnt'),
    dd_landing_page: get('lp', true),
    dd_lead_channel: (LEAD_CHANNELS as readonly string[]).includes(ch) ? ch : 'unknown',
    dd_ga_client_id: gaClientId,
  };
}

function uuid() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function push(event: string, params: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

const toggle = (list: string[], value: string) =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value];


export default function LpForm({
  variant,
  phone,
  tel,
  mainLine,
  serviceState,
  presetDevice,
}: {
  variant: string;
  phone: string;
  tel: string;
  /** VA pages: also offer the (410) main line next to the Tysons number. */
  mainLine: boolean;
  /** service_state for the lead, set by the page (blank on the RAID page). */
  serviceState: string;
  presetDevice?: DeviceValue;
}) {
  // VA pages never say "lab" (brief 9 Nov, section 6).
  const va = variant.startsWith('va/');
  const [step, setStep] = useState<Step>(1);
  const [device, setDevice] = useState<DeviceValue | null>(presetDevice ?? null);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [apiFailed, setApiFailed] = useState(false);

  const loadedAt = useRef(0);
  const submissionId = useRef('');
  const landing = useRef<LandingParams>({});
  const deviceType = useRef<'mobile' | 'desktop'>('desktop');
  const started = useRef(false);
  const stepsSeen = useRef(new Set<string>());
  const stepRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const honeypot = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const fieldRefs = { name: useRef<HTMLInputElement>(null), phone: useRef<HTMLInputElement>(null), email: useRef<HTMLInputElement>(null) };

  useEffect(() => {
    loadedAt.current = Date.now();
    // One ID per form: reused on a retry, so HubSpot and Ads see the same lead.
    submissionId.current = uuid();
    landing.current = readLandingParams();
    // dd_cta is per landing-page visit: a click on another LP earlier in the session doesn't count.
    try {
      sessionStorage.removeItem('dd_cta');
    } catch {}
    deviceType.current =
      /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || matchMedia('(max-width: 767px)').matches
        ? 'mobile'
        : 'desktop';
  }, []);

  // Move focus to the new step, so keyboard and screen-reader users land on it.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    stepRef.current?.focus({ preventScroll: true });
  }, [step]);

  const isRaid = device === DEVICE_VALUES.raid;

  // lp_form_step fires once, for the move to step 2.
  const goTo = (next: Step, dev: DeviceValue | null = device) => {
    setStep(next);
    if (next === 1 || stepsSeen.current.has(String(next))) return;
    stepsSeen.current.add(String(next));
    const last = readAttr().last || {};
    push('lp_form_step', {
      step: next,
      device: dev,
      lp_keyword: last.term || '',
      lp_content: last.cnt || '',
    });
  };

  const pickDevice = (value: DeviceValue) => {
    if (!started.current) {
      started.current = true;
      push('lp_form_start', { lp_variant: variant });
    }
    setDevice(value);
    goTo(2, value);
  };

  // Page links marked data-cta (all href="#start", so the browser scrolls to the form): the last one
  // clicked becomes dd_cta. A tile or card with a symptom pre-picks it; one with a device (or the RAID
  // tile) picks that device, which opens step 2.
  const onCta = useRef<(el: Element) => void>(() => {});
  onCta.current = (el) => {
    const cta = el.getAttribute('data-cta') || '';
    try {
      sessionStorage.setItem('dd_cta', cta);
    } catch {}
    const symptom = el.getAttribute('data-tile-symptom');
    if (symptom) setSymptoms((list) => (list.includes(symptom) ? list : [...list, symptom]));
    const pick = el.hasAttribute('data-tile-raid')
      ? DEVICE_VALUES.raid
      : (el.getAttribute('data-card-device') as DeviceValue | null);
    if (pick && (step === 1 || device !== pick)) pickDevice(pick);
  };
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const el = (event.target as Element | null)?.closest?.('[data-cta]');
      if (el && !el.closest('#start')) onCta.current(el);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const validate = (): Errors => {
    const next: Errors = {};
    if (!name.trim()) next.name = 'Add your name.';
    if (!phoneValue.trim()) next.phone = 'Add a phone number.';
    else if (!isValidPhone(phoneValue)) next.phone = 'Add the full phone number, with the area code.';
    if (!email.trim()) next.email = 'Add an email address.';
    else if (!isValidEmail(email)) next.email = 'Check the email address: it should look like name@example.com.';
    return next;
  };

  // iPhone: when the keyboard opens, scroll so the submit button sits just above it, as long as the
  // field being typed in stays on screen too.
  const revealSubmit = (event: FocusEvent<HTMLFormElement>) => {
    const field = event.target;
    if (!(field instanceof HTMLInputElement) || !matchMedia('(pointer: coarse)').matches) return;
    window.setTimeout(() => {
      const button = submitRef.current;
      if (!button || document.activeElement !== field) return;
      const vv = window.visualViewport;
      const top = vv ? vv.offsetTop : 0;
      const height = vv ? vv.height : window.innerHeight;
      const by = Math.min(
        button.getBoundingClientRect().bottom + 12 - (top + height),
        field.getBoundingClientRect().top - top - 12,
      );
      if (by > 0) window.scrollBy({ top: by, behavior: 'smooth' });
    }, 400);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (sending || !device) return;
    const found = validate();
    setErrors(found);
    const firstBad = (['name', 'phone', 'email'] as const).find((k) => found[k]);
    if (firstBad) {
      fieldRefs[firstBad].current?.focus();
      push('lp_form_error', { error_type: 'validation' });
      return;
    }

    setSending(true);
    setApiFailed(false);
    const attr = readAttr();
    const attribution = attributionFields(attr, landing.current);
    const e164Phone = toE164(phoneValue);
    let ok = false;
    let prepareToken = '';
    try {
      const res = await fetch('/api/lp-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: submissionId.current,
          variant,
          device,
          symptoms,
          message,
          name,
          phone: phoneValue,
          email,
          state: serviceState,
          ddDevice: deviceType.current,
          ddCta: session('dd_cta') || 'form',
          ddMatchtype: landing.current.matchtype || '',
          ddLoc: landing.current.loc_physical_ms || '',
          attribution,
          pageUri: window.location.href,
          pageName: document.title,
          elapsedMs: Date.now() - loadedAt.current,
          website: honeypot.current?.value || '',
        }),
      });
      const json = res.ok ? await res.json() : null;
      ok = json?.ok === true;
      prepareToken = typeof json?.prepareToken === 'string' ? json.prepareToken : '';
    } catch {
      ok = false;
    }

    if (!ok) {
      setSending(false);
      setApiFailed(true);
      push('lp_form_error', { error_type: 'api' });
      return;
    }

    // Tracking handoff (spec section 6): keys and values must match GTM v12 exactly.
    const recoveryDeviceTypeValue = device;
    const serviceStateValue = serviceState;
    const lead = {
      form_id: LP_FORM_GUID,
      conv_id: submissionId.current,
      ch: (attr.last || attr.first || {}).ch || attribution.dd_lead_channel,
      device: recoveryDeviceTypeValue,
      state: serviceStateValue,
      email: email.trim().toLowerCase(),
      phone_number: e164Phone,
      target: recoveryDeviceTypeValue !== 'Phone, SD card or USB stick',
    };
    try {
      sessionStorage.removeItem('dd_cta');
    } catch {}
    sessionStorage.setItem('dd_lead', JSON.stringify(lead));
    sessionStorage.setItem('dd_ec', JSON.stringify({ email: lead.email, phone_number: lead.phone_number }));
    // For the optional "Help us prepare" questions on /thank-you (its own key: dd_lead stays as GTM expects).
    if (prepareToken) {
      try {
        sessionStorage.setItem(
          'dd_lp_prepare',
          JSON.stringify({ submissionId: submissionId.current, email: lead.email, phone: e164Phone, token: prepareToken }),
        );
      } catch {}
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'dd_form_submit', dd_form_id: lead.form_id, dd_lead_type: lead.device, dd_lead_channel: lead.ch });
    location.assign('/thank-you');
  };

  const fieldError = (key: keyof Errors) =>
    errors[key] ? (
      <p className="lp-err" id={`lp-${key}-err`}>
        {errors[key]}
      </p>
    ) : null;
  const describedBy = (...keys: (keyof Errors)[]) =>
    keys.filter((k) => errors[k]).map((k) => `lp-${k}-err`).join(' ') || undefined;
  const mainLineLink = (
    <>
      Or call our main line, <a href={LAB_TEL}>{LAB_PHONE}</a>.
    </>
  );

  return (
    <div id="start" className="lp-form" data-track-position="form_intro" data-clarity-unmask="true">
      <div className="lp-form-head">
        <h2>Start your free evaluation</h2>
        <span className="lp-form-steplabel" aria-live="polite">
          Step {step} of 2
        </span>
      </div>
      <div className="lp-segs" aria-hidden="true">
        {[1, 2].map((i) => (
          <div key={i} className={`lp-seg${i <= step ? ' is-on' : ''}`} />
        ))}
      </div>

      <div ref={stepRef} tabIndex={-1} style={{ outline: 'none' }}>
        {step === 1 && (
          <>
            <p className="lp-q" id="lp-device-q">
              What needs recovery?
            </p>
            <div className="lp-devices" role="group" aria-labelledby="lp-device-q">
              {DEVICES.map((d) => (
                <button
                  key={d.value}
                  type="button"
                  className="lp-device"
                  aria-pressed={device === d.value}
                  onClick={() => pickDevice(d.value)}
                >
                  {d.label}
                </button>
              ))}
            </div>
            <p className="lp-form-talk">
              Prefer to talk? <a href={tel}>Call {phone}</a>
              {mainLine ? <>. {mainLineLink}</> : '.'}
            </p>
          </>
        )}

        {step === 2 && (
          <form noValidate onSubmit={submit} onFocus={revealSubmit}>
            <div className="lp-fields">
              {/* Taps only, so it goes first: the typed fields then sit right above the submit button,
                  which keeps it in view over the iPhone keyboard. Tiles and cards pre-pick these. */}
              <div>
                <p className="lp-q" id="lp-sym-q">
                  What happened? <span>(optional)</span>
                </p>
                <div className="lp-chips" role="group" aria-labelledby="lp-sym-q">
                  {SYMPTOMS.map((label) => (
                    <button
                      key={label}
                      type="button"
                      className="lp-chip"
                      aria-pressed={symptoms.includes(label)}
                      onClick={() => setSymptoms((list) => toggle(list, label))}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <label className="lp-field">
                Your name
                <input
                  ref={fieldRefs.name}
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  data-clarity-mask="true"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={describedBy('name')}
                />
                {fieldError('name')}
              </label>
              <label className="lp-field">
                <span>
                  Phone <span className="lp-hint">{va ? 'So we can call you back' : 'So the lab can call you back'}</span>
                </span>
                <input
                  ref={fieldRefs.phone}
                  type="tel"
                  inputMode="tel"
                  name="phone"
                  autoComplete="tel"
                  required
                  data-clarity-mask="true"
                  value={phoneValue}
                  onChange={(e) => setPhoneValue(e.target.value)}
                  aria-invalid={errors.phone ? true : undefined}
                  aria-describedby={describedBy('phone')}
                />
                {fieldError('phone')}
              </label>
              <label className="lp-field">
                Email
                <input
                  ref={fieldRefs.email}
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  data-clarity-mask="true"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={describedBy('email')}
                />
                {fieldError('email')}
              </label>
              <label className="lp-field">
                <span>
                  Anything else? <span className="lp-hint">Optional</span>
                </span>
                <input
                  type="text"
                  name="message"
                  maxLength={500}
                  autoComplete="off"
                  data-clarity-mask="true"
                  placeholder={isRaid ? 'e.g. Synology 4-bay, two drives failed' : 'e.g. WD 2TB external, project files on it'}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </label>
            </div>
            {/* Honeypot: hidden from people, bots fill it in. */}
            <div className="lp-hp" aria-hidden="true">
              <label>
                Website
                <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <div className="lp-form-actions">
              <button type="button" className="lp-btn lp-btn-ghost" onClick={() => goTo(1)}>
                Back
              </button>
              <button ref={submitRef} type="submit" className="lp-btn lp-btn-red" disabled={sending}>
                {sending ? 'Sending…' : 'Get my free evaluation'}
              </button>
            </div>
            <p className="lp-form-next">
              Next: we reply within one business day. After the free evaluation you get a fixed quote, and nothing is
              charged unless you approve it.
            </p>
            {apiFailed && (
              <p className="lp-alert" role="alert">
                Sorry, that didn&apos;t go through. Please try again, or call <a href={tel}>{phone}</a>
                {mainLine ? <>. {mainLineLink}</> : '.'}
              </p>
            )}
            <p className="lp-form-note">
              Need us sooner? Call <a href={tel}>{phone}</a>
              {mainLine ? <>. {mainLineLink}</> : '.'} By sending this you agree to our <a href="/privacy">privacy policy</a>.
            </p>
          </form>
        )}
      </div>

      <div className="lp-form-trust">
        <LpIcon name="lock" size={18} />
        {va ? 'Your details go to our recovery team and our CRM. No spam.' : 'Your details go to our lab team and our CRM. No spam.'}
      </div>
    </div>
  );
}
