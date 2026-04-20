import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)
export const urlFor = (source: SanityImageSource) => builder.image(source)

// ---- QUERIES ----
export const HOMEPAGE_QUERY = /* groq */ `*[_type == "homepage"][0]{
  seo,
  sections[]{
    ...,
    _type == "portfolioBlock" => {
      ...,
      featuredProject->{...},
      projects[]->{...}
    },
    _type == "faqBlock" => {
      ...,
      items[]->{...}
    }
  }
}`

export const SETTINGS_QUERY = /* groq */ `*[_type == "siteSettings"][0]`
