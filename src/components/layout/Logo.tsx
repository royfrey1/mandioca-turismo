import { cn } from '../../lib/cn'
import logoColor from '../../assets/MANDIOCA/LOGOS_PNG/LOGO SIN DESCRIPTOR.png'
import logoWhite from '../../assets/MANDIOCA/LOGOS_PNG/LOGO SIN DESCRIPTOR B_N.png'
import logoWithDescriptorColor from '../../assets/MANDIOCA/LOGOS_PNG/LOGO CON DESCRIPTOR.png'
import logoWithDescriptorWhite from '../../assets/MANDIOCA/LOGOS_PNG/LOGO CON DESCRIPTOR B_N..png'

type LogoProps = {
  light?: boolean
  loading?: 'lazy' | 'eager'
  variant?: 'default' | 'withDescriptor'
  className?: string
}

// Assets oficiales de LOGOS_PNG/ verificados por muestreo de píxeles. El sufijo
// NO es consistente entre variantes (DESING_SYSTEM.md §5.3):
//   - "LOGO SIN DESCRIPTOR B_N.png"   = blanca (negativa) -> fondos oscuros
//   - "LOGO SIN DESCRIPTOR B_N..png"  = negra            -> no usada
//   - "LOGO CON DESCRIPTOR B_N..png"  = blanca (negativa) -> Footer (light)
//   - "LOGO CON DESCRIPTOR B_N.png"   = negra            -> no usada
//   - sin sufijo                      = a color          -> fondos claros
// `default` = Marca sin descriptor (Navbar); `withDescriptor` = Marca principal (Footer).
export function Logo({
  light = false,
  loading = 'eager',
  variant = 'default',
  className,
}: LogoProps) {
  const withDescriptor = variant === 'withDescriptor'
  const src = withDescriptor
    ? light
      ? logoWithDescriptorWhite
      : logoWithDescriptorColor
    : light
      ? logoWhite
      : logoColor

  return (
    <img
      src={src}
      alt="Mandioca"
      width={withDescriptor ? 2542 : 3424}
      height={withDescriptor ? 1689 : 1224}
      loading={loading}
      className={cn('w-auto', className ?? 'h-10 lg:h-14')}
    />
  )
}
