import type {Metadata} from 'next'
import {client, HOMEPAGE_QUERY, SETTINGS_QUERY} from '@/sanity/client'
import type {Homepage, SiteSettings} from '@/sanity/types'
import {Nav, Footer} from '@/components/shared/Chrome'
import {SectionRenderer} from '@/components/SectionRenderer'

// ISR: revalidate every 60 seconds, so CMS edits show up fast
export const revalidate = 60

async function getData() {
  const [homepage, settings] = await Promise.all([
    client.fetch<Homepage>(HOMEPAGE_QUERY).catch(() => ({} as Homepage)),
    client.fetch<SiteSettings>(SETTINGS_QUERY).catch(() => ({} as SiteSettings)),
  ])
  return {homepage, settings}
}

export async function generateMetadata(): Promise<Metadata> {
  const {homepage, settings} = await getData()
  const seo = homepage.seo || settings.defaultSeo || {}
  return {
    title: seo.metaTitle || settings.siteName || 'Foubert Cleaning',
    description: seo.metaDescription,
    keywords: seo.keywords,
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      type: 'website',
    },
  }
}

function JsonLd({settings}: {settings: SiteSettings}) {
  const lb = settings.localBusiness
  if (!lb) return null
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: lb.businessName || settings.siteName,
    description: lb.description,
    telephone: settings.phoneInternational,
    email: settings.email,
    url: settings.siteUrl,
    priceRange: lb.priceRange,
    address: settings.address && {
      '@type': 'PostalAddress',
      streetAddress: settings.address.street,
      postalCode: settings.address.postalCode,
      addressLocality: settings.address.city,
      addressCountry: settings.address.country,
    },
    geo: lb.geo && {
      '@type': 'GeoCoordinates',
      latitude: lb.geo.lat,
      longitude: lb.geo.lng,
    },
    areaServed: lb.serviceArea?.map((a) => ({'@type': 'City', name: a})),
    openingHoursSpecification: lb.openingHours?.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: settings.socials?.map((s) => s.url),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(data)}}
    />
  )
}

export default async function HomePage() {
  const {homepage, settings} = await getData()
  const sections = homepage.sections || []

  return (
    <>
      <JsonLd settings={settings} />
      <Nav settings={settings} />
      <main>
        <SectionRenderer sections={sections} settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  )
}
