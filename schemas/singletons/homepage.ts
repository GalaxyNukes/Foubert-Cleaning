import {defineType, defineField} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'sections', title: 'Inhoudsblokken', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'sections',
      title: 'Blokken (sleep om volgorde aan te passen)',
      type: 'array',
      group: 'sections',
      description:
        'Voeg blokken toe, verschuif ze, of verwijder ze. Elk blok wordt in de opgegeven volgorde op de pagina getoond.',
      of: [
        {type: 'heroBlock'},
        {type: 'aboutBlock'},
        {type: 'forWhoBlock'},
        {type: 'portfolioBlock'},
        {type: 'processBlock'},
        {type: 'areaBlock'},
        {type: 'faqBlock'},
        {type: 'contactBlock'},
        {type: 'reviewsBlock'},
        {type: 'textBlock'},
        {type: 'imageBlock'},
        {type: 'ctaBandBlock'},
      ],
      options: {
        // insertMenu: tonen als grid met iconen ipv dropdown
        insertMenu: {
          views: [{name: 'grid'}, {name: 'list'}],
          showIcons: true,
        },
      } as any,
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO & Metadata',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Homepage'}),
  },
})
