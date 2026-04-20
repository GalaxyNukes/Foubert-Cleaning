'use client'
import {useState} from 'react'
import type {
  ProcessBlock as ProcessBlockType,
  AreaBlock as AreaBlockType,
  FaqBlock as FaqBlockType,
  ReviewsBlock as ReviewsBlockType,
} from '@/sanity/types'
import {PortableText} from 'next-sanity'

export function ProcessBlock(b: ProcessBlockType) {
  return (
    <section className="process section-pad" id="process">
      <div className="section-inner">
        <div className="section-head">
          <div className="section-head-text">
            {b.eyebrow && <div className="eyebrow reveal">{b.eyebrow}</div>}
            {b.title && <h2 className="reveal delay-1">{b.title}</h2>}
          </div>
          {b.intro && <div className="section-head-aside reveal delay-2">{b.intro}</div>}
        </div>
        <div className="process-grid">
          {b.steps?.map((step, i) => (
            <div key={step._key} className={`step reveal delay-${Math.min(i, 3)}`}>
              {step.number && <div className="step-num">{step.number}</div>}
              {step.title && <h3 className="step-title">{step.title}</h3>}
              {step.description && <p className="step-desc">{step.description}</p>}
              {step.tag && <div className="step-tag">{step.tag}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function AreaBlock(b: AreaBlockType) {
  const cities = b.cities || []
  return (
    <section className="area section-pad">
      <div className="section-inner">
        <div className="section-head">
          <div className="section-head-text">
            {b.eyebrow && <div className="eyebrow reveal">{b.eyebrow}</div>}
            {b.title && <h2 className="reveal delay-1">{b.title}</h2>}
          </div>
          {b.intro && <div className="section-head-aside reveal delay-2">{b.intro}</div>}
        </div>
        <div className="area-grid">
          <div />
          <div className="reveal">
            <div className="area-cities">
              {cities.map((c, i) => (
                <span key={c._key}>
                  <span className={`city ${c.emphasis || 'normal'}`}>{c.name}</span>
                  {i < cities.length - 1 && <span className="city separator">·</span>}
                </span>
              ))}
            </div>
            {b.note && (
              <div className="area-note">
                <span className="dot" />
                {b.note}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export function FaqBlock(b: FaqBlockType) {
  const [openId, setOpenId] = useState<string | null>(null)
  return (
    <section className="faq section-pad" id="faq">
      <div className="section-inner">
        <div className="faq-grid">
          <div>
            {b.eyebrow && <div className="eyebrow reveal">{b.eyebrow}</div>}
            {b.title && (
              <h2
                className="reveal delay-1"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.25rem,5vw,4rem)',
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: '-0.035em',
                  marginTop: '1rem',
                  maxWidth: '12ch',
                }}
              >
                {b.title}
              </h2>
            )}
            {b.intro && (
              <p className="reveal delay-2" style={{marginTop: '2rem', color: 'var(--muted-dark)', maxWidth: '36ch'}}>
                {b.intro}
              </p>
            )}
          </div>
          <div className="faq-list reveal">
            {b.items?.map((item) => (
              <div key={item._id} className="faq-item" data-open={openId === item._id}>
                <button className="faq-q" onClick={() => setOpenId(openId === item._id ? null : item._id)}>
                  {item.question}
                  <span className="plus" />
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    {item.answer && <PortableText value={item.answer} />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function ReviewsBlock(b: ReviewsBlockType) {
  if (!b.reviews || b.reviews.length === 0) return null
  return (
    <section className="reviews section-pad">
      <div className="section-inner">
        <div className="section-head">
          <div className="section-head-text">
            {b.eyebrow && <div className="eyebrow reveal">{b.eyebrow}</div>}
            {b.title && <h2 className="reveal delay-1">{b.title}</h2>}
          </div>
          {b.intro && <div className="section-head-aside reveal delay-2">{b.intro}</div>}
        </div>
        <div className="reviews-grid">
          {b.reviews.map((r) => (
            <div key={r._key} className="review reveal">
              {r.rating && <div className="review-stars">{'★'.repeat(r.rating)}</div>}
              <blockquote className="review-quote">"{r.quote}"</blockquote>
              <div className="review-author">
                <strong>{r.name}</strong>{r.role && ` · ${r.role}`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
