import { BlockContentIcon } from '@sanity/icons/BlockContent'
import { HelpCircleIcon } from '@sanity/icons/HelpCircle'
import { ImageIcon } from '@sanity/icons/Image'
import { ImagesIcon } from '@sanity/icons/Images'
import { LaunchIcon } from '@sanity/icons/Launch'
import { ThListIcon } from '@sanity/icons/ThList'
import { defineArrayMember, defineField, defineType } from 'sanity'

import { FAQ_CATEGORIES } from '../documents/faq'
import { imageField } from '../objects/helpers'

const textSection = defineType({
  name: 'textSection',
  title: 'Text',
  type: 'object',
  icon: BlockContentIcon,
  fields: [defineField({ name: 'heading', title: 'Heading', type: 'string' }), defineField({ name: 'body', title: 'Body', type: 'blockContent' })],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: title || 'Text', subtitle: 'Text' }) },
})

/** Title/body accordion – matches TopicRows on the site. */
const topicsSection = defineType({
  name: 'topicsSection',
  title: 'Topic list',
  type: 'object',
  icon: ThListIcon,
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Topics',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'topic',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'body', title: 'Body', type: 'richText' }),
          ],
        }),
      ],
    }),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: title || 'Topic list', subtitle: 'Topic list' }) },
})

const faqSection = defineType({
  name: 'faqSection',
  title: 'FAQ',
  type: 'object',
  icon: HelpCircleIcon,
  description: 'Shows FAQ items from a category (current edition + every-year items).',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: FAQ_CATEGORIES }, validation: (rule) => rule.required() }),
  ],
  preview: {
    select: { title: 'heading', category: 'category' },
    prepare: ({ title, category }) => ({ title: title || 'FAQ', subtitle: `FAQ · ${category ?? ''}` }),
  },
})

const imageSection = defineType({
  name: 'imageSection',
  title: 'Image',
  type: 'object',
  icon: ImageIcon,
  fields: [imageField({ required: true }), defineField({ name: 'caption', title: 'Caption', type: 'string' })],
  preview: { select: { title: 'caption', media: 'image' }, prepare: ({ title, media }) => ({ title: title || 'Image', subtitle: 'Image', media }) },
})

const ctaSection = defineType({
  name: 'ctaSection',
  title: 'Call to action',
  type: 'object',
  icon: LaunchIcon,
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'text', title: 'Text', type: 'richText' }),
    defineField({ name: 'link', title: 'Button', type: 'link', validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: title || 'Call to action', subtitle: 'Call to action' }) },
})

const gallerySection = defineType({
  name: 'gallerySection',
  title: 'Gallery',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'gallery', title: 'Gallery', type: 'reference', to: [{ type: 'gallery' }], validation: (rule) => rule.required() }),
  ],
  preview: {
    select: { title: 'gallery.title', media: 'gallery.coverImage' },
    prepare: ({ title, media }) => ({ title: title || 'Gallery', subtitle: 'Gallery', media }),
  },
})

export const sectionTypes = [textSection, topicsSection, faqSection, imageSection, ctaSection, gallerySection]
