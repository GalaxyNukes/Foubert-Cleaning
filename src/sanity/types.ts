// Gedeelde types voor Sanity content
export interface SanityImage {
  _type: 'image'
  asset?: {_ref: string; _type: 'reference'}
  hotspot?: {x: number; y: number}
  alt?: string
}

export interface CTA {
  _key?: string
  label: string
  style?: 'primary' | 'outline' | 'link'
  linkType?: 'anchor' | 'url' | 'tel' | 'mail' | 'whatsapp'
  anchor?: string
  url?: string
  phone?: string
  email?: string
}

export interface SEO {
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
  shareImage?: SanityImage
  noIndex?: boolean
}

export interface Project {
  _id: string
  title: string
  category: 'particulier' | 'zakelijk'
  serviceType?: string
  location?: string
  year?: string
  mediaType?: 'single' | 'beforeAfter'
  mainImage?: SanityImage
  beforeImage?: SanityImage
  afterImage?: SanityImage
  description?: string
}

export interface FaqItem {
  _id: string
  question: string
  answer: any[]
}

export interface SiteSettings {
  siteName?: string
  tagline?: string
  logoDark?: SanityImage
  logoLight?: SanityImage
  favicon?: SanityImage
  phone?: string
  phoneInternational?: string
  whatsappNumber?: string
  email?: string
  address?: {street?: string; postalCode?: string; city?: string; country?: string}
  socials?: Array<{_key: string; platform: string; url: string}>
  siteUrl?: string
  defaultSeo?: SEO
  localBusiness?: {
    businessName?: string
    description?: string
    priceRange?: string
    geo?: {lat: number; lng: number}
    serviceArea?: string[]
    openingHours?: Array<{_key: string; days: string; opens: string; closes: string}>
  }
}

// Block types
export type Section =
  | HeroBlock | AboutBlock | ForWhoBlock | PortfolioBlock | ProcessBlock
  | AreaBlock | FaqBlock | ContactBlock | ReviewsBlock | TextBlock | ImageBlock | CtaBandBlock

interface BaseBlock {_key: string}

export interface HeroBlock extends BaseBlock {
  _type: 'heroBlock'
  eyebrow?: string; titleLine1?: string; titleLine2?: string; subtitle?: string
  ctas?: CTA[]
  backgroundImage?: SanityImage
  footLeftLabel?: string; footLeftValue?: string
  footRightLabel?: string; footRightValue?: string
}

export interface AboutBlock extends BaseBlock {
  _type: 'aboutBlock'
  eyebrow?: string
  statement?: Array<{_key: string; text: string; accent?: boolean}>
  paragraphs?: string[]
  signatureName?: string; signatureRole?: string
  portrait?: SanityImage; portraitLabel?: string
}

export interface ForWhoBlock extends BaseBlock {
  _type: 'forWhoBlock'
  eyebrow?: string; title?: string; intro?: string
  cards?: Array<{
    _key: string; number?: string; title?: string; description?: string
    services?: string[]; cta?: CTA
  }>
}

export interface PortfolioBlock extends BaseBlock {
  _type: 'portfolioBlock'
  eyebrow?: string; title?: string; intro?: string
  featuredProject?: Project
  projects?: Project[]
}

export interface ProcessBlock extends BaseBlock {
  _type: 'processBlock'
  eyebrow?: string; title?: string; intro?: string
  steps?: Array<{_key: string; number?: string; title?: string; description?: string; tag?: string}>
}

export interface AreaBlock extends BaseBlock {
  _type: 'areaBlock'
  eyebrow?: string; title?: string; intro?: string
  cities?: Array<{_key: string; name: string; emphasis?: 'primary' | 'strong' | 'normal'}>
  note?: string
}

export interface FaqBlock extends BaseBlock {
  _type: 'faqBlock'
  eyebrow?: string; title?: string; intro?: string
  items?: FaqItem[]
}

export interface ContactBlock extends BaseBlock {
  _type: 'contactBlock'
  eyebrow?: string; title?: string; intro?: string
  showForm?: boolean; formFinePrint?: string; formSubmitLabel?: string
  useSiteSettingsMethods?: boolean
}

export interface ReviewsBlock extends BaseBlock {
  _type: 'reviewsBlock'
  eyebrow?: string; title?: string; intro?: string
  reviews?: Array<{_key: string; quote: string; name: string; role?: string; rating?: number; source?: string}>
}

export interface TextBlock extends BaseBlock {
  _type: 'textBlock'
  eyebrow?: string; title?: string
  body?: any[]
  theme?: 'light' | 'dark'
}

export interface ImageBlock extends BaseBlock {
  _type: 'imageBlock'
  image: SanityImage; caption?: string; width?: 'contained' | 'full'
}

export interface CtaBandBlock extends BaseBlock {
  _type: 'ctaBandBlock'
  title: string; subtitle?: string; cta: CTA; theme?: 'orange' | 'dark' | 'light'
}

export interface Homepage {
  seo?: SEO
  sections?: Section[]
}
