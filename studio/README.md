# JavaZone Sanity Studio

Standalone Sanity Studio (project `kkcs9lf3`, dataset `production`). Lives in this repo for now; kept self-contained so it can be moved to its own repo later.

**Hosted at https://javazone.sanity.studio** – deploy changes with `npm run deploy` (or `npm run studio:deploy` from the repo root).

```bash
npm install          # inside studio/
npm run dev          # http://localhost:3333  (or `npm run studio` from repo root)
npm run deploy       # deploy to javazone.sanity.studio
npm run typegen      # generate ../src/sanity.types.ts from schema + GROQ queries in ../src
```

## Content model

- **Site settings** (singleton) – `currentEdition` decides which year the website shows.
- **Edition** – one per JavaZone year (dates, venue, ticket/CFP status, Sleepingpill conference ID).
- Year-specific content references an edition: Updates, Galleries, Partner packages, Food menus.
  FAQ and Pages have an _optional_ edition – leave empty for content that's the same every year.
- Partners have a list of editions, so a company is created once and reused.

**New year:** create a new Edition, switch `Site settings → Current edition`. Done.

## Structure

```
schemas/
  documents/   one file per document type
  objects/     link, seo, richText/blockContent, helpers (imageField, slugField, editionField …)
  sections/    page-builder sections used by `page`
structure.ts   desk structure (per-edition lists, FAQ per category)
env.ts         projectId / dataset / apiVersion – shared by config and CLI
```
