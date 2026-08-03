import { businessConfig } from '../config/business'

// Construye un enlace de WhatsApp (AGENTS.md §23) a partir de
// `businessConfig.whatsapp` y un mensaje precompletado.
// Devuelve `null` mientras el número esté vacío para no inventar ni exponer un
// destino roto: cada consumidor decide su fallback (PreReserva → su ancla;
// botón flotante → no se renderiza).
export function buildWhatsAppLink(message: string): string | null {
  const whatsapp = businessConfig.whatsapp.trim()
  if (!whatsapp) return null
  const digits = whatsapp.replace(/\D/g, '')
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}
