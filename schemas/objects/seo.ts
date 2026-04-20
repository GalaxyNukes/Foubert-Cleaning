import {defineType, defineField} from 'sanity'
import {SearchIcon} from '@sanity/icons'

export const seo = defineType({
  name: 'seo',
  title: 'SEO & Metadata',
  type: 'object',
  icon: SearchIcon,
  options: {collapsible: true, collapsed: false},
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta titel',
      type: 'string',
      description: 'Titel die in Google-resultaten en in de browser-tab staat. Max 60 tekens voor beste weergave.',
      validation: (Rule) =>
        Rule.max(65).warning('Langer dan 65 tekens wordt afgekapt in Google.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta beschrijving',
      type: 'text',
      rows: 3,
      description: 'Korte beschrijving onder de titel in Google-resultaten. Ideaal 140-160 tekens.',
      validation: (Rule) =>
        Rule.max(170).warning('Langer dan 170 tekens wordt afgekapt in Google.'),
    }),
    defineField({
      name: 'keywords',
      title: 'Focus-zoekwoorden',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      description: 'Niet zichtbaar voor bezoekers — dient als referentie voor jezelf.',
    }),
    defineField({
      name: 'shareImage',
      title: 'Deel-afbeelding (Open Graph)',
      type: 'image',
      description: 'Afbeelding die verschijnt wanneer de site op Facebook, WhatsApp of LinkedIn wordt gedeeld. Best 1200x630 px.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'noIndex',
      title: 'Verberg voor zoekmachines',
      type: 'boolean',
      description: 'Aanzetten als je deze pagina tijdelijk uit Google wil houden.',
      initialValue: false,
    }),
  ],
})
