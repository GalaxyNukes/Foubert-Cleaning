import {defineType, defineField} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'

export const contactBlock = defineType({
  name: 'contactBlock',
  title: 'Contact-blok',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({
      name: 'title',
      title: 'Titel (mag meerdere regels bevatten)',
      type: 'text',
      rows: 2,
    }),
    defineField({name: 'intro', title: 'Intro-tekst', type: 'text', rows: 3}),
    defineField({
      name: 'showForm',
      title: 'Toon contactformulier',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'formTitle',
      title: 'Formulier-label boven velden (optioneel)',
      type: 'string',
      hidden: ({parent}) => !parent?.showForm,
    }),
    defineField({
      name: 'formFinePrint',
      title: 'Kleine tekst onder formulier',
      type: 'string',
      initialValue: 'Gratis & vrijblijvend · antwoord binnen 24u',
      hidden: ({parent}) => !parent?.showForm,
    }),
    defineField({
      name: 'formSubmitLabel',
      title: 'Tekst op verzendknop',
      type: 'string',
      initialValue: 'Offerte aanvragen',
      hidden: ({parent}) => !parent?.showForm,
    }),
    defineField({
      name: 'useSiteSettingsMethods',
      title: 'Contactmethodes uit Site-instellingen gebruiken',
      type: 'boolean',
      initialValue: true,
      description: 'Aanbevolen — zo hoef je contactgegevens maar op één plek bij te houden.',
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({
      title: '✉️ Contact-blok',
      subtitle: (title || '').replace(/\n/g, ' ').slice(0, 60) || 'Contact',
    }),
  },
})
