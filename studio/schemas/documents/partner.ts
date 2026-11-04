import { CaseIcon } from '@sanity/icons/Case'
import { defineArrayMember, defineField, defineType } from 'sanity'

/** A partner company. Reused across years – tick off which editions they're part of. */
export default defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'SVG preferred.',
      options: { accept: 'image/svg+xml,image/png,image/webp' },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'url', title: 'Website', type: 'url' }),
    defineField({
      name: 'editions',
      title: 'Editions',
      type: 'array',
      description: 'The JavaZone years this company is a partner.',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'edition' }] })],
      validation: (rule) => rule.unique(),
    }),
  ],
  orderings: [{ title: 'Name', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'url', media: 'logo' } },
})
