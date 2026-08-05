import { useRef, useState } from 'react'
import { Info, Send } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Section } from '../layout/Section'
import { Container } from '../layout/Container'
import { buildWhatsAppLink } from '../../lib/whatsapp'
import {
  preReservaSection,
  interestOptions,
  destinationOptions,
} from '../../data/preReserva'

// ——— Estilos de campos ———
const field =
  'w-full rounded-card border border-warm-white/20 bg-warm-white/10 px-4 py-3.5 text-base text-warm-white placeholder:text-warm-white/40 transition-colors duration-200 focus:border-primary focus:outline-none'

const fieldError = 'border-red-400/70 focus:border-red-400'

const label = 'block text-sm font-medium text-warm-white/80'

const errorMsg = 'mt-1.5 text-xs text-red-400'

// Helper para errores con aria-describedby
function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className={errorMsg} role="alert">
      {message}
    </p>
  )
}

// ——— Estilos de chips ———
const chipBase =
  'cursor-pointer select-none rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

const chipOff =
  'border-warm-white/20 bg-transparent text-warm-white/60 hover:border-warm-white/40 hover:text-warm-white/80'

const chipOn = 'border-primary bg-primary text-deep-earth'

// ——— Opciones "no sé" para exclusión mutua ———
const NO_SE_ID = 'no-se'

export function PreReserva() {
  const formRef = useRef<HTMLFormElement>(null)

  const [name, setName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [people, setPeople] = useState('')
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([])
  const [comments, setComments] = useState('')
  const [sending, setSending] = useState(false)

  const [errors, setErrors] = useState<Record<string, string>>({})

  // ——— Toggle intereses ———
  const toggleInterest = (id: string) =>
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    )

  // ——— Toggle destinos con exclusión mutua para "Aún no sé" ———
  const toggleDestination = (id: string) =>
    setSelectedDestinations((prev) => {
      if (id === NO_SE_ID) {
        // Seleccionar "Aún no sé" → deseleccionar todo lo demás
        return prev.includes(NO_SE_ID) ? [] : [NO_SE_ID]
      }
      // Seleccionar otro destino → quitar "Aún no sé"
      const next = prev.filter((d) => d !== NO_SE_ID)
      return next.includes(id) ? next.filter((d) => d !== id) : [...next, id]
    })

  // ——— Validación ———
  const validate = (): boolean => {
    const next: Record<string, string> = {}

    if (!name.trim()) next.name = 'Contanos tu nombre.'
    if (!whatsapp.trim()) next.whatsapp = 'Necesitamos tu número de WhatsApp para contactarte.'
    if (!date.trim()) next.date = '¿Cuándo te gustaría viajar?'
    if (!people.trim()) next.people = '¿Cuántas personas van?'
    else if (Number.parseInt(people, 10) < 1)
      next.people = 'Ingresá al menos 1 persona.'
    if (!comments.trim()) next.comments = 'Contanos un poco qué tenés en mente.'

    setErrors(next)

    // Focus en el primer campo inválido
    if (Object.keys(next).length > 0) {
      const firstKey = Object.keys(next)[0]
      const el = formRef.current?.querySelector(
        `[data-field="${firstKey}"]`,
      ) as HTMLElement | null
      el?.focus()
    }

    return Object.keys(next).length === 0
  }

  // ——— Construcción del mensaje ———
  const buildMessage = (): string => {
    const lines: string[] = [
      'Hola Mandioca 👋',
      '',
      'Me gustaría hacer una experiencia en Misiones.',
      '',
      `Nombre: ${name.trim()}`,
      `WhatsApp: ${whatsapp.trim()}`,
    ]

    if (email.trim()) lines.push(`Email: ${email.trim()}`)
    lines.push(`Fecha: ${date.trim()}`)
    lines.push(`Personas: ${people.trim()}`)

    if (selectedInterests.length > 0) {
      const labels = selectedInterests
        .map((id) => interestOptions.find((o) => o.id === id)?.label ?? id)
        .join(', ')
      lines.push('', `Intereses: ${labels}`)
    }

    if (selectedDestinations.length > 0) {
      const labels = selectedDestinations
        .map((id) => destinationOptions.find((o) => o.id === id)?.label ?? id)
        .join(', ')
      lines.push(`Destino: ${labels}`)
    }

    lines.push('', `Comentarios: ${comments.trim()}`)

    return lines.join('\n')
  }

  // ——— Submit ———
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setSending(true)
    const message = buildMessage()
    const href = buildWhatsAppLink(message)

    if (href) {
      window.open(href, '_blank', 'noopener')
    }

    // Resetear estado de envío después de un breve momento
    setTimeout(() => setSending(false), 1500)
  }

  return (
    <Section id="pre-reserva" background="dark" size="lg">
      <Container>
        <div className="mx-auto max-w-[52rem]">
          {/* ——— Header ——— */}
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-warm-white/90">
            <span aria-hidden="true" className="h-px w-10 bg-primary" />
            {preReservaSection.eyebrow}
          </p>
          <h2 className="mt-4 text-h2 text-warm-white">
            {preReservaSection.title}
          </h2>
          <p className="mt-5 max-w-xl text-body-lg text-warm-white/80">
            {preReservaSection.intro}
          </p>

          {/* ——— Formulario ——— */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="mt-10 space-y-7 lg:mt-14"
          >
            {/* Nombre + WhatsApp */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="pre-nombre" className={label}>
                  {preReservaSection.nameLabel}
                </label>
                <input
                  id="pre-nombre"
                  data-field="name"
                  type="text"
                  required
                  placeholder="Ej: Juan Pérez"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'pre-nombre-error' : undefined}
                  className={cn(field, 'mt-2.5', errors.name && fieldError)}
                />
                <FieldError id="pre-nombre-error" message={errors.name} />
              </div>
              <div>
                <label htmlFor="pre-whatsapp" className={label}>
                  {preReservaSection.whatsappLabel}
                </label>
                <input
                  id="pre-whatsapp"
                  data-field="whatsapp"
                  type="tel"
                  required
                  placeholder="Ej: 3757 123456"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  aria-invalid={!!errors.whatsapp}
                  aria-describedby={errors.whatsapp ? 'pre-whatsapp-error' : undefined}
                  className={cn(field, 'mt-2.5', errors.whatsapp && fieldError)}
                />
                <FieldError id="pre-whatsapp-error" message={errors.whatsapp} />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="pre-email" className={label}>
                {preReservaSection.emailLabel}
              </label>
              <input
                id="pre-email"
                type="email"
                placeholder="Ej: juan@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(field, 'mt-2.5')}
              />
            </div>

            {/* Fecha + Personas */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="pre-fecha" className={label}>
                  {preReservaSection.dateLabel}
                </label>
                <input
                  id="pre-fecha"
                  data-field="date"
                  type="text"
                  required
                  placeholder="Ej: Marzo 2027"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  aria-invalid={!!errors.date}
                  aria-describedby={errors.date ? 'pre-fecha-error' : undefined}
                  className={cn(field, 'mt-2.5', errors.date && fieldError)}
                />
                <FieldError id="pre-fecha-error" message={errors.date} />
              </div>
              <div>
                <label htmlFor="pre-personas" className={label}>
                  {preReservaSection.peopleLabel}
                </label>
                <input
                  id="pre-personas"
                  data-field="people"
                  type="number"
                  min="1"
                  required
                  placeholder="Ej: 4"
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                  aria-invalid={!!errors.people}
                  aria-describedby={errors.people ? 'pre-personas-error' : undefined}
                  className={cn(field, 'mt-2.5', errors.people && fieldError)}
                />
                <FieldError id="pre-personas-error" message={errors.people} />
              </div>
            </div>

            {/* Intereses */}
            <fieldset>
              <legend className={label}>
                {preReservaSection.interestsLabel}
              </legend>
              <div className="mt-3 flex flex-wrap gap-2.5" role="group">
                {interestOptions.map((option) => {
                  const isSelected = selectedInterests.includes(option.id)
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="checkbox"
                      aria-checked={isSelected}
                      onClick={() => toggleInterest(option.id)}
                      className={cn(chipBase, isSelected ? chipOn : chipOff)}
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>
            </fieldset>

            {/* Destinos */}
            <fieldset>
              <legend className={label}>
                {preReservaSection.destinationLabel}
              </legend>
              <div className="mt-3 flex flex-wrap gap-2.5" role="group">
                {destinationOptions.map((option) => {
                  const isSelected = selectedDestinations.includes(option.id)
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="checkbox"
                      aria-checked={isSelected}
                      onClick={() => toggleDestination(option.id)}
                      className={cn(chipBase, isSelected ? chipOn : chipOff)}
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>
            </fieldset>

            {/* Comentarios */}
            <div>
              <label htmlFor="pre-comentarios" className={label}>
                {preReservaSection.commentsLabel}
              </label>
              <p className="mt-1 text-xs text-warm-white/40">
                {preReservaSection.commentsMicroHelp}
              </p>
              <textarea
                id="pre-comentarios"
                data-field="comments"
                required
                rows={5}
                placeholder="Ej: Somos 4 y nos gustaría combinar kayak y senderismo durante dos días."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                aria-invalid={!!errors.comments}
                aria-describedby={errors.comments ? 'pre-comentarios-error' : undefined}
                className={cn(
                  field,
                  'mt-2.5 min-h-[8rem] resize-y',
                  errors.comments && fieldError,
                )}
              />
              <FieldError id="pre-comentarios-error" message={errors.comments} />
            </div>

            {/* ——— Nota humana ——— */}
            <p className="text-center text-sm text-warm-white/40">
              {preReservaSection.humanNote}
            </p>

            {/* CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={sending}
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-primary px-8 py-4 text-base font-semibold text-deep-earth transition-colors duration-200 hover:bg-earth focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-70"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                {sending
                  ? preReservaSection.ctaLoading
                  : preReservaSection.ctaLabel}
              </button>
            </div>

            {/* Disclaimer */}
            <div className="flex items-start justify-center gap-2 text-center">
              <Info
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 text-warm-white/30"
              />
              <p className="text-sm text-warm-white/50">
                {preReservaSection.disclaimer}
              </p>
            </div>
          </form>
        </div>
      </Container>
    </Section>
  )
}
