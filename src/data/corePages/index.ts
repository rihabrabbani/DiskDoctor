import type { CorePage } from './types';
import { hardDriveRecovery } from './hardDriveRecovery';
import { ssdRecovery } from './ssdRecovery';
import { raidRecovery } from './raidRecovery';
import { nasRecovery } from './nasRecovery';
import { serverRecovery } from './serverRecovery';
import { virtualRecovery } from './virtualRecovery';
import { dataRecoveryCost } from './dataRecoveryCost';
import { mailInDataRecovery } from './mailInDataRecovery';

export type { CorePage } from './types';

// Service pages under /services/<id>, in main-nav order (virtual-recovery is not in the main nav).
export const coreServicePages: CorePage[] = [
  hardDriveRecovery,
  ssdRecovery,
  raidRecovery,
  nasRecovery,
  serverRecovery,
  virtualRecovery,
];

export { dataRecoveryCost, mailInDataRecovery };

export const getCoreServicePage = (id: string) => coreServicePages.find((page) => page.id === id);
