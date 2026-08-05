// SECCIÓN NOSOTROS — CONTENIDO DUAL: MANDIOCA + MARCIO
// Información respaldada por:
// - Artículo "Mandioca, turismo en la selva" (Economis, 2025)
// - Infotur Mintur Misiones (Leg. RA-015-Ag-Ti)
// - Biografía pública de Instagram (@mandioca.turismo)
// - INFO_REAL_OBSERVADA.md.txt
// NO se inventaron datos personales, profesionales ni comerciales.
// Si el cliente entrega textos oficiales, reemplazar únicamente estos valores.

export type AboutMandioca = {
  eyebrow: string
  title: string
  description: string
  highlights: string[]
}

export type AboutMarcio = {
  name: string
  role: string
  bio: string
  highlights: string[]
}

export type AboutSectionContent = {
  mandioca: AboutMandioca
  marcio: AboutMarcio
  cta: {
    label: string
    href: string
  }
}

export const aboutSection: AboutSectionContent = {
  mandioca: {
    eyebrow: 'Quienes somos',
    title: 'Turismo de naturaleza en Misiones.',
    description:
      'Mandioca es una agencia de turismo de naturaleza con base en Eldorado, Misiones. Propone experiencias de aventura y descubrimiento en la selva misionera: kayak por ríos y arroyos, senderismo por caminos de tierra colorada, observación de fauna y recorridos hacia saltos y cascadas. Cada salida se adapta a los intereses y el ritmo de quien viaja.',
    highlights: [
      'Excursiones personalizadas',
      'Grupos reducidos',
      'Turismo de bajo impacto',
      'Guía local',
    ],
  },
  marcio: {
    name: 'Marcio Germán Antunez',
    role: 'Guía de turismo y fundador',
    bio: 'Guardaparque en el Parque Nacional Iguazú, Marcio fundó Mandioca para ofrecer turismo de naturaleza con experiencias personalizadas en la selva misionera. Socorrista WRF en ambientes naturales, rurales y agrestes, combatiente en Incendios forestales, certificación de Kayak (ACA nivel 2).',
    highlights: [
      'Guardaparque Nacional',
      'Kayak de travesía',
      'Experiencias para sentir',
    ],
  },
  cta: {
    label: 'Conocé nuestras experiencias',
    href: '#experiencias',
  },
}
