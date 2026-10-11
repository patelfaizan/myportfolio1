import { useRef, useState } from 'react'
import { ArrowUpRight, Send } from 'lucide-react'
import { contactCopy, profile } from '../data/content'
import { SectionHeading } from './SectionHeading'
import './Contact.css'

const MESSAGE_MAX = 1500
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
const ENDPOINT = 'https://api.web3forms.com/submit'

const EMPTY = { name: '', email: '', message: '', botcheck: '' }

function validateField(field, value) {
  const trimmed = value.trim()

  if (field === 'name') {
    if (!trimmed) return 'Enter your name.'
    if (trimmed.length < 2) return 'Name must be at least 2 characters.'
    if (trimmed.length > 60) return 'Name must be under 60 characters.'
    return ''
  }

  if (field === 'email') {
    if (!trimmed) return 'Enter your email address.'
    if (!EMAIL_PATTERN.test(trimmed)) return 'Enter a valid email address, like name@example.com.'
    return ''
  }

  if (field === 'message') {
    if (!trimmed) return 'Enter a message.'
    if (trimmed.length < 10) return 'Message must be at least 10 characters.'
    if (trimmed.length > MESSAGE_MAX) return `Message must be under ${MESSAGE_MAX} characters.`
    return ''
  }

  return ''
}

export function Contact() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [submittedEmail, setSubmittedEmail] = useState('')
  const formRef = useRef(null)

  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))

    // Once a field has been touched, validate live so errors clear as they are fixed.
    if (touched[name]) {
      setErrors((current) => ({ ...current, [name]: validateField(name, value) }))
    }
  }

  const handleBlur = (event) => {
    const { name, value } = event.target
    setTouched((current) => ({ ...current, [name]: true }))
    setErrors((current) => ({ ...current, [name]: validateField(name, value) }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = {
      name: validateField('name', values.name),
      email: validateField('email', values.email),
      message: validateField('message', values.message),
    }

    setErrors(nextErrors)
    setTouched({ name: true, email: true, message: true })

    const firstInvalid = ['name', 'email', 'message'].find((field) => nextErrors[field])
    if (firstInvalid) {
      formRef.current?.elements[firstInvalid]?.focus()
      return
    }

    // Honeypot: a bot fills this, a person never sees it.
    if (values.botcheck) return

    setStatus('submitting')

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Portfolio enquiry from ${values.name.trim()}`,
          from_name: 'Portfolio — patelfaizan',
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          botcheck: '',
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmittedEmail(values.email.trim())
        setValues(EMPTY)
        setErrors({})
        setTouched({})
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const resetForm = () => {
    setStatus('idle')
    setSubmittedEmail('')
  }

  const describedBy = (field) => (errors[field] ? `${field}-error` : undefined)

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-heading">
      <div className="shell">
        <SectionHeading id="contact" eyebrow="Contact" title={contactCopy.heading} />

        <div className="contact__grid">
          <div className="contact__details">
            <p className="contact__intro">{contactCopy.intro}</p>

            <ul className="contact__list">
              <li>
                <span className="mono-label">Email</span>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
              <li>
                <span className="mono-label">Phone</span>
                <a href={`tel:${profile.phoneHref}`}>{profile.phone}</a>
              </li>
              <li>
                <span className="mono-label">Location</span>
                <span>{profile.location}</span>
              </li>
            </ul>

            <div className="contact__socials">
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <ArrowUpRight size={13} aria-hidden="true" />
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="contact__form-wrap">
            {status === 'success' ? (
              <div className="contact__panel" role="status">
                <h3 className="contact__panel-title">Message sent</h3>
                <p>I'll reply to {submittedEmail} shortly.</p>
                <button type="button" className="contact__reset" onClick={resetForm}>
                  Send another message
                </button>
              </div>
            ) : (
              <form ref={formRef} className="contact__form" onSubmit={handleSubmit} noValidate>
                <div className="field">
                  <label htmlFor="name">
                    Name <span aria-hidden="true" className="field__required">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={errors.name ? 'true' : undefined}
                    aria-describedby={describedBy('name')}
                    required
                  />
                  {errors.name && (
                    <p className="field__error" id="name-error">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="email">
                    Email <span aria-hidden="true" className="field__required">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={errors.email ? 'true' : undefined}
                    aria-describedby={describedBy('email')}
                    required
                  />
                  {errors.email && (
                    <p className="field__error" id="email-error">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="message">
                    Message <span aria-hidden="true" className="field__required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    maxLength={MESSAGE_MAX}
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={errors.message ? 'true' : undefined}
                    aria-describedby={describedBy('message')}
                    required
                  />
                  <div className="field__foot">
                    {errors.message ? (
                      <p className="field__error" id="message-error">
                        {errors.message}
                      </p>
                    ) : (
                      <span />
                    )}
                    <span className="field__count mono-label">
                      {values.message.length} / {MESSAGE_MAX}
                    </span>
                  </div>
                </div>

                {/* Honeypot — hidden from people, visible to bots. */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="visually-hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      botcheck: event.target.checked ? 'bot' : '',
                    }))
                  }
                />

                {status === 'error' && (
                  <p className="contact__form-error" role="alert">
                    The message didn't send. Email me directly at{' '}
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>.
                  </p>
                )}

                <button type="submit" className="contact__submit" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Sending…' : 'Send message'}
                  <Send size={14} strokeWidth={2} aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
