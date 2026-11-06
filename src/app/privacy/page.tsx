import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { EMAIL, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How DiskDoctor Data Recovery handles contact-form and recovery-job information.',
  alternates: { canonical: `${SITE_URL}/privacy` },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Header />
      <main className="py-16 container mx-auto px-4 max-w-3xl text-[var(--color-text-secondary)] leading-relaxed space-y-4">
        <h1 className="text-4xl font-bold text-[var(--color-text-primary)]">Privacy Policy</h1>
        <p>
          DiskDoctor Data Recovery (Columbia, MD) collects the information you submit on our contact
          form and the details needed to diagnose a recovery job. That data is used to quote, recover,
          and return your files. We do not sell it.
        </p>
        <p>
          The form is processed by HubSpot. Analytics (when configured) measure page views and
          conversions. Recovered files are returned on media you receive; we do not keep extra copies
          longer than needed to confirm delivery unless you ask us to retain them.
        </p>
        <p>
          We use Microsoft Clarity and Google Analytics to understand how visitors use our website,
          including session recordings and heatmaps. Text you type into forms is masked and not
          recorded. These tools may use cookies. Learn more in{' '}
          <a
            href="https://privacy.microsoft.com/privacystatement"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-[var(--color-text-primary)]"
          >
            Microsoft&apos;s privacy statement
          </a>
          .
        </p>
        <p>
          We use Google Ads conversion tracking and remarketing to measure which ads lead to enquiries
          and to show our ads to people who have visited our website. You can turn off personalized ads
          from Google in{' '}
          <a
            href="https://adssettings.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-[var(--color-text-primary)]"
          >
            Google&apos;s Ads Settings
          </a>
          .
        </p>
        <p>
          When you submit a form, a hashed (scrambled) copy of your email address and phone number is
          shared with Google to measure our ads. This is Google&apos;s enhanced conversions feature.
        </p>
        <p>
          If you reach our website from a Google ad, the phone number shown may be a Google forwarding
          number. For calls to that number, Google logs the start and end time, the duration and the
          caller&apos;s area code. Google does not record the call.
        </p>
        <p>
          Cookies: HubSpot sets <code>hubspotutk</code> and <code>__hstc</code> to connect form
          submissions with visits. Our own <code>dd_attr</code> cookie remembers how you found us, such
          as the ad or search you came from, for 90 days. Microsoft Clarity and Microsoft Advertising may
          set cookies such as <code>MUID</code>.
        </p>
        <p>
          Google Analytics data is kept for 14 months. To ask us to delete your data, email {EMAIL}.
        </p>
        <p>
          Questions: {EMAIL}.
        </p>
        <p className="text-sm">Last updated: November 6, 2026</p>
      </main>
      <Footer />
    </div>
  );
}
