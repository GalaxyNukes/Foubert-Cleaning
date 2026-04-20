import {defineType, defineField} from 'sanity'
import {UserIcon} from '@sanity/icons'

export const aboutBlock = defineType({
  name: 'aboutBlock',
  title: 'Over-blok',
  type: 'object',
  icon: UserIcon,
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({
      name: 'statement',
      title: 'Grote statement',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'line',
          fields: [
            {name: 'text', title: 'Tekst', type: 'string'},
            {
              name: 'accent',
              title: 'Oranje/cursief accent',
              type: 'boolean',
              initialValue: false,
              description: 'Geef deze regel de oranje italic stijl.',
            },
          ],
          preview: {
            select: {text: 'text', accent: 'accent'},
            prepare: ({text, accent}) => ({
              title: text || '(lege regel)',
              subtitle: accent ? 'accent (oranje italic)' : 'normaal',
            }),
          },
        },
      ],
      description: 'Elke regel = één regel in het statement. Zet "accent" aan voor de oranje italic regel.',
    }),
    defineField({
      name: 'paragraphs',
      title: 'Paragrafen',
      type: 'array',
      of: [{type: 'text', rows: 3}],
    }),
    defineField({name: 'signatureName', title: 'Naam (handtekening)', type: 'string'}),
    defineField({name: 'signatureRole', title: 'Rol', type: 'string'}),
    defineField({
      name: 'portrait',
      title: 'Portretfoto',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alt-tekst'}],
    }),
    defineField({
      name: 'portraitLabel',
      title: 'Portret-label (indien geen foto)',
      type: 'string',
      description: 'Placeholder-tekst die in het kader staat tot een foto toegevoegd wordt.',
    }),
  ],
  preview: {
    select: {name: 'signatureName'},
    prepare: ({name}) => ({
      title: '👤 Over-blok',
      subtitle: name || 'Over ...',
    }),
  },
})
