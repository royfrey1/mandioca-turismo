import type { ReactNode } from 'react'
import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react'
import { Container } from './Container'
import { Logo } from './Logo'
import { WhatsAppIcon } from '../ui/WhatsAppIcon'
import { InstagramIcon } from '../ui/InstagramIcon'
import { navLinks } from '../../config/navigation'
import { businessConfig } from '../../config/business'
import { footerContent } from '../../data/footer'
import { buildWhatsAppLink } from '../../lib/whatsapp'

type ContactItem = {
  icon: ReactNode
  label: string
  href?: string
  external?: boolean
}

// Enlaces de contacto construidos desde `businessConfig`: la ubicación siempre
// se muestra (dato real); el resto solo aparece cuando el dato esté cargado,
// evitando inventar datos de contacto (AGENTS.md §24, §33).
function buildContactItems(): ContactItem[] {
  const items: ContactItem[] = [
    { icon: <MapPin className="h-5 w-5" aria-hidden="true" />, label: businessConfig.location },
  ]

  const whatsappHref = buildWhatsAppLink(footerContent.whatsappMessage)
  if (whatsappHref) {
    items.push({
      icon: <WhatsAppIcon className="h-5 w-5" />,
      label: 'WhatsApp',
      href: whatsappHref,
      external: true,
    })
  }

  const phone = businessConfig.phone.trim()
  if (phone) {
    items.push({
      icon: <Phone className="h-5 w-5" aria-hidden="true" />,
      label: phone,
      href: `tel:${phone.replace(/\s/g, '')}`,
    })
  }

  const email = businessConfig.email.trim()
  if (email) {
    items.push({
      icon: <Mail className="h-5 w-5" aria-hidden="true" />,
      label: email,
      href: `mailto:${email}`,
    })
  }

  const instagramHandle = businessConfig.instagram.trim().replace(/^@/, '')
  if (instagramHandle) {
    items.push({
      icon: <InstagramIcon className="h-5 w-5" />,
      label: `@${instagramHandle}`,
      href: `https://instagram.com/${instagramHandle}`,
      external: true,
    })
  }

  return items
}

export function Footer() {
  const year = new Date().getFullYear()
  const contactItems = buildContactItems()

  return (
    <footer className="border-t border-warm-white/10 bg-deep-earth text-warm-white">
      <Container width="wide" className="py-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-8">
          <div className="max-w-md lg:col-span-5">
            <Logo
              light
              loading="lazy"
              variant="withDescriptor"
              className="h-[8.20rem] lg:h-16"
            />
            <p className="mt-1 text-sm leading-relaxed text-warm-white/70">
              {footerContent.description}
            </p>
          </div>

          <nav aria-label="Enlaces del pie de página" className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-warm-white/60">
              {footerContent.navigationLabel}
            </h3>
            <ul className="mt-6 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-warm-white/80 transition-colors duration-200 hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-warm-white/60">
              {footerContent.contactLabel}
            </h3>
            <ul className="mt-6 space-y-4">
              {contactItems.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      {...(item.external
                        ? { target: '_blank', rel: 'noreferrer noopener' }
                        : {})}
                      className="group flex items-center gap-3 text-sm text-warm-white/80 transition-colors duration-200 hover:text-primary"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-warm-white/10 text-warm-white/80 transition-colors duration-200 group-hover:bg-primary/20 group-hover:text-primary">
                        {item.icon}
                      </span>
                      <span className="break-all">{item.label}</span>
                    </a>
                  ) : (
                    <p className="flex items-center gap-3 text-sm text-warm-white/80">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-warm-white/10 text-warm-white/80">
                        {item.icon}
                      </span>
                      <span className="break-all">{item.label}</span>
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-warm-white/10 pt-8 text-xs text-warm-white/50 sm:flex-row sm:items-center">
          <p>
            © {year} {businessConfig.name}. {footerContent.copyrightNote}
          </p>
          <a
            href="#inicio"
            className="group inline-flex items-center gap-2 py-3 text-sm font-semibold transition-colors duration-200 hover:text-primary sm:gap-1.5 sm:py-0 sm:text-xs sm:font-normal md:pr-24"
          >
            {footerContent.backToTopLabel}
            <ArrowUp
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 sm:h-3.5 sm:w-3.5 sm:group-hover:translate-y-0"
            />
          </a>
        </div>
      </Container>
    </footer>
  )
}
