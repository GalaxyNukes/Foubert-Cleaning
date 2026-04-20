// Objecten
import {seo} from './objects/seo'
import {cta} from './objects/cta'
import {localBusiness} from './objects/localBusiness'

// Documenten
import {project} from './documents/project'
import {faqItem} from './documents/faqItem'

// Singletons
import {siteSettings} from './singletons/siteSettings'
import {homepage} from './singletons/homepage'

// Blokken
import {heroBlock} from './blocks/heroBlock'
import {aboutBlock} from './blocks/aboutBlock'
import {forWhoBlock} from './blocks/forWhoBlock'
import {portfolioBlock} from './blocks/portfolioBlock'
import {processBlock} from './blocks/processBlock'
import {areaBlock} from './blocks/areaBlock'
import {faqBlock} from './blocks/faqBlock'
import {contactBlock} from './blocks/contactBlock'
import {reviewsBlock} from './blocks/reviewsBlock'
import {textBlock} from './blocks/textBlock'
import {imageBlock} from './blocks/imageBlock'
import {ctaBandBlock} from './blocks/ctaBandBlock'

export const schemaTypes = [
  // Objects (shared)
  seo,
  cta,
  localBusiness,

  // Singletons
  siteSettings,
  homepage,

  // Documents
  project,
  faqItem,

  // Blocks
  heroBlock,
  aboutBlock,
  forWhoBlock,
  portfolioBlock,
  processBlock,
  areaBlock,
  faqBlock,
  contactBlock,
  reviewsBlock,
  textBlock,
  imageBlock,
  ctaBandBlock,
]
