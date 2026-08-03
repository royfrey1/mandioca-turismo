// SECCIÓN PRE-RESERVA — CONTENIDO Y ESTRUCTURA PREPARADA
// Los datos de contacto reales aún están vacíos (`src/config/business.ts`):
// whatsapp, phone, email e instagram NO deben inventarse (AGENTS.md §24, §33).
// CTA preparado: el componente construye el enlace wa.me a partir de
// `businessConfig.whatsapp`; cuando ese dato se cargue, el botón se conecta solo.
// Estructura prevista cuando existan datos reales (AGENTS.md §22/§23): un
// formulario de pre-reserva (nombre, WhatsApp, email, fecha, personas,
// experiencia, destino, mensaje) que construye el mensaje y abre WhatsApp.
// NO está implementado todavía para no inventar procesos ni campos comerciales.
// Registrado en INFO_REAL_OBSERVADA.md.txt (§8).
export type PreReservaSectionContent = {
  eyebrow: string
  title: string
  intro: string
  ctaLabel: string
  whatsappMessage: string
  supportText: string
}

export const preReservaSection: PreReservaSectionContent = {
  eyebrow: 'Pre-reserva',
  title: 'Misiones te está esperando.',
  intro:
    'Naturaleza, agua y caminos de tierra colorada te esperan. Escribinos y coordinamos tu próxima salida con guías locales.',
  ctaLabel: 'Pre-reservar mi experiencia',
  whatsappMessage: 'Hola Mandioca 👋 Quiero hacer una pre-reserva.',
  supportText:
    'WhatsApp y formulario de pre-reserva disponibles próximamente.',
}
