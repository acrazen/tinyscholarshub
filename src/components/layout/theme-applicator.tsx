// src/components/layout/theme-applicator.tsx
"use client";
import { useEffect } from 'react';
import { useAppCustomization } from '@/context/app-customization-context';
import { parseHslString } from '@/lib/color-utils';

export function ThemeApplicator() {
  const { primaryColor, secondaryColor } = useAppCustomization();

  useEffect(() => {
    const root = document.documentElement;

    if (primaryColor) {
      root.style.setProperty('--primary', primaryColor);
      const primaryHSL = parseHslString(primaryColor);

      if (primaryHSL) {
        const H = primaryHSL.h;
        // Primary's saturation and lightness for reference
        const S_primary = primaryHSL.s; 
        const L_primary = primaryHSL.l;

        // Derive Accent from primary
        const accentS = Math.max(0, Math.min(100, S_primary - 5));
        const accentL = Math.max(0, Math.min(100, L_primary + 5));
        root.style.setProperty('--accent', `${H} ${accentS}% ${accentL}%`);

        // Derive Ring from primary
        const ringL = Math.max(0, Math.min(100, L_primary + 5)); // Can be same as accent or slightly different
        root.style.setProperty('--ring', `${H} ${S_primary}% ${ringL}%`);
        
        // Derive Background related colors using the Hue (H) from primaryColor
        // Increase saturation for these derived colors to maintain a "light orange" feel
        // if primary is orange, instead of a desaturated white.
        root.style.setProperty('--background', `${H} 75% 97%`); // Increased saturation from 15%
        root.style.setProperty('--muted', `${H} 50% 94%`);       // Increased saturation from 20%
        root.style.setProperty('--border', `${H} 40% 88%`);      // Increased saturation from 25%
        root.style.setProperty('--input', `${H} 60% 96%`);       // Increased saturation from 20%

        // Derive Sidebar colors to match the theme, with increased saturation
        root.style.setProperty('--sidebar-background', `${H} 70% 96%`); // Increased saturation
        root.style.setProperty('--sidebar-accent', `${H} ${accentS}% ${accentL}%`); // Use derived main accent
        root.style.setProperty('--sidebar-border', `${H} 45% 85%`);       // Increased saturation
        
        const sidebarPrimaryS = Math.max(0, Math.min(100, S_primary - 10)); // Slightly less saturated than main primary
        const sidebarPrimaryL = Math.max(0, Math.min(100, L_primary - 5));  // Slightly darker
        root.style.setProperty('--sidebar-primary', `${H} ${sidebarPrimaryS}% ${sidebarPrimaryL}%`);
        root.style.setProperty('--sidebar-ring', `${H} ${accentS}% ${accentL}%`); // Use derived main accent
      }
    }

    if (secondaryColor) {
      root.style.setProperty('--secondary', secondaryColor);
      // For secondary-foreground, we assume the default from globals.css is generally okay.
      // If secondaryColor can vary wildly, we might need to derive its foreground too.
      // Example: if secondary becomes very dark, foreground should be light.
      const secondaryHSL = parseHslString(secondaryColor);
      if (secondaryHSL) {
        // A simple heuristic for secondary-foreground
        if (secondaryHSL.l < 50) { // If secondary is dark
          root.style.setProperty('--secondary-foreground', `${secondaryHSL.h} ${Math.max(0, secondaryHSL.s - 60)}% ${Math.min(100, secondaryHSL.l + 60)}%`); // Lighter text
        } else { // If secondary is light
          root.style.setProperty('--secondary-foreground', `${secondaryHSL.h} ${Math.min(100, secondaryHSL.s + 40)}% ${Math.max(0, secondaryHSL.l - 60)}%`); // Darker text
        }
      }
    }
  }, [primaryColor, secondaryColor]);

  return null;
}
