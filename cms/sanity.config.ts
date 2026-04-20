import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {deskStructure} from './structure/deskStructure'

export default defineConfig({
  name: 'foubert-cleaning',
  title: 'Foubert Cleaning — CMS',

  // TODO: vul je eigen projectId in na `npm create sanity@latest` of via sanity.io/manage
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'vervang-dit',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({structure: deskStructure}),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,

    // Singletons niet in "Create new" tonen
    templates: (templates) =>
      templates.filter(({schemaType}) => !['homepage', 'siteSettings'].includes(schemaType)),
  },

  document: {
    // Singletons: alleen wijzigen, niet dupliceren of verwijderen
    actions: (input, context) => {
      if (['homepage', 'siteSettings'].includes(context.schemaType)) {
        return input.filter(({action}) => action && !['duplicate', 'delete', 'unpublish'].includes(action))
      }
      return input
    },
  },
})
