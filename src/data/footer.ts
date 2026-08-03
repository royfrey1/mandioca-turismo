// FOOTER — CONTENIDO Y ESTRUCTURA PREPARADA
// Los datos de contacto reales aún están vacíos (`src/config/business.ts`):
// whatsapp, phone, email e instagram NO deben inventarse (AGENTS.md §24, §33).
// El Footer renderiza la ubicación real de `businessConfig.location` y, cuando
// se carguen los datos de contacto en `src/config/business.ts`, suma
// automáticamente WhatsApp, teléfono, email e Instagram sin tocar el componente.
// Registrado en INFO_REAL_OBSERVADA.md.txt (§8).
export type FooterContent = {
  description: string
  navigationLabel: string
  contactLabel: string
  whatsappMessage: string
  backToTopLabel: string
  copyrightNote: string
}

export const footerContent: FooterContent = {
  description:
    'Turismo de naturaleza en Misiones: expediciones y excursiones con guías locales para conocer la provincia.',
  navigationLabel: 'Navegación',
  contactLabel: 'Contacto',
  whatsappMessage: 'Hola Mandioca 👋 Quiero consultar por una experiencia.',
  backToTopLabel: 'Volver arriba',
  copyrightNote: 'Turismo de naturaleza · Eldorado, Misiones, Argentina',
}
