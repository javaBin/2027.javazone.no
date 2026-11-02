import { BellIcon } from '@sanity/icons/Bell'
import { defineField, defineType } from 'sanity'

import { currentEditionInitialValue, editionField, formatDate, imageField, slugField } from '../objects/helpers'

export const UPDATE_CATEGORIES = [
  { title: 'General', value: 'general' },
  { title: 'Call for papers', value: 'cfp' },
  { title: 'Tickets', value: 'tickets' },
  { title: 'Program', value: 'program' },
  { title: 'Partners', value: 'partners' },
  { title: 'Volunteers', value: 'volunteers' },
  { title: 'Venue & practical', value: 'practical' },
]

/** Short news posts. The three newest are shown on the home page. */
export default defineType({
  name: 'update',
  title: 'Update',
  type: 'document',
  icon: BellIcon,
  initialValue: currentEditionInitialValue,
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required().max(100) }),
    slugField(),
    defineField({
      name: 'publishedAt',
      title: 'Published',
      type: 'datetime',
      description: 'Updates are sorted by this date. Set a future date to schedule.',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    editionField(),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      initialValue: 'general',
      options: { list: UPDATE_CATEGORIES },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'One or two sentences shown on the home page and in lists.',
      validation: (rule) => rule.required().max(240).warning('Keep it short – max 240 characters'),
    }),
    imageField({ name: 'mainImage', title: 'Main image' }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      description: 'Optional. Leave empty for short updates that only need the summary.',
    }),
    defineField({ name: 'cta', title: 'Call to action', type: 'link', description: 'Optional button, e.g. "Submit your talk".' }),
    defineField({
      name: 'pinned',
      title: 'Pin to top',
      type: 'boolean',
      initialValue: false,
      description: 'Keep this update first on the home page regardless of date.',
    }),
  ],
  orderings: [{ title: 'Newest first', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', date: 'publishedAt', category: 'category', pinned: 'pinned', media: 'mainImage' },
    prepare: ({ title, date, category, pinned, media }) => ({
      title: pinned ? `📌 ${title}` : title,
      subtitle: [formatDate(date), UPDATE_CATEGORIES.find((c) => c.value === category)?.title].filter(Boolean).join(' · '),
      media,
    }),
  },
})
