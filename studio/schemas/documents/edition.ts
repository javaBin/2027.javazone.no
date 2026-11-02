import { CalendarIcon } from '@sanity/icons/Calendar'
import { defineField, defineType } from 'sanity'

import { formatDate } from '../objects/helpers'

/** One JavaZone year. Year-specific content references this. */
export default defineType({
  name: 'edition',
  title: 'Edition',
  type: 'document',
  icon: CalendarIcon,
  groups: [
    { name: 'basics', title: 'Basics', default: true },
    { name: 'tickets', title: 'Tickets' },
    { name: 'cfp', title: 'Call for papers' },
    { name: 'program', title: 'Program' },
  ],
  fields: [
    defineField({ name: 'year', title: 'Year', type: 'number', group: 'basics', validation: (rule) => rule.required().integer().min(2000) }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'basics',
      description: 'E.g. "JavaZone 2027".',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'startDate', title: 'Conference start', type: 'date', group: 'basics' }),
    defineField({
      name: 'endDate',
      title: 'Conference end',
      type: 'date',
      group: 'basics',
      validation: (rule) =>
        rule.custom((end, ctx) => {
          const start = (ctx.document as { startDate?: string } | undefined)?.startDate
          return !end || !start || end >= start ? true : 'End date must be on or after the start date'
        }),
    }),
    defineField({ name: 'workshopDate', title: 'Workshop day', type: 'date', group: 'basics' }),
    defineField({
      name: 'dateLabel',
      title: 'Date label',
      type: 'string',
      group: 'basics',
      description: 'Optional override for how dates are shown, e.g. "September 2–3" or "TBA".',
    }),
    defineField({ name: 'venue', title: 'Venue', type: 'reference', to: [{ type: 'venue' }], group: 'basics' }),
    defineField({
      name: 'ticketStatus',
      title: 'Ticket status',
      type: 'string',
      group: 'tickets',
      initialValue: 'soon',
      options: {
        layout: 'radio',
        list: [
          { title: 'Coming soon', value: 'soon' },
          { title: 'On sale', value: 'onSale' },
          { title: 'Sold out', value: 'soldOut' },
        ],
      },
    }),
    defineField({ name: 'ticketSaleStart', title: 'Ticket sale starts', type: 'datetime', group: 'tickets' }),
    defineField({
      name: 'ticketsUrl',
      title: 'Ticket shop URL',
      type: 'url',
      group: 'tickets',
      hidden: ({ document }) => document?.ticketStatus !== 'onSale',
    }),
    defineField({
      name: 'cfpStatus',
      title: 'Call for papers status',
      type: 'string',
      group: 'cfp',
      initialValue: 'notOpen',
      options: {
        layout: 'radio',
        list: [
          { title: 'Not open yet', value: 'notOpen' },
          { title: 'Open', value: 'open' },
          { title: 'Closed', value: 'closed' },
        ],
      },
    }),
    defineField({ name: 'cfpOpens', title: 'CFP opens', type: 'datetime', group: 'cfp' }),
    defineField({ name: 'cfpDeadline', title: 'CFP deadline', type: 'datetime', group: 'cfp' }),
    defineField({
      name: 'programConferenceId',
      title: 'Sleepingpill conference ID',
      type: 'string',
      group: 'program',
      description: 'Used to fetch the program, e.g. "javazone_2027".',
    }),
    defineField({ name: 'programPublished', title: 'Program published', type: 'boolean', group: 'program', initialValue: false }),
  ],
  orderings: [{ title: 'Year, newest first', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', start: 'startDate', end: 'endDate' },
    prepare: ({ title, start, end }) => ({
      title,
      subtitle: start ? [formatDate(start), formatDate(end)].filter(Boolean).join(' – ') : 'Dates TBA',
    }),
  },
})
