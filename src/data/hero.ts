export type Cta = {
  label: string
  href: string
}

export type HeroContent = {
  eyebrow: string
  title: string
  description: string
  primaryCta: Cta
  secondaryCta: Cta
}

export const heroContent: HeroContent = {
  eyebrow: 'Turismo de Naturaleza · Misiones',
  title: 'Descubrí Misiones de una manera diferente.',
  description:
    'Experiencias de naturaleza, aventura y descubrimiento acompañadas por guías locales.',
  primaryCta: { label: 'Consultar una experiencia', href: '#pre-reserva' },
  secondaryCta: { label: 'Explorar experiencias', href: '#experiencias' },
}
