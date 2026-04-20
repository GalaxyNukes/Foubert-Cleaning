import {defineType, defineField} from 'sanity'
import {PinIcon} from '@sanity/icons'

export const areaBlock = defineType({
  name: 'areaBlock',
  title: 'Servicegebied-blok',
  type: 'object',
  icon: PinIcon,
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'title', title: 'Titel', type: 'string'}),
    defineField({name: 'intro', title: 'Intro', type: 'text', rows: 3}),
    defineField({
      name: 'cities',
      title: 'Gemeenten',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'city',
          fields: [
            {name: 'name', title: 'Naam', type: 'string', validation: (R) => R.required()},
            {
              name: 'emphasis',
              title: 'Prominentie',
              type: 'string',
              options: {
                list: [
                  {title: 'Primair (oranje, groot)', value: 'primary'},
                  {title: 'Sterk', value: 'strong'},
                  {title: 'Normaal', value: 'normal'},
                ],
                layout: 'dropdown',
              },
              initialValue: 'normal',
            },
          ],
          preview: {
            select: {name: 'name', emphasis: 'emphasis'},
            prepare: ({name, emphasis}) => ({
              title: name || '(zonder naam)',
              subtitle: emphasis,
            }),
          },
        },
      ],
      options: {sortable: true},
    }),
    defineField({
      name: 'note',
      title: 'Voetnoot',
      type: 'string',
      description: 'Klein zinnetje onder de lijst.',
    }),
  ],
  preview: {
    select: {title: 'title', cities: 'cities'},
    prepare: ({title, cities}) => ({
      title: '📍 Servicegebied',
      subtitle: `${title || 'Waar ik werk'} · ${Array.isArray(cities) ? cities.length : 0} gemeenten`,
    }),
  },
})
