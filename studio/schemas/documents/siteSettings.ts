import { CogIcon } from '@sanity/icons/Cog'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'notice', title: 'Notice banner' },
    { name: 'navigation', title: 'Navigation' },
    { name: 'footer', title: 'Footer' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'currentEdition',
      title: 'Current edition',
      type: 'reference',
      to: [{ type: 'edition' }],
      group: 'general',
      description: 'The JavaZone year the website shows. Switch this when starting a new year.',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'contactEmail', title: 'Contact email', type: 'string', group: 'general', validation: (rule) => rule.email() }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      group: 'general',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: { list: ['LinkedIn', 'Bluesky', 'Mastodon', 'Instagram', 'YouTube', 'Vimeo', 'X', 'Facebook', 'GitHub'] },
            }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
          ],
          preview: { select: { title: 'platform', subtitle: 'url' } },
        }),
      ],
    }),
    defineField({
      name: 'notice',
      title: 'Notice banner',
      type: 'object',
      group: 'notice',
      description: 'A short message shown at the top of every page.',
      fields: [
        defineField({ name: 'active', title: 'Show banner', type: 'boolean', initialValue: false }),
        defineField({ name: 'message', title: 'Message', type: 'string' }),
        defineField({ name: 'link', title: 'Link', type: 'link' }),
      ],
    }),
    defineField({
      name: 'navigation',
      title: 'Main navigation',
      type: 'array',
      group: 'navigation',
      of: [defineArrayMember({ type: 'link' })],
    }),
    defineField({
      name: 'footerColumns',
      title: 'Footer columns',
      type: 'array',
      group: 'footer',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerColumn',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'links', title: 'Links', type: 'array', of: [defineArrayMember({ type: 'link' })] }),
          ],
        }),
      ],
    }),
    defineField({ name: 'seo', title: 'Default SEO', type: 'seo', group: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
})
