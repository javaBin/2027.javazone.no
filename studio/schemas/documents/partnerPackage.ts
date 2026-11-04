import { PackageIcon } from '@sanity/icons/Package'
import { defineField, defineType } from 'sanity'

import { currentEditionInitialValue, editionField, orderField } from '../objects/helpers'

export default defineType({
  name: 'partnerPackage',
  title: 'Partner package',
  type: 'document',
  icon: PackageIcon,
  initialValue: currentEditionInitialValue,
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
    editionField(),
    defineField({ name: 'price', title: 'Price (NOK, ex. VAT)', type: 'number', description: 'Leave empty if not decided yet.' }),
    defineField({
      name: 'priceLabel',
      title: 'Price label',
      type: 'string',
      description: 'Shown instead of the price, e.g. "TBA" or "From 100 000".',
    }),
    defineField({ name: 'features', title: 'What’s included', type: 'richText' }),
    orderField,
  ],
  orderings: [{ title: 'Sort order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', price: 'price', label: 'priceLabel', edition: 'edition.title' },
    prepare: ({ title, price, label, edition }) => ({
      title,
      subtitle: [edition, label ?? (price ? `${price.toLocaleString('nb-NO')} NOK` : undefined)].filter(Boolean).join(' · '),
    }),
  },
})
