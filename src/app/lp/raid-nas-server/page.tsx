import LpPage from '@/components/lp/LpPage';
import { lpMetadata } from '@/lp/meta';

export const metadata = lpMetadata('all', 'raid');

export default function Page() {
  return <LpPage areaId="all" templateId="raid" />;
}
