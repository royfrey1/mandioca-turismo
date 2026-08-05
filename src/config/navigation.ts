export type NavLink = {
  label: string
  href: string
}

export const navLinks: NavLink[] = [
  { label: 'Experiencias', href: '#experiencias' },
  { label: 'Explorá Misiones', href: '#destinos' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Testimonios', href: '#testimonios' },
]

export const ctaLink: NavLink = {
  label: 'Pre-reservar',
  href: '#pre-reserva',
}
