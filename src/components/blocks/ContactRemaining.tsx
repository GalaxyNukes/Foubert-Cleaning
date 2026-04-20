'use client'
import {useState} from 'react'
import type {
  ContactBlock as ContactBlockType,
  TextBlock as TextBlockType,
  ImageBlock as ImageBlockType,
  CtaBandBlock as CtaBandBlockType,
  SiteSettings,
} from '@/sanity/types'
import {urlFor} from '@/sanity/client'
import {CtaLink} from '@/components/shared/Interactive'
import {PortableText} from 'next-sanity'

export function ContactBlock({block: b, settings}: {block: ContactBlockType; settings: SiteSettings}) {
  const [sent, setSent] = useState(false)
  const phone = settings.phoneInternational || '+32475223310'
  const phoneDisplay = settings.phone || '0475 22 33 10'
  const email = settings.email || 'info@foubertcleaning.be'
  const wa = settings.whatsappNumber || '32475223310'

  const title = b.title || ''
  const titleLines = title.split('\n')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: connect to backend (Resend, Formspree, or API route)
    // Voor nu: toon succes-bericht
    await new Promise((r) => setTimeout(r, 400))
    setSent(true)
  }

  return (
    <section className="contact section-pad" id="contact">
      <div className="section-inner">
        <div className="contact-grid">
          <div>
            {b.eyebrow && <div className="eyebrow reveal">{b.eyebrow}</div>}
            {title && (
              <h2
                className="reveal delay-1"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.25rem,5.5vw,4.25rem)',
                  fontWeight: 700,
                  lineHeight: 0.98,
                  letterSpacing: '-0.035em',
                  marginTop: '1rem',
                }}
              >
                {titleLines.map((line, i) => (
                  <span key={i}>{line}{i < titleLines.length - 1 && <br />}</span>
                ))}
              </h2>
            )}
            {b.intro && (
              <p
                className="reveal delay-2"
                style={{
                  marginTop: '1.5rem',
                  color: 'var(--muted-light)',
                  maxWidth: '40ch',
                  fontSize: '1.05rem',
                  lineHeight: 1.6,
                }}
              >
                {b.intro}
              </p>
            )}

            <div className="contact-methods">
              <a href={`https://wa.me/${wa}`} className="method reveal" target="_blank" rel="noopener">
                <div className="method-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.304-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <div className="method-body">
                  <div className="method-label">WhatsApp — snelste weg</div>
                  <div className="method-value">{phoneDisplay}</div>
                </div>
                <div className="method-arrow">→</div>
              </a>

              <a href={`tel:${phone}`} className="method reveal delay-1">
                <div className="method-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="method-body">
                  <div className="method-label">Bellen</div>
                  <div className="method-value">{phoneDisplay}</div>
                </div>
                <div className="method-arrow">→</div>
              </a>

              <a href={`mailto:${email}`} className="method reveal delay-2">
                <div className="method-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="method-body">
                  <div className="method-label">Mail</div>
                  <div className="method-value">{email}</div>
                </div>
                <div className="method-arrow">→</div>
              </a>
            </div>
          </div>

          {b.showForm !== false && (
            <form className="form reveal delay-1" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="name">Naam</label>
                  <input id="name" name="name" type="text" placeholder="Je naam" required />
                </div>
                <div className="field">
                  <label htmlFor="phone">Telefoon</label>
                  <input id="phone" name="phone" type="tel" placeholder="0475 ..." />
                </div>
              </div>
              <div className="field">
                <label htmlFor="email">E-mail</label>
                <input id="email" name="email" type="email" placeholder="je@email.be" required />
              </div>
              <div className="field">
                <label htmlFor="type">Type opdracht</label>
                <select id="type" name="type" required defaultValue="">
                  <option value="" disabled>Kies een optie...</option>
                  <option>Particulier — woning</option>
                  <option>Zakelijk — pand / kantoor</option>
                  <option>Eenmalig</option>
                  <option>Periodiek onderhoud</option>
                  <option>Andere</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="message">Jouw vraag</label>
                <textarea id="message" name="message" placeholder="Adres, oppervlakte, bijzonderheden..." />
              </div>
              <div className="field">
                <label>Foto's (optioneel — maakt de offerte veel sneller)</label>
                <label className="file-drop" htmlFor="file">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <div className="file-drop-title">Foto's toevoegen</div>
                  <div className="file-drop-sub">Sleep hier of klik om te selecteren · max 10MB per foto</div>
                  <input id="file" name="file" type="file" accept="image/*" multiple />
                </label>
              </div>
              <button type="submit" className="btn btn-primary form-submit" disabled={sent}>
                {sent ? 'Verzonden ✓' : (b.formSubmitLabel || 'Offerte aanvragen')}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              {sent && (
                <div className="form-success">
                  Bedankt — je bericht is verzonden. Ik antwoord binnen 24 uur.
                </div>
              )}
              <div className="form-fine">{b.formFinePrint || 'Gratis & vrijblijvend · antwoord binnen 24u'}</div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export function TextBlock(b: TextBlockType) {
  return (
    <section className={`textblock ${b.theme || 'light'}`}>
      <div className="textblock-inner">
        {b.eyebrow && <div className="eyebrow reveal">{b.eyebrow}</div>}
        {b.title && (
          <h2 className="reveal delay-1" style={{fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', marginBottom: '2rem', letterSpacing: '-0.03em'}}>
            {b.title}
          </h2>
        )}
        {b.body && <div className="reveal delay-2"><PortableText value={b.body} /></div>}
      </div>
    </section>
  )
}

export function ImageBlock(b: ImageBlockType) {
  const url = b.image?.asset ? urlFor(b.image).width(2000).url() : null
  if (!url) return null
  return (
    <section className={`imgblock ${b.width || 'contained'}`}>
      <div className="imgblock-inner reveal">
        <img src={url} alt={b.image?.alt || b.caption || ''} />
        {b.caption && <div className="imgblock-caption">{b.caption}</div>}
      </div>
    </section>
  )
}

export function CtaBandBlock(b: CtaBandBlockType) {
  return (
    <section className={`ctaband ${b.theme || 'orange'}`}>
      <div className="ctaband-inner">
        <div>
          <div className="ctaband-title">{b.title}</div>
          {b.subtitle && <div className="ctaband-subtitle">{b.subtitle}</div>}
        </div>
        {b.cta && <CtaLink cta={b.cta} />}
      </div>
    </section>
  )
}
