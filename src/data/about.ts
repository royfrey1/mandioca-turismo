// SECCIÓN NOSOTROS — CONTENIDO [OBSERVADA]
// Los textos de esta sección se basan en información observada en los canales
// públicos de Mandioca (biografía y publicaciones de @mandioca.turismo), según
// `INFO_REAL_OBSERVADA.md.txt`. No son DEMO y no se inventaron datos comerciales
// (años de experiencia, clientes, certificaciones, equipo, historia, misión).
// Si el cliente entrega textos oficiales, reemplazar únicamente estos valores.
export type AboutSectionContent = {
  eyebrow: string
  title: string
  intro: string
  paragraphs: string[]
  highlights: string[]
  cta: {
    label: string
    href: string
  }
}

export const aboutSection: AboutSectionContent = {
  eyebrow: 'Mandioca · Turismo de Naturaleza',
  title: 'Vivir Misiones no es verla. Es sentirla.',
  intro:
    'Una guía de turismo con base en Eldorado que acompaña a descubrir la selva misionera, sus ríos y su cultura.',
  paragraphs: [
    'Mandioca propone experiencias de naturaleza y aventura: kayak por ríos y arroyos, senderismo por senderos de tierra colorada, observación de fauna y recorridos hacia saltos y cascadas.',
    'Cada salida se vive con un guía local que conoce el territorio, su gente y sus sabores. Cultura y gastronomía regional, naturaleza y conservación, en experiencias pensadas para conectar con el territorio.',
  ],
  highlights: ['Selva misionera', 'Ríos y tierra colorada', 'Cultura y sabores regionales'],
  cta: {
    label: 'Conocé nuestras experiencias',
    href: '#experiencias',
  },
}
