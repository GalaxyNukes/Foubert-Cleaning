import {defineType, defineField} from 'sanity'
import {HelpCircleIcon} from '@sanity/icons'

export const faqItem = defineType({
  name: 'faqItem',
  title: 'Veelgestelde vraag',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'question',
      title: 'Vraag',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Antwoord',
      type: 'array',
      of: [{type: 'block', styles: [{title: 'Normaal', value: 'normal'}]}],
      description: 'Rich tekst — ondersteunt vetgedrukt, links, lijsten.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Volgorde',
      type: 'number',
      hidden: true,
    }),
  ],
  orderings: [
    {
      title: 'Volgorde (handmatig)',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'question'},
    prepare: ({title}) => ({
      title: title || '(nog geen vraag)',
    }),
  },
})
