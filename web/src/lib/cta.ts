import type {CTA} from '@/sanity/types'

export function ctaHref(cta?: CTA): string {
  if (!cta) return '#'
  switch (cta.linkType) {
    case 'anchor': return `#${cta.anchor || ''}`
    case 'url': return cta.url || '#'
    case 'tel': return `tel:${(cta.phone || '').replace(/\s/g, '')}`
    case 'mail': return `mailto:${cta.email || ''}`
    case 'whatsapp': {
      const num = (cta.phone || '').replace(/[^\d]/g, '')
      return `https://wa.me/${num}`
    }
    default: return '#'
  }
}

export function ctaTarget(cta?: CTA): string | undefined {
  return cta?.linkType === 'url' || cta?.linkType === 'whatsapp' ? '_blank' : undefined
}
