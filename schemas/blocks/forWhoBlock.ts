import {defineType, defineField} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export const forWhoBlock = defineType({
  name: 'forWhoBlock',
  title: 'Voor-wie-blok (diensten-split)',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'title', title: 'Titel', type: 'string'}),
    defineField({name: 'intro', title: 'Intro (aside-tekst)', type: 'text', rows: 3}),
    defineField({
      name: 'cards',
      title: 'Kaarten',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'forWhoCard',
          fields: [
            {name: 'number', title: 'Nummer', type: 'string', description: 'Bv. "01 · Particulier"'},
            {name: 'title', title: 'Titel', type: 'string'},
            {name: 'description', title: 'Beschrijving', type: 'text', rows: 3},
            {
              name: 'services',
              title: 'Diensten',
              type: 'array',
              of: [{type: 'string'}],
              options: {layout: 'tags'},
            },
            {
              name: 'cta',
              title: 'Knop onderaan',
              type: 'cta',
            },
          ],
          preview: {
            select: {title: 'title', number: 'number'},
            prepare: ({title, number}) => ({
              title: title || 'Kaart',
              subtitle: number,
            }),
          },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({
      title: '👥 Voor-wie-blok',
      subtitle: title || 'Diensten-split',
    }),
  },
})
