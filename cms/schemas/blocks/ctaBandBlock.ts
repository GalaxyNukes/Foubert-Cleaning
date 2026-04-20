import {defineType, defineField} from 'sanity'
import {ArrowRightIcon} from '@sanity/icons'

export const ctaBandBlock = defineType({
  name: 'ctaBandBlock',
  title: 'CTA-band',
  type: 'object',
  icon: ArrowRightIcon,
  description: 'Smalle, opvallende band met één duidelijke actie-oproep.',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({name: 'subtitle', title: 'Onderschrift', type: 'string'}),
    defineField({
      name: 'cta',
      title: 'Knop',
      type: 'cta',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'theme',
      title: 'Thema',
      type: 'string',
      options: {
        list: [
          {title: 'Oranje (opvallend)', value: 'orange'},
          {title: 'Donker', value: 'dark'},
          {title: 'Licht', value: 'light'},
        ],
        layout: 'radio',
      },
      initialValue: 'orange',
    }),
  ],
  preview: {
    select: {title: 'title', cta: 'cta.label'},
    prepare: ({title, cta}) => ({
      title: '➡️ CTA-band',
      subtitle: [title, cta].filter(Boolean).join(' → '),
    }),
  },
})
