import type {SiteSettings} from '@/sanity/types'
import {urlFor} from '@/sanity/client'
import Link from 'next/link'

export function Nav({settings}: {settings: SiteSettings}) {
  const logoUrl = settings.logoDark?.asset
    ? urlFor(settings.logoDark).height(80).url()
    : '/logo/foubert-reverse.png'
  const phone = settings.phoneInternational || '+32475223310'
  const phoneDisplay = settings.phone || '0475 22 33 10'

  return (
    <nav className="nav" id="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo" aria-label="Foubert Cleaning home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoUrl} alt={settings.siteName || 'Foubert Cleaning'} />
        </Link>
        <ul className="nav-links">
          <li><a href="#about">Over</a></li>
          <li><a href="#forwho">Diensten</a></li>
          <li><a href="#portfolio">Projecten</a></li>
          <li><a href="#process">Werkwijze</a></li>
          <li><a href="#faq">Vragen</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="nav-cta">
          <a href={`tel:${phone}`} className="nav-phone" aria-label="Bel Marlon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
            </svg>
            {phoneDisplay}
          </a>
          <a href="#contact" className="btn btn-primary">Offerte aanvragen</a>
        </div>
      </div>
    </nav>
  )
}

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  facebook: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  instagram: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
}

export function Footer({settings}: {settings: SiteSettings}) {
  const logoUrl = settings.logoDark?.asset
    ? urlFor(settings.logoDark).height(108).url()
    : '/logo/foubert-reverse.png'
  const phone = settings.phone || '0475 22 33 10'
  const phoneIntl = settings.phoneInternational || '+32475223310'
  const email = settings.email || 'info@foubertcleaning.be'
  const addr = settings.address || {}

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoUrl} alt={settings.siteName || 'Foubert Cleaning'} />
            <p>{settings.tagline || 'Professioneel reinigen van ramen, rolluiken, kozijnen en garagepoorten.'}</p>
          </div>
          <div className="footer-col">
            <h4>Navigatie</h4>
            <ul>
              <li><a href="#about">Over Marlon</a></li>
              <li><a href="#forwho">Diensten</a></li>
              <li><a href="#portfolio">Projecten</a></li>
              <li><a href="#process">Werkwijze</a></li>
              <li><a href="#faq">Vragen</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href={`tel:${phoneIntl}`}>{phone}</a></li>
              <li><a href={`mailto:${email}`}>{email}</a></li>
              {settings.whatsappNumber && (
                <li><a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noopener">WhatsApp</a></li>
              )}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Adres</h4>
            <ul>
              {addr.street && <li>{addr.street}</li>}
              {(addr.postalCode || addr.city) && <li>{[addr.postalCode, addr.city].filter(Boolean).join(' ')}</li>}
              {addr.country && <li>{addr.country}</li>}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} {settings.siteName || 'Foubert Cleaning'} · Alle rechten voorbehouden</div>
          <div className="footer-socials">
            {(settings.socials || []).map((s) => (
              <a key={s._key} href={s.url} aria-label={s.platform} target="_blank" rel="noopener">
                {SOCIAL_ICONS[s.platform] || <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
