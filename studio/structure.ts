import { CogIcon } from '@sanity/icons/Cog'
import type { StructureBuilder, StructureResolver } from 'sanity/structure'

import { FAQ_CATEGORIES } from './schemas/documents/faq'

export const SINGLETONS = [{ type: 'siteSettings', id: 'siteSettings', title: 'Site settings', icon: CogIcon }]

/** "Per edition" + "All" lists for a type that references an edition. New docs are pre-filled with the edition. */
function byEdition(S: StructureBuilder, type: string, title: string) {
  return S.listItem()
    .title(title)
    .schemaType(type)
    .child(
      S.list()
        .title(title)
        .items([
          S.listItem()
            .title('Per edition')
            .child(
              S.documentTypeList('edition')
                .title('Editions')
                .defaultOrdering([{ field: 'year', direction: 'desc' }])
                .child((editionId) =>
                  S.documentList()
                    .title(title)
                    .schemaType(type)
                    .filter('_type == $type && edition._ref == $editionId')
                    .params({ type, editionId })
                    .initialValueTemplates([S.initialValueTemplateItem(`${type}-by-edition`, { editionId })]),
                ),
            ),
          S.listItem()
            .title(`All`)
            .child(S.documentTypeList(type).title(`All – ${title}`)),
        ]),
    )
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      ...SINGLETONS.map((s) => S.listItem().title(s.title).icon(s.icon).id(s.id).child(S.document().schemaType(s.type).documentId(s.id))),
      S.documentTypeListItem('edition').title('Editions'),
      S.divider(),
      byEdition(S, 'update', 'Updates'),
      byEdition(S, 'gallery', 'Galleries'),
      S.divider(),
      S.documentTypeListItem('page').title('Pages'),
      S.listItem()
        .title('FAQ')
        .schemaType('faq')
        .child(
          S.list()
            .title('FAQ')
            .items([
              ...FAQ_CATEGORIES.map((c) =>
                S.listItem()
                  .title(c.title)
                  .child(
                    S.documentList()
                      .title(c.title)
                      .schemaType('faq')
                      .filter('_type == "faq" && category == $category')
                      .params({ category: c.value })
                      .defaultOrdering([{ field: 'order', direction: 'asc' }])
                      .initialValueTemplates([S.initialValueTemplateItem('faq-by-category', { category: c.value })]),
                  ),
              ),
              S.listItem().title('All').child(S.documentTypeList('faq').title('All FAQ')),
            ]),
        ),
      S.divider(),
      S.documentTypeListItem('partner').title('Partners'),
      byEdition(S, 'partnerPackage', 'Partner packages'),
      S.documentTypeListItem('venue').title('Venues'),
      byEdition(S, 'foodMenu', 'Food menus'),
    ])
