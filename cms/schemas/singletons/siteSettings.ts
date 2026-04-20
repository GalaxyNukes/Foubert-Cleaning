import {defineType, defineField} from 'sanity'
import {CogIcon} from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site-instellingen',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'brand', title: 'Merk & identiteit'},
    {name: 'contact', title: 'Contact'},
    {name: 'social', title: 'Sociale media'},
    {name: 'seo', title: 'Standaard SEO'},
    {name: 'structured', title: 'Structured data'},
  ],
  fields: [
    // Merk
    defineField({
      name: 'siteName',
      title: 'Naam van de site',
      type: 'string',
      group: 'brand',
      initialValue: 'Foubert Cleaning',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'brand',
      initialValue: 'Glashelder vakmanschap in Duffel en omstreken',
    }),
    defineField({
      name: 'logoDark',
      title: 'Logo voor donkere achtergrond',
      type: 'image',
      group: 'brand',
      description: 'Gebruikt in de nav en footer (donker thema).',
    }),
    defineField({
      name: 'logoLight',
      title: 'Logo voor lichte achtergrond',
      type: 'image',
      group: 'brand',
      description: 'Optioneel — voor secties met lichte achtergrond.',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      group: 'brand',
      description: 'Klein icoon in browser-tab. Best 512x512 px PNG.',
    }),

    // Contact
    defineField({
      name: 'phone',
      title: 'Telefoonnummer (weergave)',
      type: 'string',
      group: 'contact',
      initialValue: '0475 22 33 10',
    }),
    defineField({
      name: 'phoneInternational',
      title: 'Telefoonnummer (internationaal)',
      type: 'string',
      group: 'contact',
      description: 'Voor tel:-links en WhatsApp. Bv. +32475223310',
      initialValue: '+32475223310',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp-nummer',
      type: 'string',
      group: 'contact',
      description: 'Zonder + of spaties. Bv. 32475223310',
      initialValue: '32475223310',
    }),
    defineField({
      name: 'email',
      title: 'E-mailadres',
      type: 'string',
      group: 'contact',
      initialValue: 'info@foubertcleaning.be',
    }),
    defineField({
      name: 'address',
      title: 'Adres',
      type: 'object',
      group: 'contact',
      fields: [
        {name: 'street', title: 'Straat + nummer', type: 'string'},
        {name: 'postalCode', title: 'Postcode', type: 'string'},
        {name: 'city', title: 'Gemeente', type: 'string'},
        {name: 'country', title: 'Land', type: 'string', initialValue: 'België'},
      ],
    }),

    // Socials
    defineField({
      name: 'socials',
      title: 'Sociale media',
      type: 'array',
      group: 'social',
      of: [
        {
          type: 'object',
          name: 'social',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'Google', value: 'google'},
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'TikTok', value: 'tiktok'},
                ],
              },
            },
            {name: 'url', title: 'URL', type: 'url'},
          ],
          preview: {
            select: {platform: 'platform', url: 'url'},
            prepare: ({platform, url}) => ({title: platform || '(geen)', subtitle: url}),
          },
        },
      ],
    }),

    // SEO defaults
    defineField({
      name: 'defaultSeo',
      title: 'Standaard SEO',
      type: 'seo',
      group: 'seo',
      description:
        'Wordt gebruikt als fallback wanneer een pagina geen eigen SEO-velden heeft.',
    }),
    defineField({
      name: 'siteUrl',
      title: 'Volledige URL van de site',
      type: 'url',
      group: 'seo',
      initialValue: 'https://foubertcleaning.be',
      description: 'Voor canonical tags en sitemap.',
    }),

    // Structured data
    defineField({
      name: 'localBusiness',
      title: 'Lokaal bedrijf (Schema.org)',
      type: 'localBusiness',
      group: 'structured',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Site-instellingen'}),
  },
})
