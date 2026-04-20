import {defineType, defineField} from 'sanity'

export const cta = defineType({
  name: 'cta',
  title: 'Call-to-Action',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Knoptekst',
      type: 'string',
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: 'style',
      title: 'Stijl',
      type: 'string',
      options: {
        list: [
          {title: 'Primair (oranje)', value: 'primary'},
          {title: 'Secundair (outline)', value: 'outline'},
          {title: 'Tekst-link', value: 'link'},
        ],
        layout: 'radio',
      },
      initialValue: 'primary',
    }),
    defineField({
      name: 'linkType',
      title: 'Type link',
      type: 'string',
      options: {
        list: [
          {title: 'Sectie op deze pagina (anker)', value: 'anchor'},
          {title: 'Externe URL', value: 'url'},
          {title: 'Telefoon', value: 'tel'},
          {title: 'E-mail', value: 'mail'},
          {title: 'WhatsApp', value: 'whatsapp'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'anchor',
    }),
    defineField({
      name: 'anchor',
      title: 'Sectie (anchor)',
      type: 'string',
      description: 'Bijvoorbeeld "contact", "portfolio", "process"',
      hidden: ({parent}) => parent?.linkType !== 'anchor',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({allowRelative: false, scheme: ['http', 'https']}),
      hidden: ({parent}) => parent?.linkType !== 'url',
    }),
    defineField({
      name: 'phone',
      title: 'Telefoonnummer',
      type: 'string',
      description: 'Internationaal formaat, bv. +32475223310',
      hidden: ({parent}) => !['tel', 'whatsapp'].includes(parent?.linkType),
    }),
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'string',
      hidden: ({parent}) => parent?.linkType !== 'mail',
    }),
  ],
  preview: {
    select: {label: 'label', style: 'style', linkType: 'linkType'},
    prepare: ({label, style, linkType}) => ({
      title: label || '(geen tekst)',
      subtitle: `${style || 'primary'} · ${linkType || 'anchor'}`,
    }),
  },
})
