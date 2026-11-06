'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  CONTACT_PREFS,
  DEVICES,
  DEVICE_VALUES,
  FILES_NEEDED,
  LEAD_CHANNELS,
  POWER_DOWN_SYMPTOMS,
  PRIOR_ATTEMPT,
  RAID_LEVELS,
  STATES,
  STEER_DEVICE,
  SYMPTOMS,
  URGENCY,
  URGENCY_LABELS,
  type Attribution,
  type DeviceValue,
} from '@/lp/config/form';
import { LP_FORM_GUID } from '@/lp/config/hubspot';
import { isValidEmail, isValidPhone, toE164 } from '@/lp/phone';
import LpIcon from './LpIcon';

type Step = 1 | 2 | 3 | 'steer';
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
  talkSuffix,
  soonerSuffix,
  stateDefault,
  presetDevice,
}: {
  variant: string;
  phone: string;
  tel: string;
  talkSuffix: string;
  soonerSuffix: string;
  stateDefault: string;
  presetDevice?: DeviceValue;
}) {
  const [step, setStep] = useState<Step>(1);
  const [device, setDevice] = useState<DeviceValue | null>(presetDevice ?? null);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [filesNeeded, setFilesNeeded] = useState<string[]>([]);
  const [priorAttempt, setPriorAttempt] = useState('');
  const [urgency, setUrgency] = useState('');
  const [message, setMessage] = useState('');
  const [driveCount, setDriveCount] = useState('');
  const [raidLevel, setRaidLevel] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState(stateDefault);
  const [contactPref, setContactPref] = useState<string>('Call');
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
    stepRef.current?.focus();
  }, [step]);

  const isRaid = device === DEVICE_VALUES.raid;

  const goTo = (next: Step, dev: DeviceValue | null = device) => {
    setStep(next);
    if (next === 1) return;
    const key = String(next);
    if (stepsSeen.current.has(key)) return;
    stepsSeen.current.add(key);
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
    goTo(value === STEER_DEVICE ? 'steer' : 2, value);
  };

  // Page buttons marked data-cta: the last one clicked becomes dd_cta. A "What happened?" tile also
  // pre-picks its symptom, and the RAID tile opens the RAID path.
  const onCta = useRef<(el: Element) => void>(() => {});
  onCta.current = (el) => {
    const cta = el.getAttribute('data-cta') || '';
    try {
      sessionStorage.setItem('dd_cta', cta);
    } catch {}
    if (el.hasAttribute('data-tile-raid')) {
      if (step === 1 || step === 'steer' || !isRaid) pickDevice(DEVICE_VALUES.raid);
      return;
    }
    const symptom = el.getAttribute('data-tile-symptom');
    if (!symptom) return;
    setSymptoms((list) => (list.includes(symptom) ? list : [...list, symptom]));
    if (step === 'steer') {
      setDevice(presetDevice ?? null);
      setStep(1);
    }
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
    if (!name.trim()) next.name = 'Please enter your name.';
    if (!isValidPhone(phoneValue)) next.phone = 'Please enter a phone number with at least 10 digits.';
    if (!isValidEmail(email)) next.email = 'Please enter a valid email address.';
    return next;
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (sending || !device || device === STEER_DEVICE) return;
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
    try {
      const res = await fetch('/api/lp-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: submissionId.current,
          variant,
          device,
          symptoms,
          filesNeeded,
          priorAttempt,
          urgency,
          message,
          driveCount: isRaid ? driveCount : '',
          raidLevel: isRaid ? raidLevel : '',
          name,
          company,
          phone: phoneValue,
          email,
          state,
          contactPref,
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
      ok = res.ok && (await res.json()).ok === true;
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
    const serviceStateValue = state;
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
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'dd_form_submit', dd_form_id: lead.form_id, dd_lead_type: lead.device, dd_lead_channel: lead.ch });
    location.assign('/thank-you');
  };

  const stepNumber = step === 'steer' ? 1 : step;
  const fieldError = (key: keyof Errors) =>
    errors[key] ? (
      <p className="lp-err" id={`lp-${key}-err`}>
        {errors[key]}
      </p>
    ) : null;
  const showPowerDown = symptoms.some((s) => POWER_DOWN_SYMPTOMS.includes(s));
  const canContinue = symptoms.length > 0;

  return (
    <div id="start" className="lp-form" data-track-position="form_intro" data-clarity-mask="true">
      <div className="lp-form-head">
        <h2>Start your free diagnosis</h2>
        <span className="lp-form-steplabel" aria-live="polite">
          Step {stepNumber} of 3
        </span>
      </div>
      <div className="lp-segs" aria-hidden="true">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`lp-seg${i <= stepNumber ? ' is-on' : ''}`} />
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
              {talkSuffix}
            </p>
          </>
        )}

        {step === 'steer' && (
          <>
            <div className="lp-steer">
              <p>Phones, SD cards and USB sticks aren&apos;t our specialty</p>
              <p>
                Our lab focuses on hard drives, SSDs, RAID and servers. For phones and memory cards we&apos;re usually
                not the right fit, and we&apos;d rather tell you now than waste your time.
              </p>
            </div>
            <button
              type="button"
              className="lp-btn lp-btn-ghost"
              style={{ marginTop: 16, fontSize: 15 }}
              onClick={() => {
                setDevice(null);
                setStep(1);
              }}
            >
              Choose a different device
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="lp-q" id="lp-sym-q">
              What&apos;s happening? <span>(pick at least one)</span>
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
            {showPowerDown && (
              <p className="lp-powerdown" role="status">
                <LpIcon name="warn" size={18} />
                Power it off and don&apos;t keep retrying. Every restart can make recovery harder.
              </p>
            )}
            {isRaid && (
              <div className="lp-grid2">
                <label className="lp-field">
                  How many drives?
                  <input
                    type="number"
                    min={1}
                    inputMode="numeric"
                    placeholder="e.g. 4"
                    value={driveCount}
                    onChange={(e) => setDriveCount(e.target.value)}
                  />
                </label>
                <label className="lp-field">
                  RAID level
                  <select value={raidLevel} onChange={(e) => setRaidLevel(e.target.value)}>
                    <option value="">Choose…</option>
                    {RAID_LEVELS.map((v) => (
                      <option key={v} value={v}>
                        {/^\d+$/.test(v) ? `RAID ${v}` : v}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            )}
            <p className="lp-q" id="lp-files-q">
              What do you need back most? <span>(optional)</span>
            </p>
            <div className="lp-chips" role="group" aria-labelledby="lp-files-q">
              {FILES_NEEDED.map((label) => (
                <button
                  key={label}
                  type="button"
                  className="lp-chip"
                  aria-pressed={filesNeeded.includes(label)}
                  onClick={() => setFilesNeeded((list) => toggle(list, label))}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="lp-q" id="lp-prior-q">
              Has anyone tried to recover it? <span>(optional)</span>
            </p>
            <div className="lp-chips" role="group" aria-labelledby="lp-prior-q">
              {PRIOR_ATTEMPT.map((label) => (
                <button
                  key={label}
                  type="button"
                  className="lp-chip"
                  aria-pressed={priorAttempt === label}
                  onClick={() => setPriorAttempt(priorAttempt === label ? '' : label)}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="lp-q" id="lp-urg-q">
              How urgent is it?
            </p>
            <div className="lp-urgency" role="group" aria-labelledby="lp-urg-q">
              {URGENCY.map((value) => (
                <button
                  key={value}
                  type="button"
                  className="lp-chip"
                  aria-pressed={urgency === value}
                  onClick={() => setUrgency(urgency === value ? '' : value)}
                >
                  {URGENCY_LABELS[value]}
                </button>
              ))}
            </div>
            <label className="lp-field" style={{ marginBottom: 18 }}>
              <span>
                Anything else we should know? <span className="lp-hint">Optional</span>
              </span>
              <textarea
                rows={3}
                maxLength={2000}
                placeholder={
                  isRaid
                    ? 'e.g. Synology 4-bay, two drives failed during a rebuild'
                    : 'e.g. WD My Passport 2TB, dropped last week, project files on it'
                }
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>
            <div className="lp-form-actions" style={{ marginTop: 0 }}>
              <button type="button" className="lp-btn lp-btn-ghost" onClick={() => setStep(1)}>
                Back
              </button>
              <button
                type="button"
                className="lp-btn lp-btn-red"
                disabled={!canContinue}
                aria-describedby={canContinue ? undefined : 'lp-continue-hint'}
                onClick={() => goTo(3)}
              >
                Continue
              </button>
            </div>
            {!canContinue && (
              <p className="lp-form-hint" id="lp-continue-hint">
                Pick at least one symptom to continue.
              </p>
            )}
          </>
        )}

        {step === 3 && (
          <form noValidate onSubmit={submit}>
            <div className="lp-fields">
              <label className="lp-field">
                Your name
                <input
                  ref={fieldRefs.name}
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? 'lp-name-err' : undefined}
                />
                {fieldError('name')}
              </label>
              <label className="lp-field">
                <span>
                  Company <span className="lp-hint">Optional</span>
                </span>
                <input
                  type="text"
                  name="company"
                  autoComplete="organization"
                  maxLength={200}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </label>
              <label className="lp-field">
                <span>
                  Phone <span className="lp-hint">So the lab can call you back</span>
                </span>
                <input
                  ref={fieldRefs.phone}
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  required
                  value={phoneValue}
                  onChange={(e) => setPhoneValue(e.target.value)}
                  aria-invalid={errors.phone ? true : undefined}
                  aria-describedby={errors.phone ? 'lp-phone-err' : undefined}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? 'lp-email-err' : undefined}
                />
                {fieldError('email')}
              </label>
              <label className="lp-field">
                State
                <select name="state" value={state} onChange={(e) => setState(e.target.value)}>
                  {STATES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              <div className="lp-field">
                <span id="lp-pref-q">
                  Best way to reach you <span className="lp-hint">Optional</span>
                </span>
                <div className="lp-urgency lp-pref" role="radiogroup" aria-labelledby="lp-pref-q">
                  {CONTACT_PREFS.map((value) => (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      className="lp-chip"
                      aria-checked={contactPref === value}
                      aria-pressed={contactPref === value}
                      onClick={() => setContactPref(value)}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Honeypot: hidden from people, bots fill it in. */}
            <div className="lp-hp" aria-hidden="true">
              <label>
                Website
                <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <div className="lp-form-actions">
              <button type="button" className="lp-btn lp-btn-ghost" onClick={() => setStep(2)}>
                Back
              </button>
              <button type="submit" className="lp-btn lp-btn-red" disabled={sending}>
                {sending ? 'Sending…' : 'Get my free diagnosis'}
              </button>
            </div>
            <p className="lp-form-next">
              Next: we reply within one business day. After the free diagnosis you get a fixed quote, and nothing is
              charged unless you approve it.
            </p>
            {apiFailed && (
              <p className="lp-alert" role="alert">
                Sorry, that didn&apos;t go through. Please try again, or call <a href={tel}>{phone}</a>
                {soonerSuffix}
              </p>
            )}
            <p className="lp-form-note">
              Need us sooner? Call <a href={tel}>{phone}</a>
              {soonerSuffix} By sending this you agree to our <a href="/privacy">privacy policy</a>.
            </p>
          </form>
        )}
      </div>

      <div className="lp-form-trust">
        <LpIcon name="lock" size={18} />
        Your details go to our lab team and our CRM. No spam.
      </div>
    </div>
  );
}
