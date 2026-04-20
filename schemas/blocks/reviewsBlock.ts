import {defineType, defineField} from 'sanity'
import {StarIcon} from '@sanity/icons'

export const reviewsBlock = defineType({
  name: 'reviewsBlock',
  title: 'Reviews-blok',
  type: 'object',
  icon: StarIcon,
  description: 'Voeg reviews toe wanneer ze binnenkomen.',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'title', title: 'Titel', type: 'string'}),
    defineField({name: 'intro', title: 'Intro', type: 'text', rows: 2}),
    defineField({
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'review',
          fields: [
            {name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: (R) => R.required()},
            {name: 'name', title: 'Naam', type: 'string', validation: (R) => R.required()},
            {name: 'role', title: 'Rol / locatie', type: 'string', description: 'Bv. "Particulier · Duffel"'},
            {
              name: 'rating',
              title: 'Score (1-5)',
              type: 'number',
              validation: (R) => R.min(1).max(5),
              initialValue: 5,
            },
            {
              name: 'source',
              title: 'Bron',
              type: 'string',
              options: {
                list: [
                  {title: 'Google', value: 'google'},
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'Direct verzameld', value: 'direct'},
                ],
              },
            },
          ],
          preview: {
            select: {quote: 'quote', name: 'name'},
            prepare: ({quote, name}) => ({
              title: name || '(anoniem)',
              subtitle: (quote || '').slice(0, 60),
            }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'title', reviews: 'reviews'},
    prepare: ({title, reviews}) => ({
      title: '⭐ Reviews-blok',
      subtitle: `${title || 'Reviews'} · ${Array.isArray(reviews) ? reviews.length : 0} items`,
    }),
  },
})
