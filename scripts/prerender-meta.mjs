// Runs after `vite build` (see package.json "postbuild"). This app is a client-side SPA with
// no server-side rendering, so link-unfurling bots (Slack, X/Twitter, Facebook, iMessage) never
// execute the JS that sets per-page Open Graph tags (see src/hooks/useOpenGraph.ts) — they only
// ever see dist/index.html's static tags, for every route. This script writes a real
// <route>/index.html for each known static page (from src/data/pageMeta.json), with the correct
// tags baked in, so those bots see the right preview.

import { readFile, writeFile, mkdir } from 'node:fs/promises'

import pageMeta from '../src/data/pageMeta.json' with { type: 'json' }

const DIST_DIR = new URL('../dist/', import.meta.url)
const SITE_URL = 'https://2027.javazone.no'

function escapeHtml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function applyMeta(template, { title, description, ogDescription }) {
  let html = template

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)

  html = html.replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escapeHtml(title)}"/>`)

  html = html.replace(
    /<meta property="og:description"[^>]*content="[^"]*"\s*\/>/s,
    `<meta property="og:description" content="${escapeHtml(ogDescription ?? description)}"/>`,
  )

  if (/<meta name="description"/.test(html)) {
    html = html.replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeHtml(description)}"/>`)
  } else {
    html = html.replace(/(<meta property="og:site_name"[^>]*\/>)/, `$1\n    <meta name="description" content="${escapeHtml(description)}"/>`)
  }

  return html
}

function setOgUrl(html, pathname) {
  return html.replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${SITE_URL}${pathname}"/>`)
}

// Unlisted pages (not linked from any menu) must stay out of search engines. nginx.conf also sends
// an X-Robots-Tag header for them; robots.txt is deliberately not used, since it would publish the path.
function setNoindex(html) {
  return html.replace('</head>', '  <meta name="robots" content="noindex, nofollow"/>\n  </head>')
}

async function writePage(template, pathname, meta) {
  let html = setOgUrl(applyMeta(template, meta), pathname)
  if (meta.noindex) html = setNoindex(html)
  const dir = new URL(`.${pathname}/`, DIST_DIR)
  await mkdir(dir, { recursive: true })
  await writeFile(new URL('index.html', dir), html)
}

async function main() {
  const template = await readFile(new URL('index.html', DIST_DIR), 'utf-8')

  for (const meta of Object.values(pageMeta)) {
    if (meta.path === '/') continue // already dist/index.html itself
    if (meta.prerender === false) continue // page exists in code but isn't routed yet
    await writePage(template, meta.path, meta)
    console.log(`prerendered ${meta.path}`)
  }
}

await main()
