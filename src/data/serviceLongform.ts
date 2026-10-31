export const serviceLongform: Record<
  string,
  { paragraphs: string[]; faqs: { question: string; answer: string }[] }
> = {
  'mobile-recovery': {
    paragraphs: [
      'Phone data recovery is chip-level work when the board will not boot, the screen is gone, or water reached the NAND. Consumer apps that require a working phone cannot read a device that does not enumerate. DiskDoctor recovers iPhone and Android data at the Columbia lab by imaging the storage, not by guessing passcodes on a locked UI.',
      'Water damage: power it off, do not charge it, do not put it in rice or a freeze cycle. Corrosion continues when you apply power. Bring it as-is. We clean and read the memory when the board will not start.',
      'Broken screens and boot loops still often allow a dump if the NAND and controller are intact. Factory-reset and “find my” situations are different: we do not bypass Apple or Google account locks as a theft service. If you own the device and the storage can be read, we recover what the hardware will give us.',
      'What we typically return: photos, messages, call logs, and app documents that still exist on the chip. Cloud-only data that was never stored locally is not on the phone. Tell us which folders matter.',
      'Turnaround is often a few days once the device is in Columbia. Emergency jobs are scheduled by phone at (410) 937-7332. Evaluation is free. No data, no charge on the recovery fee. Drop off in Columbia, book a Tysons appointment, or ship the phone powered off in a padded box.',
      'Do not run more charging cycles, DFU loops, or third-party “unlock” tools on a board that already failed. Those tools write. Imaging is a read.',
      'iPhone logic-board failures after a drop often look like a black screen with a brief vibrate. The NAND may still be intact. We do not need a working display to read storage when the board can be powered in a fixture. If the NAND itself is cracked, odds drop. Do not keep plugging the phone into a laptop “to see if iTunes sees it.”',
      'Android phones vary by chipset. Some allow a supported physical dump; others need board-level work. A boot loop after an update is not the same job as a phone that spent a night in a toilet. Tell us the model, what happened, and whether you already ran a factory reset. A reset that securely wiped the user data is not undoable by a lab slogan.',
      'Rice, silica gel, and hair dryers do not stop corrosion. They delay a proper clean. Every power cycle after water is a new short. If the phone is wet, leave it off, do not press the charge port dry with a metal pin, and bring it in. We would rather see corrosion we can clean than a board someone cooked on a heater.',
      'Legal and insurance jobs: say if photos are evidence. We can note chain-of-custody and return a hashed copy. We still need you to own the device. A found phone with someone else’s iCloud lock is not a recovery we will perform.',
      'Shipping a phone: powered off, SIM tray optional, padded box, not a loose envelope. Include the passcode only if you want a logical extraction on a phone that still boots. Many physical jobs never see the UI. Do not ship a phone that is still in a DFU loop on a power bank.',
      'After recovery we typically deliver photos and documents on a USB drive or a download you approve. We do not re-install your apps or “fix the phone so it rings again” as the primary deliverable. If the board can be repaired after the dump, that is a separate conversation. The files come first.',
      'What “phone data recovery services” means here: not a mall kiosk that swaps a screen and hopes iCloud has the camera roll. If the photos were only in iCloud or Google Photos, get them from the cloud. If they were on the device and the board died, that is a lab job in Columbia.',
      'SIM and SD cards: a removable SD card is a separate recovery. Remove it if you can without forcing the tray. We can image the card and the phone NAND as two jobs. Do not format the card in another phone “to see if it works.”',
      'Passcode and encryption: a phone that still boots can often do a logical extraction if you know the passcode. A phone that does not boot is a physical or chip-off path. We will not advertise bypasses for stolen devices. Own the phone, or have a legal right to the data.',
      'Turnaround details: a dry, intact board that still enumerates can be a same-week logical job. A washed iPhone that will not power is a longer board-level job. Emergency intake is by phone at (410) 937-7332, not by walking into Tysons unannounced.',
      'Start with the form on this page. Name the model, what happened (water, drop, boot loop, reset), and whether photos, messages, or both matter. Power the phone off. Evaluation is free. No data, no charge on the recovery fee if we cannot retrieve what you named.',
    ],
    faqs: [
      { question: 'Can you recover data from a phone with a broken screen?', answer: 'Often yes, using chip-level or board-level reads that do not need a working display.' },
      { question: 'What if the phone was in water?', answer: 'Power it off and stop charging it. Rice does not help. Bring it in for chip-level recovery.' },
      { question: 'Do I need to unlock the phone?', answer: 'A passcode can speed logical extraction on a phone that still boots. Many physical jobs do not need the UI.' },
      { question: 'iPhone and Android?', answer: 'Yes. Methods differ by chipset. We recover both at the Columbia lab.' },
      { question: 'How long does phone recovery take?', answer: 'Often a few days after arrival. Emergency intake is by phone.' },
      { question: 'Is evaluation free?', answer: 'Yes. Fixed quote before work. No data, no charge on the recovery fee.' },
      { question: 'Can you recover a factory-reset phone?', answer: 'Only if the NAND still holds remnants and the reset did not securely wipe. Odds drop after a reset. Stop using the phone.' },
      { question: 'Where do I bring a phone in MD or VA?', answer: 'Drop it off at the Columbia lab, or book an appointment at our Tysons office. Ship powered off if you cannot drive.' },
    ],
  },
};
