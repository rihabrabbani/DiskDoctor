import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import LpPage from '@/components/lp/LpPage';
import { TEMPLATE_BY_SLUG } from '@/lp/config/templates';
import { lpMetadata } from '@/lp/meta';

type Params = { area: string; template: string };

// md/va × data-recovery, hard-drive-recovery, ssd-recovery. Anything else under /lp is a 404.
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return ['md', 'va'].flatMap((area) => Object.keys(TEMPLATE_BY_SLUG).map((template) => ({ area, template })));
}

function resolve({ area, template }: Params) {
  const t = TEMPLATE_BY_SLUG[template];
  if ((area !== 'md' && area !== 'va') || !t) notFound();
  return { areaId: area as 'md' | 'va', templateId: t.id };
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { areaId, templateId } = resolve(await params);
  return lpMetadata(areaId, templateId);
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { areaId, templateId } = resolve(await params);
  return <LpPage areaId={areaId} templateId={templateId} />;
}
