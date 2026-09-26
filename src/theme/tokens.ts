export const colors = {
  background: '#F4F7F5',
  surface: '#FFFFFF',
  primary: '#176B5B',
  primaryPressed: '#105044',
  text: '#17211F',
  textMuted: '#5E6C69',
  border: '#D9E2DF',
  onPrimary: '#FFFFFF',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radii = { sm: 8, md: 16, pill: 999 } as const;

export const typography = {
  title: { fontSize: 32, lineHeight: 38, fontWeight: '700' as const },
  heading: { fontSize: 20, lineHeight: 26, fontWeight: '600' as const },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' as const },
  button: { fontSize: 16, lineHeight: 20, fontWeight: '600' as const },
} as const;
