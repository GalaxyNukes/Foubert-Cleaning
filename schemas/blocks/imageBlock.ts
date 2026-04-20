import {defineType, defineField} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const imageBlock = defineType({
  name: 'imageBlock',
  title: 'Afbeelding-blok',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Afbeelding',
      type: 'image',
      options: {hotspot: true},
      validation: (R) => R.required(),
      fields: [{name: 'alt', type: 'string', title: 'Alt-tekst'}],
    }),
    defineField({name: 'caption', title: 'Bijschrift (optioneel)', type: 'string'}),
    defineField({
      name: 'width',
      title: 'Breedte',
      type: 'string',
      options: {
        list: [
          {title: 'Binnen kader', value: 'contained'},
          {title: 'Volledige breedte', value: 'full'},
        ],
        layout: 'radio',
      },
      initialValue: 'contained',
    }),
  ],
  preview: {
    select: {media: 'image', caption: 'caption'},
    prepare: ({media, caption}) => ({
      title: '🖼️ Afbeelding-blok',
      subtitle: caption || '',
      media,
    }),
  },
})
