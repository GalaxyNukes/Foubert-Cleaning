import {defineType, defineField} from 'sanity'
import {TextIcon} from '@sanity/icons'

export const textBlock = defineType({
  name: 'textBlock',
  title: 'Tekst-blok (vrije tekst)',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'title', title: 'Titel', type: 'string'}),
    defineField({
      name: 'body',
      title: 'Tekst',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normaal', value: 'normal'},
            {title: 'Ondertitel', value: 'h3'},
          ],
          marks: {
            decorators: [
              {title: 'Vet', value: 'strong'},
              {title: 'Cursief', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{name: 'href', type: 'url', title: 'URL'}],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'theme',
      title: 'Thema',
      type: 'string',
      options: {
        list: [
          {title: 'Licht (cream achtergrond)', value: 'light'},
          {title: 'Donker', value: 'dark'},
        ],
        layout: 'radio',
      },
      initialValue: 'light',
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({
      title: '📝 Tekst-blok',
      subtitle: title || 'Vrije tekst',
    }),
  },
})
