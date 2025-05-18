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

  const h = parseInt(match[1], 10);
  const s = parseInt(match[2], 10);
  const l = parseInt(match[3], 10);

  if (h < 0 || h > 360 || s < 0 || s > 100 || l < 0 || l > 100) {
    return null;
  }

  return { h, s, l };
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
  step: number = 8 // Adjusted step for more subtle changes
): HSLColor[] {
  const variants: HSLColor[] = [];
  for (let i = 1; i <= count; i++) {
    let newLightness = baseHsl.l + i * step;
    let newSaturation = baseHsl.s;

    if (newLightness > 85 && newLightness <= 90) {
      newSaturation = Math.max(0, baseHsl.s - (step * i / 2)); // More gradual saturation reduction
    } else if (newLightness > 90) {
      newSaturation = Math.max(0, baseHsl.s - (step * i));
    }
    
    newLightness = Math.min(98, newLightness);

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

/**
 * Validates if a string is a valid HEX color string.
 * Supports #RGB, #RRGGBB.
 */
export function isHexColorString(hexString: string): boolean {
  if (typeof hexString !== 'string') return false;
  const hexRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  return hexRegex.test(hexString.trim());
}

/**
 * Converts a HEX color string to an HSLColor object.
 * Returns null if the HEX string is invalid.
 */
export function hexToHsl(hex: string): HSLColor | null {
  if (!isHexColorString(hex)) return null;

  let r = 0, g = 0, b = 0;
  const hexVal = hex.substring(1); // Remove #

  if (hexVal.length === 3) {
    r = parseInt(hexVal[0] + hexVal[0], 16);
    g = parseInt(hexVal[1] + hexVal[1], 16);
    b = parseInt(hexVal[2] + hexVal[2], 16);
  } else if (hexVal.length === 6) {
    r = parseInt(hexVal.substring(0, 2), 16);
    g = parseInt(hexVal.substring(2, 4), 16);
    b = parseInt(hexVal.substring(4, 6), 16);
  } else {
    return null; // Should be caught by isHexColorString, but defensive
  }

  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const cmax = Math.max(rNorm, gNorm, bNorm);
  const cmin = Math.min(rNorm, gNorm, bNorm);
  const delta = cmax - cmin;

  let h = 0;
  if (delta === 0) {
    h = 0;
  } else if (cmax === rNorm) {
    h = ((gNorm - bNorm) / delta) % 6;
  } else if (cmax === gNorm) {
    h = (bNorm - rNorm) / delta + 2;
  } else {
    h = (rNorm - gNorm) / delta + 4;
  }

  h = Math.round(h * 60);
  if (h < 0) h += 360;

  let l = (cmax + cmin) / 2;

  let s = 0;
  if (delta === 0) {
    s = 0;
  } else {
    s = delta / (1 - Math.abs(2 * l - 1));
  }

  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return { h, s, l };
}
