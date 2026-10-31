import type { CorePage } from './types';
import { hardDriveRecovery } from './hardDriveRecovery';
import { ssdRecovery } from './ssdRecovery';
import { raidRecovery } from './raidRecovery';
import { nasRecovery } from './nasRecovery';
import { serverRecovery } from './serverRecovery';
import { dataRecoveryCost } from './dataRecoveryCost';

export type { CorePage } from './types';

// Service pages under /services/<id>, in main-nav order.
export const coreServicePages: CorePage[] = [
  hardDriveRecovery,
  ssdRecovery,
  raidRecovery,
  nasRecovery,
  serverRecovery,
];

export { dataRecoveryCost };

export const getCoreServicePage = (id: string) => coreServicePages.find((page) => page.id === id);
