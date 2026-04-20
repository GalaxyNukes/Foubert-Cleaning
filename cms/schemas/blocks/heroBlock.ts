import {defineType, defineField} from 'sanity'
import {BlockContentIcon} from '@sanity/icons'

export const heroBlock = defineType({
  name: 'heroBlock',
  title: 'Hero',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow (kleine tekst boven titel)',
      type: 'string',
    }),
    defineField({
      name: 'titleLine1',
      title: 'Titel — regel 1',
      type: 'string',
      description: 'Het eerste, grote woord. Bv. "Glashelder".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleLine2',
      title: 'Titel — regel 2 (in italic)',
      type: 'string',
      description: 'Cursief onder regel 1. Bv. "vakmanschap."',
    }),
    defineField({
      name: 'subtitle',
      title: 'Onderschrift',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ctas',
      title: 'Knoppen',
      type: 'array',
      of: [{type: 'cta'}],
      validation: (Rule) => Rule.max(3).warning('Meer dan 3 knoppen is druk.'),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Achtergrondbeeld (optioneel)',
      type: 'image',
      description: 'Laat leeg voor gradient-achtergrond (huidig ontwerp).',
      options: {hotspot: true},
    }),
    defineField({
      name: 'footLeftLabel',
      title: 'Voettekst links — label',
      type: 'string',
    }),
    defineField({
      name: 'footLeftValue',
      title: 'Voettekst links — waarde',
      type: 'string',
    }),
    defineField({
      name: 'footRightLabel',
      title: 'Voettekst rechts — label',
      type: 'string',
    }),
    defineField({
      name: 'footRightValue',
      title: 'Voettekst rechts — waarde',
      type: 'string',
    }),
  ],
  preview: {
    select: {titleLine1: 'titleLine1', titleLine2: 'titleLine2'},
    prepare: ({titleLine1, titleLine2}) => ({
      title: '📣 Hero',
      subtitle: [titleLine1, titleLine2].filter(Boolean).join(' ') || '(nog geen titel)',
    }),
  },
})
