import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type SectionProps = HTMLAttributes<HTMLElement> & {
  background?: 'default' | 'cream' | 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
}

const backgrounds = {
  default: 'bg-white',
  cream: 'bg-warm-white',
  light: 'bg-light-warm',
  dark: 'bg-deep-earth text-warm-white',
} as const

const sizes = {
  sm: 'py-16 lg:py-24',
  md: 'py-20 lg:py-32',
  lg: 'py-24 lg:py-40',
} as const

export function Section({
  background = 'default',
  size = 'md',
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(backgrounds[background], sizes[size], className)}
      {...props}
    />
  )
}
