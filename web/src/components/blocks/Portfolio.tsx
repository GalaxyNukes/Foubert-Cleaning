'use client'
import {useRef, useState, useCallback} from 'react'
import type {PortfolioBlock as PortfolioBlockType, Project} from '@/sanity/types'
import {urlFor} from '@/sanity/client'

function BeforeAfterSlider({project}: {project: Project}) {
  const [pct, setPct] = useState(50)
  const active = useRef(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  const setFromX = useCallback((x: number) => {
    const rect = sliderRef.current?.getBoundingClientRect()
    if (!rect) return
    const p = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100))
    setPct(p)
  }, [])

  const beforeUrl = project.beforeImage?.asset ? urlFor(project.beforeImage).width(1600).url() : null
  const afterUrl = project.afterImage?.asset ? urlFor(project.afterImage).width(1600).url() : null

  return (
    <div
      ref={sliderRef}
      className="ba-slider"
      onMouseDown={() => { active.current = true }}
      onMouseMove={(e) => active.current && setFromX(e.clientX)}
      onMouseUp={() => { active.current = false }}
      onMouseLeave={() => { active.current = false }}
      onTouchStart={() => { active.current = true }}
      onTouchMove={(e) => setFromX(e.touches[0].clientX)}
      onTouchEnd={() => { active.current = false }}
      onClick={(e) => setFromX(e.clientX)}
    >
      <div className="ba-side ba-before">
        {beforeUrl && <img src={beforeUrl} alt={project.beforeImage?.alt || 'Voor'} />}
      </div>
      <div className="ba-side ba-after" style={{clipPath: `polygon(0 0, ${pct}% 0, ${pct}% 100%, 0 100%)`}}>
        {afterUrl && <img src={afterUrl} alt={project.afterImage?.alt || 'Na'} />}
      </div>
      <div className="ba-handle" style={{left: `${pct}%`}} />
      <div className="ba-label before">Voor</div>
      <div className="ba-label after">Na</div>
    </div>
  )
}

function ProjectCard({project, size, num}: {project: Project; size: 'lg' | 'md' | 'sm'; num?: string}) {
  const imgUrl = project.mainImage?.asset ? urlFor(project.mainImage).width(1200).url() : null
  return (
    <div className={`project project-${size} reveal`}>
      <div className="project-media">
        {imgUrl && <img src={imgUrl} alt={project.mainImage?.alt || project.title} />}
        {project.category && (
          <div className="project-badge">{project.category === 'zakelijk' ? 'Zakelijk' : 'Particulier'}</div>
        )}
        {num && <div className="project-num">{num}</div>}
      </div>
      <div className="project-meta">
        <div>
          <div className="project-title">{project.title}</div>
          {project.serviceType && <div className="project-type">{project.serviceType}</div>}
        </div>
      </div>
    </div>
  )
}

export function PortfolioBlock(b: PortfolioBlockType) {
  const featured = b.featuredProject
  const others = b.projects || []

  // Size pattern mimicking original: md, md, sm, sm, sm, sm
  const sizes: Array<'lg' | 'md' | 'sm'> = ['sm', 'sm', 'md', 'md', 'sm', 'sm', 'sm']

  return (
    <section className="portfolio section-pad" id="portfolio">
      <div className="section-inner">
        <div className="section-head">
          <div className="section-head-text">
            {b.eyebrow && <div className="eyebrow reveal">{b.eyebrow}</div>}
            {b.title && <h2 className="reveal delay-1">{b.title}</h2>}
          </div>
          {b.intro && <div className="section-head-aside reveal delay-2">{b.intro}</div>}
        </div>
        <div className="portfolio-grid">
          {featured && (
            <div className="project project-lg reveal">
              <div className="project-media">
                {featured.mediaType === 'beforeAfter' ? (
                  <BeforeAfterSlider project={featured} />
                ) : featured.mainImage?.asset ? (
                  <img src={urlFor(featured.mainImage).width(1600).url()} alt={featured.title} />
                ) : null}
                <div className="project-badge">Featured{featured.mediaType === 'beforeAfter' ? ' · Before / After' : ''}</div>
              </div>
              <div className="project-meta">
                <div>
                  <div className="project-title">{featured.title}</div>
                  {featured.serviceType && <div className="project-type">{featured.serviceType}</div>}
                </div>
                {featured.year && <div className="project-type" style={{textTransform: 'uppercase', letterSpacing: '0.14em'}}>{featured.year}</div>}
              </div>
            </div>
          )}
          {others.map((p, i) => (
            <ProjectCard
              key={p._id}
              project={p}
              size={sizes[i] || 'sm'}
              num={String(i + 2).padStart(2, '0')}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
