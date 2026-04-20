import type {Section, SiteSettings} from '@/sanity/types'
import {HeroBlock, AboutBlock, ForWhoBlock} from './blocks/HeroAboutForWho'
import {PortfolioBlock} from './blocks/Portfolio'
import {ProcessBlock, AreaBlock, FaqBlock, ReviewsBlock} from './blocks/ProcessAreaFaqReviews'
import {ContactBlock, TextBlock, ImageBlock, CtaBandBlock} from './blocks/ContactRemaining'

export function SectionRenderer({sections, settings}: {sections: Section[]; settings: SiteSettings}) {
  return (
    <>
      {sections.map((s) => {
        switch (s._type) {
          case 'heroBlock': return <HeroBlock key={s._key} {...s} />
          case 'aboutBlock': return <AboutBlock key={s._key} {...s} />
          case 'forWhoBlock': return <ForWhoBlock key={s._key} {...s} />
          case 'portfolioBlock': return <PortfolioBlock key={s._key} {...s} />
          case 'processBlock': return <ProcessBlock key={s._key} {...s} />
          case 'areaBlock': return <AreaBlock key={s._key} {...s} />
          case 'faqBlock': return <FaqBlock key={s._key} {...s} />
          case 'contactBlock': return <ContactBlock key={s._key} block={s} settings={settings} />
          case 'reviewsBlock': return <ReviewsBlock key={s._key} {...s} />
          case 'textBlock': return <TextBlock key={s._key} {...s} />
          case 'imageBlock': return <ImageBlock key={s._key} {...s} />
          case 'ctaBandBlock': return <CtaBandBlock key={s._key} {...s} />
          default: return null
        }
      })}
    </>
  )
}
