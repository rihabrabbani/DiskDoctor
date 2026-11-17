'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { isLightOnlyPath } from '@/lib/lightOnly';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme') as Theme;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    // Light-only pages (/thank-you) ignore both, like the pre-paint script in app/layout.tsx.
    const lightOnly = isLightOnlyPath(window.location.pathname);
    const initialTheme = lightOnly ? 'light' : savedTheme || systemTheme;

    setTheme(initialTheme);
    document.documentElement.className = initialTheme;
    if (lightOnly) document.documentElement.style.colorScheme = 'light';
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.className = newTheme;
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
