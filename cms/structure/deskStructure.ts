import type {StructureResolver} from 'sanity/structure'
import {HomeIcon, CogIcon, ImagesIcon, HelpCircleIcon} from '@sanity/icons'

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Inhoud')
    .items([
      // Homepage (singleton)
      S.listItem()
        .title('Homepage')
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
            .title('Homepage'),
        ),

      // Site-instellingen (singleton)
      S.listItem()
        .title('Site-instellingen')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site-instellingen'),
        ),

      S.divider(),

      // Projecten
      S.listItem()
        .title('Projecten')
        .icon(ImagesIcon)
        .schemaType('project')
        .child(S.documentTypeList('project').title('Projecten')),

      // FAQ
      S.listItem()
        .title('Veelgestelde vragen')
        .icon(HelpCircleIcon)
        .schemaType('faqItem')
        .child(S.documentTypeList('faqItem').title('Veelgestelde vragen')),
    ])
