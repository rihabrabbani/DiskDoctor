import { Geist } from 'next/font/google';
import '@/components/lp/lp.css';

// Ad landing pages: own header, footer and sticky bar; the site's are not used here.
const geist = Geist({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--lp-font', display: 'swap' });

// GTM and HubSpot tracking load on every LP visit (via GTM), so open those connections early.
const PRECONNECT = ['https://www.googletagmanager.com', 'https://js.hs-scripts.com', 'https://js-na2.hs-analytics.net'];

export default function LpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`lp ${geist.variable}`}>
      {PRECONNECT.map((href) => (
        <link key={href} rel="preconnect" href={href} />
      ))}
      {children}
    </div>
  );
}
