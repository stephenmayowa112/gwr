/**
 * Design tokens for Favour Ugegbe's 48-Hour French Language Marathon
 * Default: Option 1 (Lagos Emerald & Warm Gold)
 * Alternate: Option 2 (National Heritage & Royal Champagne)
 */

export interface ColorPalette {
  id: string;
  name: string;
  description: string;
  primary: string; // Deep green
  primaryDark: string; // Deep forest
  primaryLight: string; // Subtle emerald tint
  accent: string; // Warm gold
  accentHover: string;
  accentSubtle: string;
  canvas: string; // Main background
  canvasSubtle: string; // Card background
  border: string; // Subtle hairline border
  textPrimary: string;
  textMuted: string;
  heroBackground: string;
}

export const PALETTES: Record<string, ColorPalette> = {
  emeraldGold: {
    id: 'emeraldGold',
    name: 'Lagos Emerald & Warm Gold',
    description: 'Deep Nigerian emerald green with rich celebratory warm gold accents and warm off-white canvas.',
    primary: '#064E3B', // Emerald 900
    primaryDark: '#022C22', // Forest 950
    primaryLight: '#ECFDF5', // Emerald 50
    accent: '#D97706', // Amber 600 / Warm Gold
    accentHover: '#B45309',
    accentSubtle: '#FEF3C7',
    canvas: '#FAF8F5',
    canvasSubtle: '#FFFFFF',
    border: 'rgba(6, 78, 59, 0.12)',
    textPrimary: '#0F172A',
    textMuted: '#475569',
    heroBackground: '#022C22',
  },
  heritageChampagne: {
    id: 'heritageChampagne',
    name: 'National Heritage & Royal Champagne',
    description: 'Classic Nigerian pine green with royal champagne gold accents and pure white structural framing.',
    primary: '#0B3B24',
    primaryDark: '#052214',
    primaryLight: '#E8F5EE',
    accent: '#E5A93C',
    accentHover: '#CA8A04',
    accentSubtle: '#FEF9C3',
    canvas: '#F8FAFC',
    canvasSubtle: '#FFFFFF',
    border: 'rgba(11, 59, 36, 0.15)',
    textPrimary: '#0A0A0A',
    textMuted: '#52525B',
    heroBackground: '#052214',
  }
};

export const DEFAULT_PALETTE_ID = 'emeraldGold';

export const TYPOGRAPHY = {
  displayFont: "'Syne', -apple-system, BlinkMacSystemFont, sans-serif",
  bodyFont: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  monoFont: "'JetBrains Mono', monospace",
  headlineWeights: {
    display: 700,
    heading: 600,
    body: 400,
    emphasis: 600,
  }
};
