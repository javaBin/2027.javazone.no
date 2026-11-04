import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO & sharing',
  type: 'object',
  description: 'What shows in search results and link previews. Leave empty to use defaults.',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.max(60).warning('Keep the title under 60 characters') }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(160).warning('Keep the description under 160 characters'),
    }),
    defineField({ name: 'image', title: 'Share image', type: 'image', description: 'Recommended 1200 × 630 px.' }),
  ],
})
