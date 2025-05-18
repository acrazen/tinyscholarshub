// src/components/layout/theme-applicator.tsx
"use client";
import { useEffect } from 'react';
import { useAppCustomization } from '@/context/app-customization-context';
import { parseHslString } from '@/lib/color-utils'; // Assuming parseHslString is in color-utils

export function ThemeApplicator() {
  const { primaryColor, secondaryColor } = useAppCustomization();

  useEffect(() => {
    const root = document.documentElement;

    if (primaryColor) {
      root.style.setProperty('--primary', primaryColor);
      const primaryHSL = parseHslString(primaryColor);

      if (primaryHSL) {
        const H = primaryHSL.h;
        const S = primaryHSL.s;
        const L = primaryHSL.l;

        // Derive Accent
        const accentS = Math.max(0, Math.min(100, S - 5));
        const accentL = Math.max(0, Math.min(100, L + 5));
        root.style.setProperty('--accent', `${H} ${accentS}% ${accentL}%`);

        // Derive Ring
        const ringL = Math.max(0, Math.min(100, L + 5));
        root.style.setProperty('--ring', `${H} ${S}% ${ringL}%`);
        
        // Derive Background related colors using the Hue from primaryColor
        // For these, we'll use fixed low saturation and high lightness for a tint effect
        root.style.setProperty('--background', `${H} 15% 97%`);
        root.style.setProperty('--muted', `${H} 20% 94%`);
        root.style.setProperty('--border', `${H} 25% 88%`);
        root.style.setProperty('--input', `${H} 20% 96%`);

        // Derive Sidebar colors to match the theme
        root.style.setProperty('--sidebar-background', `${H} 15% 96%`);
        root.style.setProperty('--sidebar-accent', `${H} ${accentS}% ${accentL}%`); // Use derived main accent
        root.style.setProperty('--sidebar-border', `${H} 25% 85%`);
        
        const sidebarPrimaryS = Math.max(0, Math.min(100, S - 5));
        const sidebarPrimaryL = Math.max(0, Math.min(100, L - 5));
        root.style.setProperty('--sidebar-primary', `${H} ${sidebarPrimaryS}% ${sidebarPrimaryL}%`);
        root.style.setProperty('--sidebar-ring', `${H} ${accentS}% ${accentL}%`); // Use derived main accent
      }
    }

    if (secondaryColor) {
      root.style.setProperty('--secondary', secondaryColor);
      // Potentially derive --secondary-foreground if secondaryColor can vary wildly
      // For now, assuming the default --secondary-foreground from globals.css remains adequate
    }
    // Note: --foreground, --card-foreground etc., are kept as their defaults from globals.css
    // These are generally dark text colors that should work over light derived backgrounds.
  }, [primaryColor, secondaryColor]);

  return null; // This component doesn't render anything itself
}
