import { defineField } from 'sanity'

import { apiVersion } from '../../env'

type ImageFieldOptions = {
  name?: string
  title?: string
  description?: string
  required?: boolean
  group?: string
}

/** Image with hotspot, alt text and photo credit. Alt is a warning, not a blocker. */
export function imageField({ name = 'image', title = 'Image', description, required, group }: ImageFieldOptions = {}) {
  return defineField({
    name,
    title,
    description,
    group,
    type: 'image',
    options: { hotspot: true },
    fields: [
      defineField({
        name: 'alt',
        title: 'Alt text',
        type: 'string',
        description: 'Short description for screen readers, e.g. "Speaker on stage in room 1".',
        validation: (rule) => rule.warning().required(),
      }),
      defineField({
        name: 'credit',
        title: 'Photo credit',
        type: 'string',
        description: 'Photographer or source, e.g. "Photo: Ola Nordmann".',
      }),
    ],
    validation: required ? (rule) => rule.required() : undefined,
  })
}

export function slugField(source = 'title') {
  return defineField({
    name: 'slug',
    title: 'Slug',
    type: 'slug',
    description: 'The URL part for this item. Click "Generate" to create it from the title.',
    options: { source, maxLength: 96 },
    validation: (rule) => rule.required(),
  })
}

export function editionField({ required = true, description }: { required?: boolean; description?: string } = {}) {
  return defineField({
    name: 'edition',
    title: 'Edition',
    type: 'reference',
    to: [{ type: 'edition' }],
    description: description ?? 'Which JavaZone year this belongs to. Pre-filled with the current edition.',
    validation: required ? (rule) => rule.required() : undefined,
  })
}

/** Order field for manually sorted lists (lower comes first). */
export const orderField = defineField({
  name: 'order',
  title: 'Sort order',
  type: 'number',
  description: 'Lower numbers are shown first.',
})

type GetClient = (options: { apiVersion: string }) => { fetch: <T>(query: string) => Promise<T> }

/** Pre-fills `edition` on new documents with the edition selected in Site settings. */
export async function currentEditionInitialValue(_params: unknown, { getClient }: { getClient: GetClient }) {
  const ref = await getClient({ apiVersion }).fetch<string | null>(`*[_id == "siteSettings"][0].currentEdition._ref`)
  return ref ? { edition: { _type: 'reference', _ref: ref } } : {}
}

export const formatDate = (value?: string) =>
  value
    ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Europe/Oslo' }).format(new Date(value))
    : undefined
