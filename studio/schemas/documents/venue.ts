import { PinIcon } from '@sanity/icons/Pin'
import { defineField, defineType } from 'sanity'

import { imageField } from '../objects/helpers'

export default defineType({
  name: 'venue',
  title: 'Venue',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'address', title: 'Address', type: 'string' }),
    defineField({ name: 'mapUrl', title: 'Map URL', type: 'url' }),
    imageField(),
    defineField({ name: 'description', title: 'Description', type: 'richText' }),
    defineField({ name: 'transport', title: 'Getting there', type: 'blockContent', description: 'Train, airport express, bus …' }),
    defineField({ name: 'parking', title: 'Parking', type: 'richText' }),
    defineField({ name: 'accessibility', title: 'Accessibility', type: 'richText' }),
  ],
  preview: { select: { title: 'name', subtitle: 'address', media: 'image' } },
})
