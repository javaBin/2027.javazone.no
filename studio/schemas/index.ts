import edition from './documents/edition'
import faq from './documents/faq'
import foodMenu from './documents/foodMenu'
import gallery from './documents/gallery'
import page from './documents/page'
import partner from './documents/partner'
import partnerPackage from './documents/partnerPackage'
import siteSettings from './documents/siteSettings'
import update from './documents/update'
import venue from './documents/venue'
import link from './objects/link'
import { blockContent, richText } from './objects/richText'
import seo from './objects/seo'
import { sectionTypes } from './sections'

export const schemaTypes = [
  // Documents
  siteSettings,
  edition,
  update,
  gallery,
  partner,
  partnerPackage,
  faq,
  page,
  venue,
  foodMenu,
  // Objects
  link,
  seo,
  richText,
  blockContent,
  ...sectionTypes,
]
