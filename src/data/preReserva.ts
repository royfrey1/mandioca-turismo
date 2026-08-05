export type PreReservaSectionContent = {
  eyebrow: string
  title: string
  intro: string
  humanNote: string
  nameLabel: string
  whatsappLabel: string
  emailLabel: string
  dateLabel: string
  peopleLabel: string
  interestsLabel: string
  destinationLabel: string
  commentsLabel: string
  commentsMicroHelp: string
  ctaLabel: string
  ctaLoading: string
  disclaimer: string
}

export const preReservaSection: PreReservaSectionContent = {
  eyebrow: 'Pre-reserva',
  title: 'Tu próxima experiencia en Misiones empieza acá.',
  intro:
    'Contanos qué tenés en mente y armamos una propuesta a medida. Sin compromiso, sin pago.',
  humanNote: 'Cada experiencia empieza con una conversación.',
  nameLabel: 'Nombre y apellido',
  whatsappLabel: 'WhatsApp',
  emailLabel: 'Email (opcional)',
  dateLabel: '¿Cuándo te gustaría viajar?',
  peopleLabel: '¿Cuántas personas van?',
  interestsLabel: '¿Qué te interesa?',
  destinationLabel: '¿A dónde te gustaría ir?',
  commentsLabel: 'Contanos qué tenés en mente',
  commentsMicroHelp:
    'No necesitás tener todo claro. Contanos tu idea, el tiempo que tenés o lo que te gustaría conocer y te ayudamos a armar la experiencia.',
  ctaLabel: 'Enviar consulta por WhatsApp',
  ctaLoading: 'Preparando tu consulta...',
  disclaimer:
    'No es una reserva automática. No se realiza ningún pago. Marcio se comunicará para conocer tus ideas y armar la experiencia juntos.',
}

export type InterestOption = {
  id: string
  label: string
}

export const interestOptions: InterestOption[] = [
  { id: 'kayak', label: 'Kayak' },
  { id: 'senderismo', label: 'Senderismo' },
  { id: 'ciclismo', label: 'Ciclismo' },
  { id: 'safari-off-road', label: 'Safari Off Road' },
  { id: 'flora-fauna', label: 'Flora y fauna' },
  { id: 'turismo-rural', label: 'Turismo rural' },
  { id: 'gastronomia', label: 'Gastronomía' },
]

export type DestinationOption = {
  id: string
  label: string
}

export const destinationOptions: DestinationOption[] = [
  { id: 'eldorado', label: 'Eldorado' },
  { id: 'andresito', label: 'Andresito' },
  { id: 'san-pedro', label: 'San Pedro' },
  { id: 'saltos-cascadas', label: 'Saltos y Cascadas' },
  { id: 'puerto-iguazu', label: 'Puerto Iguazú' },
  { id: 'el-soberbio', label: 'El Soberbio' },
  { id: 'no-se', label: 'Aún no sé' },
]
