import {defineType, defineField} from 'sanity'
import {OlistIcon} from '@sanity/icons'

export const processBlock = defineType({
  name: 'processBlock',
  title: 'Werkwijze-blok',
  type: 'object',
  icon: OlistIcon,
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'title', title: 'Titel', type: 'string'}),
    defineField({name: 'intro', title: 'Intro (aside-tekst)', type: 'text', rows: 3}),
    defineField({
      name: 'steps',
      title: 'Stappen',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'processStep',
          fields: [
            {name: 'number', title: 'Nummer', type: 'string', description: 'Bv. "01"'},
            {name: 'title', title: 'Titel', type: 'string'},
            {name: 'description', title: 'Beschrijving', type: 'text', rows: 2},
            {name: 'tag', title: 'Tag onderaan', type: 'string'},
          ],
          preview: {
            select: {number: 'number', title: 'title'},
            prepare: ({number, title}) => ({
              title: `${number || '?'} — ${title || '(zonder titel)'}`,
            }),
          },
        },
      ],
      validation: (Rule) => Rule.min(2).max(5).warning('Tussen 2 en 5 stappen werkt het best.'),
    }),
  ],
  preview: {
    select: {title: 'title', count: 'steps'},
    prepare: ({title, count}) => ({
      title: '📋 Werkwijze-blok',
      subtitle: `${title || 'Werkwijze'} · ${Array.isArray(count) ? count.length : 0} stappen`,
    }),
  },
})
