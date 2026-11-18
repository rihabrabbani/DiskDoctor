import { TEAM } from '@/data/team';

// Ads brief 18 Nov, team block on the landing pages. One line per person, copy exactly as supplied.
// Virginia pages get their own lines: no Maryland, no UMBC, no Columbia. Photos and alt text are the
// ones /about uses (src/data/team.ts); the /about bios are never shown here.

type LpTeamLine = { md: string; va: string };

const LINES: Record<string, LpTeamLine> = {
  'shahid-khan': {
    md: '25+ years recovering data at Disk Doctors; specialist in RAID, enterprise storage, failed hard drives and digital forensics.',
    va: '25+ years recovering data at Disk Doctors; specialist in RAID, enterprise storage, failed hard drives and digital forensics.',
  },
  'shahzeb-khan': {
    md: 'Summa cum laude, UMBC; graduate study at Johns Hopkins. Makes sure every client gets straight answers.',
    va: 'Summa cum laude graduate; graduate study at Johns Hopkins. Makes sure every client gets straight answers.',
  },
  'gracie-hunt': {
    md: 'Maryland native; runs day-to-day operations and keeps every client informed from start to finish.',
    va: 'Runs day-to-day operations and keeps every client informed from start to finish.',
  },
};

export type LpTeamMember = { id: string; name: string; title: string; photo: string; alt: string; line: string };

/** Shahid, Shahzeb, Gracie, with the Virginia or Maryland line. */
export const lpTeam = (va: boolean): LpTeamMember[] =>
  TEAM.map(({ id, name, title, photo, alt }) => ({ id, name, title, photo, alt, line: va ? LINES[id].va : LINES[id].md }));
