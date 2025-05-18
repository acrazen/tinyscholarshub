
// src/components/layout/theme-applicator.tsx
"use client";
import { useEffect } from 'react';
import { useAppCustomization } from '@/context/app-customization-context';

export function ThemeApplicator() {
  const { primaryColor, secondaryColor } = useAppCustomization();

  useEffect(() => {
    // These variables are directly used in globals.css as hsl(var(--primary)) etc.
    // So we set the HSL value string directly.
    if (primaryColor) {
      document.documentElement.style.setProperty('--primary', primaryColor);
    }
    if (secondaryColor) {
      document.documentElement.style.setProperty('--secondary', secondaryColor);
    }
    // Note: More advanced theming would also calculate and set contrasting
    // foreground colors (e.g., --primary-foreground) if the primary color changes significantly.
    // For this prototype, we assume the default foregrounds still work.
  }, [primaryColor, secondaryColor]);

  return null; // This component doesn't render anything itself
}
