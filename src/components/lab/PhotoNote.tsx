import { PHOTO_NOTE } from '@/data/labPhotos';

// Small (i) on a lab photo. CSS-only (styles in globals.css): the note shows on hover, and a tap
// (phones have no hover) or Space toggles it through the hidden checkbox. No client JS.
export default function PhotoNote({ className = '' }: { className?: string }) {
  return (
    <label className={`lab-note ${className}`}>
      <input type="checkbox" className="lab-note-input" aria-label="About these photos" />
      <span className="lab-note-dot" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-5M12 8h.01" strokeLinecap="round" />
        </svg>
      </span>
      <span className="lab-note-text" role="note">
        {PHOTO_NOTE}
      </span>
    </label>
  );
}
