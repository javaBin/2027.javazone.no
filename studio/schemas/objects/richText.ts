import { LinkIcon } from '@sanity/icons/Link'
import { defineArrayMember, defineField, defineType } from 'sanity'

import { linkTargetFields } from './link'

// Named `inlineLink` so it doesn't clash with the `link` object type. Same targets as `link`.
const inlineLink = defineArrayMember({
  name: 'inlineLink',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: linkTargetFields,
})

const decorators = [
  { title: 'Bold', value: 'strong' },
  { title: 'Italic', value: 'em' },
  { title: 'Code', value: 'code' },
]

/** Short formatted text: paragraphs, bold/italic, links and bullet lists. */
export const richText = defineType({
  name: 'richText',
  title: 'Text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{ title: 'Normal', value: 'normal' }],
      lists: [{ title: 'Bullet list', value: 'bullet' }],
      marks: { decorators, annotations: [inlineLink] },
    }),
  ],
})

/** Long-form text: headings, quotes, lists and inline images. */
export const blockContent = defineType({
  name: 'blockContent',
  title: 'Content',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading', value: 'h2' },
        { title: 'Subheading', value: 'h3' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet list', value: 'bullet' },
        { title: 'Numbered list', value: 'number' },
      ],
      marks: { decorators, annotations: [inlineLink] },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string', validation: (rule) => rule.warning().required() }),
        defineField({ name: 'caption', title: 'Caption', type: 'string' }),
        defineField({ name: 'credit', title: 'Photo credit', type: 'string' }),
      ],
    }),
  ],
})
