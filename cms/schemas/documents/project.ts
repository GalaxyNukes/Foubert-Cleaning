import {defineType, defineField} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Projecttitel',
      type: 'string',
      description: 'Bv. "Herenwoning — Mechelen"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categorie',
      type: 'string',
      options: {
        list: [
          {title: 'Particulier', value: 'particulier'},
          {title: 'Zakelijk', value: 'zakelijk'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'particulier',
    }),
    defineField({
      name: 'serviceType',
      title: 'Type werk',
      type: 'string',
      description: 'Bv. "Gevelramen, kozijnen & rolluiken"',
    }),
    defineField({
      name: 'location',
      title: 'Locatie',
      type: 'string',
      description: 'Alleen de gemeente — bv. "Mechelen". Helpt bij lokale SEO.',
    }),
    defineField({
      name: 'year',
      title: 'Jaar',
      type: 'string',
      initialValue: String(new Date().getFullYear()),
    }),
    defineField({
      name: 'mediaType',
      title: 'Weergave',
      type: 'string',
      options: {
        list: [
          {title: 'Enkele foto', value: 'single'},
          {title: 'Voor / Na vergelijking', value: 'beforeAfter'},
        ],
        layout: 'radio',
      },
      initialValue: 'single',
    }),
    defineField({
      name: 'mainImage',
      title: 'Hoofdafbeelding',
      type: 'image',
      options: {hotspot: true},
      hidden: ({parent}) => parent?.mediaType !== 'single',
      fields: [
        {name: 'alt', type: 'string', title: 'Alt-tekst (SEO & toegankelijkheid)'},
      ],
    }),
    defineField({
      name: 'beforeImage',
      title: 'Foto — Voor',
      type: 'image',
      options: {hotspot: true},
      hidden: ({parent}) => parent?.mediaType !== 'beforeAfter',
      fields: [
        {name: 'alt', type: 'string', title: 'Alt-tekst'},
      ],
    }),
    defineField({
      name: 'afterImage',
      title: 'Foto — Na',
      type: 'image',
      options: {hotspot: true},
      hidden: ({parent}) => parent?.mediaType !== 'beforeAfter',
      fields: [
        {name: 'alt', type: 'string', title: 'Alt-tekst'},
      ],
    }),
    defineField({
      name: 'description',
      title: 'Beschrijving (optioneel)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'order',
      title: 'Volgorde',
      type: 'number',
      description: 'Lager nummer = hoger in de lijst. Laat leeg als niet relevant.',
      hidden: true,
    }),
  ],
  orderings: [
    {
      title: 'Volgorde (handmatig)',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Nieuwste eerst',
      name: 'yearDesc',
      by: [{field: 'year', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      location: 'location',
      media: 'mainImage',
      beforeMedia: 'beforeImage',
    },
    prepare: ({title, category, location, media, beforeMedia}) => ({
      title: title || '(zonder titel)',
      subtitle: [category, location].filter(Boolean).join(' · '),
      media: media || beforeMedia,
    }),
  },
})
