// TESTIMONIOS — RESEÑAS REALES DE GOOGLE
// Reseñas provistas por el propietario de Mandioca. Se conservan completas en
// los datos; en la UI pueden recortarse visualmente (line-clamp) sin perder
// contenido y el texto completo queda intacto aquí. No se inventan nombres ni frases.
export type TestimonialSource = 'google'

export type Testimonial = {
  id: string
  name: string
  quote: string
  rating: number
  source: TestimonialSource
}

export type TestimonialsSectionContent = {
  eyebrow: string
  titleLine1: string
  titleLine2: string
  description: string
  ratingValue: string
  ratingStars: number
  ratingLabel: string
  cta: string
  reviewsUrl: string
}

export const testimonialsSection: TestimonialsSectionContent = {
  eyebrow: 'Testimonios',
  titleLine1: 'Historias reales',
  titleLine2: 'de quienes nos eligen',
  description:
    'Cada salida es única. Estas son algunas opiniones de personas que ya vivieron la experiencia con Mandioca.',
  ratingValue: '5,0',
  ratingStars: 5,
  ratingLabel: 'Reseñas reales de Google',
  cta: 'Ver todas las reseñas en Google Maps →',
  // Enlace real que el propietario entregó para el perfil de Google Maps.
  reviewsUrl:
    'https://www.google.com/maps/place/Mandioca+Turismo+Aventura/@-26.4075544,-54.6692938,17z/data=!4m17!1m8!3m7!1s0x94f773b925553845:0x90c0916a09850007!2sAv.+San+Mart%C3%ADn+Oeste+2613,+N3380+Eldorado,+Misiones!3b1!8m2!3d-26.4076561!4d-54.6691211!16s%2Fg%2F11xz0_94zj!3m7!1s0x94f1330007c82c1b:0xa898e3054048570e!8m2!3d-26.4076679!4d-54.6692555!9m1!1b1!16s%2Fg%2F11vxtchwv7!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDgwMy4wIKXMDSoASAFQAw%3D%3D',
}

export const testimonials: Testimonial[] = [
  {
    id: 't-jaqueline',
    name: 'Jaqueline Monteiro',
    rating: 5,
    source: 'google',
    quote:
      'Pasear en kayak al atardecer fue espectacular, y el guía Marcio fue un anfitrión excelente. Preparó platos típicos de la región; su M\'beju es delicioso, ¡no dejen de probarlo! 🤗 Un lugar de naturaleza exuberante y gran conexión con la naturaleza. Recomiendo ampliamente este tranquilo refugio.',
  },
  {
    id: 't-fabiana',
    name: 'Fabiana Lorena Dominguez',
    rating: 5,
    source: 'google',
    quote:
      'Increíble la experiencia 🤩 mucha paz y hermosos paisajes. La atención un 10, sin dudas volveremos 💪🏻',
  },
  {
    id: 't-gus',
    name: 'Gus Gauto',
    rating: 5,
    source: 'google',
    quote:
      'La mandioca es un tubérculo que contiene muchos beneficios para la salud, al igual que hacer deportes al aire libre. Por eso recomiendo MANDIOCA TURISMO: Kayak, río, selva; dejá que la naturaleza te sorprenda. Marcio es el mejor anfitrión',
  },
  {
    id: 't-s3rgi0',
    name: 'S3rgi0',
    rating: 5,
    source: 'google',
    quote:
      'Servicio impecable y atención excepcional. Marcio está siempre atento a cada detalle para satisfacer tus necesidades. ¡Altamente recomendado!',
  },
  {
    id: 't-anneli',
    name: 'Anneli Nel',
    rating: 5,
    source: 'google',
    quote:
      'Tuvimos un gran día de aventura con Mandioca. La experiencia es totalmente única y disfrutamos cada segundo. Visitamos a una familia local, disfrutamos de una comida local increíble y terminamos el día haciendo kayak en el río. Se lo recomiendo a todos.',
  },
  {
    id: 't-luciana',
    name: 'Luciana Fleita',
    rating: 5,
    source: 'google',
    quote:
      'Excelente experiencia, hermoso el lugar y hermoso el servicio. El paseo en Kayak es increíble',
  },
]