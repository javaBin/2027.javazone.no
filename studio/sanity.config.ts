import { visionTool } from '@sanity/vision'
import { defineConfig, type Template } from 'sanity'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId } from './env'
import { schemaTypes } from './schemas'
import { SINGLETONS, structure } from './structure'

const singletonTypes = new Set(SINGLETONS.map((s) => s.type))
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

/** Types listed "per edition" in the structure – new docs created there get that edition pre-filled. */
const EDITION_TYPES = ['update', 'gallery', 'partnerPackage', 'foodMenu']

const editionTemplates: Template[] = EDITION_TYPES.map((type) => ({
  id: `${type}-by-edition`,
  title: `${type} for edition`,
  schemaType: type,
  parameters: [{ name: 'editionId', type: 'string' }],
  value: ({ editionId }: { editionId: string }) => ({ edition: { _type: 'reference', _ref: editionId } }),
}))

const faqTemplate: Template = {
  id: 'faq-by-category',
  title: 'FAQ in category',
  schemaType: 'faq',
  parameters: [{ name: 'category', type: 'string' }],
  value: ({ category }: { category: string }) => ({ category }),
}

export default defineConfig({
  name: 'default',
  title: 'JavaZone',
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  schema: {
    types: schemaTypes,
    // Singletons can't be created from the "new document" menu.
    templates: (templates) => [...templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)), ...editionTemplates, faqTemplate],
  },
  document: {
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType) ? actions.filter(({ action }) => action && singletonActions.has(action)) : actions,
  },
})
