import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '../../lib/cn'
import { navLinks, ctaLink } from '../../config/navigation'
import { Container } from './Container'
import { Logo } from './Logo'
import { Button } from '../ui/Button'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  const light = !scrolled && !menuOpen

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      firstLinkRef.current?.focus()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        light
          ? 'bg-deep-earth'
          : 'border-b border-deep-earth/10 bg-warm-white/90 shadow-soft backdrop-blur-md',
      )}
    >
      <Container width="wide" className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <a
          href="#inicio"
          onClick={closeMenu}
          aria-label="Mandioca, Turismo de Naturaleza — ir al inicio"
          className="shrink-0 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <Logo light={light} />
        </a>

        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-8 lg:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'relative text-sm font-medium transition-colors duration-200',
                'after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-[width] after:duration-200',
                'hover:after:w-full',
                light
                  ? 'text-white hover:text-white'
                  : 'text-deep-earth/80 hover:text-deep-earth',
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href={ctaLink.href}>{ctaLink.label}</Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          className={cn(
            'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-200 lg:hidden',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
            light
              ? 'text-white hover:bg-white/10'
              : 'text-deep-earth hover:bg-deep-earth/5',
          )}
        >
          {menuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </Container>

      <div
        id="menu-mobile"
        inert={!menuOpen}
        aria-hidden={!menuOpen}
        className={cn(
          'lg:hidden',
          'transition-[max-height,opacity,visibility] duration-300 ease-out',
          menuOpen ? 'visible max-h-[85vh] overflow-y-auto opacity-100' : 'invisible max-h-0 opacity-0',
        )}
      >
        <Container width="wide" className="border-t border-deep-earth/10 bg-warm-white py-6">
          <nav aria-label="Navegación móvil">
            <ul className="flex flex-col">
              {navLinks.map((link, index) => (
                <li key={link.href}>
                  <a
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={link.href}
                    onClick={closeMenu}
                    className="block rounded-lg py-3 text-lg font-medium text-deep-earth transition-colors duration-200 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button
                href={ctaLink.href}
                size="lg"
                fullWidth
                onClick={closeMenu}
              >
                {ctaLink.label}
              </Button>
            </div>
          </nav>
        </Container>
      </div>
    </header>
  )
}
