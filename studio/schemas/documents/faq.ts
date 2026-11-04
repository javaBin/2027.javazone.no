import { HelpCircleIcon } from '@sanity/icons/HelpCircle'
import { defineField, defineType } from 'sanity'

import { editionField, orderField } from '../objects/helpers'

export const FAQ_CATEGORIES = [
  { title: 'Tickets', value: 'tickets' },
  { title: 'Practical info', value: 'info' },
  { title: 'Volunteers', value: 'volunteer' },
  { title: 'Partners', value: 'partner' },
  { title: 'Speakers', value: 'speaker' },
  { title: 'About', value: 'about' },
]

/** Question/answer or title/body item. Feeds the accordion lists (TopicRows) on the site. */
export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({ name: 'question', title: 'Question / title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'answer', title: 'Answer / body', type: 'richText', validation: (rule) => rule.required() }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: FAQ_CATEGORIES }, validation: (rule) => rule.required() }),
    editionField({ required: false, description: 'Leave empty if this answer is the same every year.' }),
    orderField,
  ],
  orderings: [{ title: 'Sort order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'question', category: 'category', edition: 'edition.title' },
    prepare: ({ title, category, edition }) => ({
      title,
      subtitle: [FAQ_CATEGORIES.find((c) => c.value === category)?.title, edition ?? 'Every year'].join(' · '),
    }),
  },
})
