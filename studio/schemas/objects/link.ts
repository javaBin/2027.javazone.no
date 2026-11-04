import { LinkIcon } from '@sanity/icons/Link'
import { defineField, defineType } from 'sanity'

/** Fixed routes in the website (keep in sync with src/routes). */
export const ROUTES = [
  { title: 'Home', value: '/' },
  { title: 'Updates', value: '/updates' },
  { title: 'Gallery', value: '/gallery' },
  { title: 'Program', value: '/program' },
  { title: 'Info', value: '/info' },
  { title: 'Tickets', value: '/tickets' },
  { title: 'About', value: '/about' },
  { title: 'Partner', value: '/partner' },
  { title: 'Partner info', value: '/partner/info' },
  { title: 'Volunteer', value: '/volunteer' },
  { title: 'Speaker', value: '/speaker' },
  { title: 'Speaker – family ticket', value: '/speaker/family-ticket' },
  { title: 'Speaker – reimbursement', value: '/speaker/reimbursement' },
  { title: 'Speaker – submission tips', value: '/speaker/tips' },
  { title: 'History', value: '/history' },
]

const LINKABLE_TYPES = [{ type: 'update' }, { type: 'gallery' }, { type: 'page' }]

/** Fields shared by the `link` object and the inline link annotation in rich text. */
export const linkTargetFields = [
  defineField({
    name: 'type',
    title: 'Links to',
    type: 'string',
    initialValue: 'route',
    options: {
      layout: 'radio',
      direction: 'horizontal',
      list: [
        { title: 'Content', value: 'internal' },
        { title: 'Page on the site', value: 'route' },
        { title: 'External URL', value: 'external' },
      ],
    },
  }),
  defineField({
    name: 'internal',
    title: 'Content',
    type: 'reference',
    to: LINKABLE_TYPES,
    hidden: ({ parent }) => parent?.type !== 'internal',
  }),
  defineField({
    name: 'route',
    title: 'Page',
    type: 'string',
    options: { list: ROUTES },
    hidden: ({ parent }) => parent?.type !== 'route',
  }),
  defineField({
    name: 'url',
    title: 'URL',
    type: 'url',
    validation: (rule) => rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }),
    hidden: ({ parent }) => parent?.type !== 'external',
  }),
]

export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [defineField({ name: 'label', title: 'Label', type: 'string', description: 'Text shown on the link or button.' }), ...linkTargetFields],
  preview: {
    select: { label: 'label', type: 'type', route: 'route', url: 'url', internal: 'internal.title' },
    prepare: ({ label, type, route, url, internal }) => ({
      title: label || 'Link',
      subtitle: type === 'internal' ? internal : type === 'route' ? route : url,
    }),
  },
})
