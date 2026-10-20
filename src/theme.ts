// EventQuan skin tokens. Texas A&M is the active skin; Bryan and College
// Station are sibling nodes with their own colours (Troy's regional board).
export const colors = {
  maroon: '#500000',
  maroonDeep: '#3A0000',
  maroonInk: '#2A0505',
  maroonSoft: '#F6ECEC',
  maroonLine: '#E9D6D6',
  gold: '#FFCB2F',
  goldDeep: '#E5AE00',
  goldSoft: '#FFF6D6',

  bg: '#F3F1EE',
  card: '#FFFFFF',
  ink: '#1B1514',
  ink2: '#5C5250',
  ink3: '#958B88',
  line: '#E8E3DF',
  lineSoft: '#F0ECE9',

  live: '#E5322D',
  ok: '#1F8A4C',

  bryan: '#1F5FAD',
  bryanSoft: '#E8F0FA',
  cstat: '#13795B',
  cstatSoft: '#E6F3EE',

  night: '#0E0808',
  nightCard: '#1C1313',
  nightLine: '#2E2222',
  nightInk2: '#B9ACA9',

  lsu: '#461D7C',
  lsuGold: '#FDD023',

  eqNavy: '#0B1A33',
  eqBlue: '#2F80ED',
} as const;

export const fonts = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  heavy: 'Inter_800ExtraBold',
  display: 'BarlowCondensed_700Bold',
  displayHeavy: 'BarlowCondensed_800ExtraBold',
  displaySemi: 'BarlowCondensed_600SemiBold',
} as const;

// v2 "quiet" direction: warm paper, near-black ink, maroon as a single accent.
export const quiet = {
  paper: '#FAF8F5',
  surface: '#FFFFFF',
  sunk: '#F2EFEB',
  ink: '#151112',
  ink2: '#6B6361',
  ink3: '#A39B98',
  hair: '#ECE7E2',
  accent: colors.maroon,
  night: '#0C0A0A',
  nightSurface: '#181414',
  nightHair: '#2A2424',
} as const;

export type NodeKey = 'tamu' | 'bryan' | 'cstat';

export const nodeColors: Record<NodeKey, { solid: string; soft: string; label: string }> = {
  tamu: { solid: colors.maroon, soft: colors.maroonSoft, label: 'Texas A&M' },
  bryan: { solid: colors.bryan, soft: colors.bryanSoft, label: 'Bryan' },
  cstat: { solid: colors.cstat, soft: colors.cstatSoft, label: 'College Station' },
};
