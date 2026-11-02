import { ImagesIcon } from '@sanity/icons/Images'
import { defineArrayMember, defineField, defineType } from 'sanity'

import { currentEditionInitialValue, editionField, formatDate, imageField, slugField } from '../objects/helpers'

type GalleryDoc = { source?: 'link' | 'upload' }
const sourceOf = (doc: unknown) => (doc as GalleryDoc | undefined)?.source ?? 'link'

/** A photo album – either a link to an external album (default) or images uploaded to Sanity. */
export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  icon: ImagesIcon,
  initialValue: currentEditionInitialValue,
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    slugField(),
    editionField(),
    defineField({ name: 'date', title: 'Date', type: 'date', description: 'When the photos were taken.' }),
    defineField({ name: 'photographer', title: 'Photographer', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({
      name: 'source',
      title: 'Photos are',
      type: 'string',
      initialValue: 'link',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { title: 'Linked (Flickr, Google Photos …)', value: 'link' },
          { title: 'Uploaded here', value: 'upload' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Album URL',
      type: 'url',
      hidden: ({ document }) => sourceOf(document) !== 'link',
      validation: (rule) => rule.custom((url, ctx) => (sourceOf(ctx.document) === 'link' && !url ? 'Add a link to the album' : true)),
    }),
    defineField({
      name: 'provider',
      title: 'Provider',
      type: 'string',
      hidden: ({ document }) => sourceOf(document) !== 'link',
      options: {
        list: [
          { title: 'Flickr', value: 'flickr' },
          { title: 'Google Photos', value: 'googlePhotos' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    imageField({
      name: 'coverImage',
      title: 'Cover image',
      description: 'Thumbnail for the album. For uploaded albums, the first image is used if empty.',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      options: { layout: 'grid' },
      hidden: ({ document }) => sourceOf(document) !== 'upload',
      of: [defineArrayMember(imageField())],
      validation: (rule) =>
        rule.custom((images, ctx) =>
          sourceOf(ctx.document) === 'upload' && !(images as unknown[] | undefined)?.length ? 'Add at least one image' : true,
        ),
    }),
  ],
  orderings: [{ title: 'Newest first', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', date: 'date', source: 'source', cover: 'coverImage', first: 'images.0' },
    prepare: ({ title, date, source, cover, first }) => ({
      title,
      subtitle: [formatDate(date), source === 'upload' ? 'Uploaded' : 'Linked'].filter(Boolean).join(' · '),
      media: cover ?? first,
    }),
  },
})
