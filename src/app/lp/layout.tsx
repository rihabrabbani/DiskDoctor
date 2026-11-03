import { Geist } from 'next/font/google';
import '@/components/lp/lp.css';

// Ad landing pages: own header, footer and sticky bar; the site's are not used here.
const geist = Geist({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--lp-font', display: 'swap' });

export default function LpLayout({ children }: { children: React.ReactNode }) {
  return <div className={`lp ${geist.variable}`}>{children}</div>;
}
