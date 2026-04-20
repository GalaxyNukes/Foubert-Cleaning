import type {HeroBlock as HeroBlockType, AboutBlock as AboutBlockType, ForWhoBlock as ForWhoBlockType} from '@/sanity/types'
import {urlFor} from '@/sanity/client'
import {CtaLink} from '@/components/shared/Interactive'

export function HeroBlock(b: HeroBlockType) {
  const bgUrl = b.backgroundImage?.asset ? urlFor(b.backgroundImage).width(2000).url() : null
  return (
    <header className="hero">
      {bgUrl && (
        <div className="hero-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={bgUrl} alt="" />
        </div>
      )}
      <div className="hero-inner">
        {b.eyebrow && <div className="eyebrow hero-eyebrow reveal">{b.eyebrow}</div>}
        <h1 className="hero-title reveal delay-1">
          {b.titleLine1}
          {b.titleLine2 && (
            <span className="line2">
              {b.titleLine2.replace(/\.$/, '')}
              {b.titleLine2.endsWith('.') && <span className="dot">.</span>}
            </span>
          )}
        </h1>
        {b.subtitle && <p className="hero-sub reveal delay-2">{b.subtitle}</p>}
        {b.ctas && b.ctas.length > 0 && (
          <div className="hero-cta reveal delay-3">
            {b.ctas.map((cta) => <CtaLink key={cta._key} cta={cta} />)}
          </div>
        )}
      </div>
      {(b.footLeftValue || b.footRightValue) && (
        <div className="hero-foot">
          <div className="hero-foot-col">
            {b.footLeftLabel && <div className="hero-foot-label">{b.footLeftLabel}</div>}
            {b.footLeftValue && <div className="hero-foot-value">{b.footLeftValue}</div>}
          </div>
          <div className="scroll-hint">
            <span>Scroll</span>
            <span className="scroll-hint-bar" />
          </div>
          <div className="hero-foot-col" style={{textAlign: 'right'}}>
            {b.footRightLabel && <div className="hero-foot-label">{b.footRightLabel}</div>}
            {b.footRightValue && <div className="hero-foot-value">{b.footRightValue}</div>}
          </div>
        </div>
      )}
    </header>
  )
}

export function AboutBlock(b: AboutBlockType) {
  const portraitUrl = b.portrait?.asset ? urlFor(b.portrait).width(800).url() : null
  return (
    <section className="about section-pad" id="about">
      <div className="section-inner">
        <div className="about-grid">
          <div className="about-text">
            {b.eyebrow && <div className="eyebrow reveal" style={{marginBottom: '1.75rem'}}>{b.eyebrow}</div>}
            {b.statement && b.statement.length > 0 && (
              <h2 className="statement reveal delay-1">
                {b.statement.map((line, i) => (
                  <span key={line._key} className={line.accent ? 'accent' : undefined}>
                    {line.text}
                    {i < b.statement!.length - 1 && !line.accent && <br />}
                  </span>
                ))}
              </h2>
            )}
            {b.paragraphs?.map((p, i) => (
              <p key={i} className={`reveal delay-${Math.min(i + 2, 3)}`}>{p}</p>
            ))}
            {(b.signatureName || b.signatureRole) && (
              <div className="about-sign reveal delay-3">
                <div>
                  {b.signatureName && <div className="about-sign-name">{b.signatureName}</div>}
                  {b.signatureRole && <div className="about-sign-role">{b.signatureRole}</div>}
                </div>
              </div>
            )}
          </div>
          <div className="portrait reveal delay-2" aria-label={b.portraitLabel || 'Portret'}>
            {portraitUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={portraitUrl} alt={b.portrait?.alt || b.portraitLabel || 'Portret'} />
            ) : (
              <>
                <div className="portrait-crosshair" />
                <div className="portrait-crosshair br" />
                <div className="portrait-label">
                  <div className="portrait-label-title">{b.portraitLabel || 'Portret'}</div>
                  <div className="portrait-label-num">01</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export function ForWhoBlock(b: ForWhoBlockType) {
  return (
    <section className="forwho section-pad" id="forwho">
      <div className="section-inner">
        <div className="section-head">
          <div className="section-head-text">
            {b.eyebrow && <div className="eyebrow reveal">{b.eyebrow}</div>}
            {b.title && <h2 className="reveal delay-1">{b.title}</h2>}
          </div>
          {b.intro && <div className="section-head-aside reveal delay-2">{b.intro}</div>}
        </div>
        <div className="forwho-grid reveal">
          {b.cards?.map((card) => (
            <div key={card._key} className="forwho-card">
              {card.number && <div className="forwho-num">{card.number}</div>}
              {card.title && <h3 className="forwho-title">{card.title}</h3>}
              {card.description && <p className="forwho-desc">{card.description}</p>}
              {card.services && card.services.length > 0 && (
                <ul className="forwho-list">
                  {card.services.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              )}
              {card.cta && <CtaLink cta={card.cta} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
