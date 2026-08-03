export type FontFamily = keyof typeof fontFamilies

export const fontFamilies = {
  display: 'font-display',
  sans: 'font-sans',
} as const

export type TypeScaleKey = keyof typeof typeScale

export const typeScale = {
  display: 'text-display',
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
  bodyLg: 'text-body-lg',
  body: 'text-body',
  small: 'text-sm',
} as const
