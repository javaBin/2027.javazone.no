import { DocumentIcon } from '@sanity/icons/Document'
import { defineField, defineType } from 'sanity'

import { editionField, slugField } from '../objects/helpers'
import { sectionTypes } from '../sections'

/** Flexible page built from sections – for Info, About, AweZone, speaker policies and one-off pages. */
export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', group: 'content', validation: (rule) => rule.required() }),
    { ...slugField(), group: 'content' },
    editionField({ required: false, description: 'Leave empty for pages that are the same every year (About, Code of conduct).' }),
    defineField({ name: 'intro', title: 'Intro', type: 'text', rows: 3, group: 'content' }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      group: 'content',
      of: sectionTypes.map((s) => ({ type: s.name })),
      options: { insertMenu: { views: [{ name: 'list' }] } },
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current', edition: 'edition.title' },
    prepare: ({ title, slug, edition }) => ({ title, subtitle: [`/${slug ?? ''}`, edition].filter(Boolean).join(' · ') }),
  },
})
