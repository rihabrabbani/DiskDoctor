// Pages that always render in the light theme, whatever the visitor's dark-mode setting: /thank-you,
// where ad visitors land straight from the always-light landing pages (ads request, 17 Nov).
// The /lp pages themselves use their own fixed light palette (lp.css) and don't need this.
// Used by the pre-paint theme script in app/layout.tsx and by ThemeContext; keep the two in sync.
export const LIGHT_ONLY_PATH = /^\/thank-you(\/|$)/;

export const isLightOnlyPath = (pathname: string) => LIGHT_ONLY_PATH.test(pathname);
