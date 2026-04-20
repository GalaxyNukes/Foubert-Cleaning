import type {Metadata} from 'next'
import {Bricolage_Grotesque, Geist} from 'next/font/google'
import './globals.css'
import {client, SETTINGS_QUERY} from '@/sanity/client'
import type {SiteSettings} from '@/sanity/types'
import {RevealInit, ScrollNav, SmoothScroll} from '@/components/shared/Interactive'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
})

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch<SiteSettings>(SETTINGS_QUERY).catch(() => ({} as SiteSettings))
  const seo = settings.defaultSeo || {}
  const siteUrl = settings.siteUrl || 'https://foubertcleaning.be'
  return {
    title: {
      default: seo.metaTitle || 'Foubert Cleaning',
      template: '%s · Foubert Cleaning',
    },
    description: seo.metaDescription || 'Glazenwasserij in Duffel en omstreken.',
    keywords: seo.keywords,
    metadataBase: new URL(siteUrl),
    alternates: {canonical: siteUrl},
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      url: siteUrl,
      siteName: settings.siteName || 'Foubert Cleaning',
      locale: 'nl_BE',
      type: 'website',
    },
    robots: seo.noIndex ? {index: false, follow: false} : undefined,
  }
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="nl" className={`${bricolage.variable} ${geist.variable}`}>
      <body>
        {children}
        <RevealInit />
        <ScrollNav />
        <SmoothScroll />
      </body>
    </html>
  )
}
