import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'vervang-dit',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  studioHost: 'foubert-cleaning',
  autoUpdates: true,
})
