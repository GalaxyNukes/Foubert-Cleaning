import {defineType, defineField} from 'sanity'
import {HelpCircleIcon} from '@sanity/icons'

export const faqBlock = defineType({
  name: 'faqBlock',
  title: 'FAQ-blok',
  type: 'object',
  icon: HelpCircleIcon,
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'title', title: 'Titel', type: 'string'}),
    defineField({name: 'intro', title: 'Intro', type: 'text', rows: 3}),
    defineField({
      name: 'items',
      title: 'Vragen',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'faqItem'}]}],
      description: 'Sleep om volgorde aan te passen. Beheer de vragen zelf onder "Veelgestelde vragen".',
    }),
  ],
  preview: {
    select: {title: 'title', items: 'items'},
    prepare: ({title, items}) => ({
      title: '❓ FAQ-blok',
      subtitle: `${title || 'Vragen'} · ${Array.isArray(items) ? items.length : 0} items`,
    }),
  },
})
