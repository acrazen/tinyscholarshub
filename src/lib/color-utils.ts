// src/lib/color-utils.ts

export interface HSLColor {
  h: number;
  s: number;
  l: number;
}

/**
 * Parses an HSL color string (e.g., "25 95% 55%") into an HSLColor object.
 * Returns null if the string is not a valid HSL format.
 */
export function parseHslString(hslString: string): HSLColor | null {
  if (typeof hslString !== 'string') return null;
  const match = hslString.trim().match(/^(\d{1,3})\s+(\d{1,3})%\s+(\d{1,3})%$/);
  if (!match) return null;

  return {
    h: parseInt(match[1], 10),
    s: parseInt(match[2], 10),
    l: parseInt(match[3], 10),
  };
}

/**
 * Converts an HSLColor object back to an HSL string.
 */
export function hslToString(hsl: HSLColor): string {
  return `${hsl.h} ${hsl.s}% ${hsl.l}%`;
}

/**
 * Generates a specified number of lighter variants from a base HSL color.
 * @param baseHsl The base HSLColor object.
 * @param count The number of lighter variants to generate.
 * @param step The increment for lightness (percentage points).
 * @returns An array of HSLColor objects representing the lighter variants.
 */
export function generateLighterVariants(
  baseHsl: HSLColor,
  count: number = 5,
  step: number = 10
): HSLColor[] {
  const variants: HSLColor[] = [];
  for (let i = 1; i <= count; i++) {
    let newLightness = baseHsl.l + i * step;
    let newSaturation = baseHsl.s;

    // For very light colors, slightly reduce saturation to avoid harshness
    if (newLightness > 85 && newLightness <= 90) {
        newSaturation = Math.max(0, baseHsl.s - 10);
    } else if (newLightness > 90) {
        newSaturation = Math.max(0, baseHsl.s - 20);
    }
    
    newLightness = Math.min(98, newLightness); // Cap lightness to avoid pure white (100%) which can look off

    variants.push({
      h: baseHsl.h,
      s: Math.max(0, Math.min(100, newSaturation)),
      l: Math.max(0, Math.min(100, newLightness)),
    });
  }
  return variants;
}

/**
 * Validates if a string is in the format "H S% L%".
 */
export function isValidHslColorString(hslString: string): boolean {
  return parseHslString(hslString) !== null;
}
