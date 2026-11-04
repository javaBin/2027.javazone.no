import { BasketIcon } from '@sanity/icons/Basket'
import { defineArrayMember, defineField, defineType } from 'sanity'

import { currentEditionInitialValue, editionField } from '../objects/helpers'

/** Conference food menu: vendors → sections → dishes. Mirrors 2026's menuData.json. */
export default defineType({
  name: 'foodMenu',
  title: 'Food menu',
  type: 'document',
  icon: BasketIcon,
  initialValue: currentEditionInitialValue,
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    editionField(),
    defineField({
      name: 'vendors',
      title: 'Vendors',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'vendor',
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
            defineField({
              name: 'anchor',
              title: 'Anchor',
              type: 'string',
              description: 'Used in URLs/QR codes, e.g. "eatit". Must stay stable once printed.',
            }),
            defineField({ name: 'partner', title: 'Partner', type: 'reference', to: [{ type: 'partner' }] }),
            defineField({
              name: 'sections',
              title: 'Sections',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'menuSection',
                  type: 'object',
                  fields: [
                    defineField({ name: 'label', title: 'Label', type: 'string', description: 'E.g. "Lunch" or "Vegetarian". Optional.' }),
                    defineField({
                      name: 'items',
                      title: 'Dishes',
                      type: 'array',
                      of: [
                        defineArrayMember({
                          name: 'dish',
                          type: 'object',
                          fields: [
                            defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
                            defineField({ name: 'description', title: 'Description', type: 'string' }),
                            defineField({
                              name: 'allergens',
                              title: 'Allergens',
                              type: 'array',
                              of: [{ type: 'string' }],
                              options: { layout: 'tags' },
                            }),
                          ],
                          preview: { select: { title: 'name', subtitle: 'description' } },
                        }),
                      ],
                    }),
                  ],
                  preview: { select: { title: 'label' }, prepare: ({ title }) => ({ title: title || 'Section' }) },
                }),
              ],
            }),
          ],
          preview: { select: { title: 'name', subtitle: 'partner.name' } },
        }),
      ],
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'edition.title' } },
})
