import { WhatsAppIcon } from '../ui/WhatsAppIcon'
import { footerContent } from '../../data/footer'
import { buildWhatsAppLink } from '../../lib/whatsapp'

// Botón WhatsApp flotante (DESING_SYSTEM.md §9): visible, discreto, accesible y
// fijo, sin tapar CTA ni contenido importante. Solo se renderiza cuando
// `businessConfig.whatsapp` esté cargado, evitando un destino roto sin datos
// inventados (AGENTS.md §24, §33).
export function WhatsAppButton() {
  const href = buildWhatsAppLink(footerContent.whatsappMessage)
  if (!href) return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Escribinos por WhatsApp"
      title="Escribinos por WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-soft transition-transform duration-200 hover:scale-105 md:bottom-6 md:right-6"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  )
}
