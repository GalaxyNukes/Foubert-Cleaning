import {defineType, defineField} from 'sanity'

export const localBusiness = defineType({
  name: 'localBusiness',
  title: 'Bedrijfsgegevens (Schema.org)',
  type: 'object',
  description:
    'Deze gegevens worden als gestructureerde data (JSON-LD) op je pagina gezet. Ze helpen Google je als lokaal bedrijf te tonen in Maps, Knowledge Panel en rich snippets.',
  options: {collapsible: true, collapsed: true},
  fields: [
    defineField({
      name: 'businessName',
      title: 'Bedrijfsnaam',
      type: 'string',
      initialValue: 'Foubert Cleaning',
    }),
    defineField({
      name: 'description',
      title: 'Korte beschrijving',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'priceRange',
      title: 'Prijsindicatie',
      type: 'string',
      description: 'Bv. "€€" — wordt soms door Google getoond.',
      initialValue: '€€',
    }),
    defineField({
      name: 'geo',
      title: 'Geografische coördinaten',
      type: 'object',
      fields: [
        {name: 'lat', title: 'Breedtegraad', type: 'number'},
        {name: 'lng', title: 'Lengtegraad', type: 'number'},
      ],
    }),
    defineField({
      name: 'serviceArea',
      title: 'Servicegebied',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      description: 'Gemeenten waar je werkt. Helpt bij lokale SEO.',
    }),
    defineField({
      name: 'openingHours',
      title: 'Openingsuren',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'days',
              title: 'Dagen',
              type: 'string',
              options: {
                list: [
                  {title: 'Ma–Vr', value: 'Mo-Fr'},
                  {title: 'Zaterdag', value: 'Sa'},
                  {title: 'Zondag', value: 'Su'},
                  {title: 'Ma–Za', value: 'Mo-Sa'},
                ],
              },
            },
            {name: 'opens', title: 'Open', type: 'string', description: 'bv. 08:00'},
            {name: 'closes', title: 'Sluit', type: 'string', description: 'bv. 17:30'},
          ],
          preview: {
            select: {days: 'days', opens: 'opens', closes: 'closes'},
            prepare: ({days, opens, closes}) => ({
              title: `${days || '?'} · ${opens || '?'} – ${closes || '?'}`,
            }),
          },
        },
      ],
    }),
  ],
})
