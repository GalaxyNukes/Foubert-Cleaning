import {defineType, defineField} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export const portfolioBlock = defineType({
  name: 'portfolioBlock',
  title: 'Portfolio-blok',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'title', title: 'Titel', type: 'string'}),
    defineField({name: 'intro', title: 'Intro (aside-tekst)', type: 'text', rows: 3}),
    defineField({
      name: 'featuredProject',
      title: 'Uitgelicht project (groot met Voor/Na-slider)',
      type: 'reference',
      to: [{type: 'project'}],
      description: 'Kies een project dat groot als featured getoond wordt. Liefst een met Voor/Na beelden.',
    }),
    defineField({
      name: 'projects',
      title: 'Andere projecten (grid)',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'project'}]}],
      description: 'Sleep om volgorde aan te passen.',
    }),
  ],
  preview: {
    select: {title: 'title', count: 'projects'},
    prepare: ({title, count}) => ({
      title: '🖼️ Portfolio-blok',
      subtitle: `${title || 'Projecten'} · ${Array.isArray(count) ? count.length : 0} projecten`,
    }),
  },
})
