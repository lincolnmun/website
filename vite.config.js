import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escAttr = s => esc(s).replace(/"/g, '&quot;')
const p = s => `<p>${esc(s)}</p>`

const ORIGIN = 'https://lincolnmun.org'
const url = lang => lang === 'es' ? `${ORIGIN}/es/` : `${ORIGIN}/`

/* Per-language <head> SEO block: canonical, title, description, OG, and the
   hreflang alternates (identical on both pages — reciprocity is what Google
   requires). Replaces the <!--SEO--> marker in index.html. */
function renderHead(lang, t) {
  return [
    `<link rel="canonical" href="${url(lang)}" />`,
    `<title>${esc(t.meta.title)}</title>`,
    `<meta name="description" content="${escAttr(t.meta.description)}" />`,
    `<meta property="og:title" content="${escAttr(t.meta.ogTitle)}" />`,
    `<meta property="og:description" content="${escAttr(t.meta.ogDescription)}" />`,
    `<meta property="og:url" content="${url(lang)}" />`,
    `<link rel="alternate" hreflang="en" href="${url('en')}" />`,
    `<link rel="alternate" hreflang="es" href="${url('es')}" />`,
    `<link rel="alternate" hreflang="x-default" href="${url('en')}" />`,
  ].join('\n    ')
}

/* Build a semantic no-JS / SEO fallback from the site content (English).
   React clears #root on mount, so this is invisible to JS users. */
function renderFallback(lang, t, committees, sg) {
  const parts = [
    // Crawlable link to the other language — the only inter-page link Google
    // can follow (the visible switcher is a JS button). Lives in the fallback,
    // which is the crawler-facing DOM.
    lang === 'es' ? `<a href="/">English version</a>` : `<a href="/es/">Versión en español</a>`,
    `<h1>LINCOLNMUN</h1>`,
    p('Asociación Escuelas Lincoln'),
    p(t.hero.date),

    `<h2>${esc(t.about.heading[0])} ${esc(t.about.heading[1])}</h2>`,
    p(t.about.p1), p(t.about.p2), p(t.about.p3), p(t.about.tagline),

    `<h2>${esc(t.committees.heading)}</h2>`,
    `<ul>${committees.map(c => `<li>${esc(c.name)}</li>`).join('')}</ul>`,

    `<h2>${esc(t.schedule.heading)}</h2>`,
    ...t.schedule.days.flatMap(d => [
      `<h3>${esc(d.day)} — ${esc(d.date)}</h3>`,
      ...d.sessions.map(s => p(`${s.time} — ${s.activity}`)),
    ]),

    `<h2>${esc(t.letter.heading[0])} ${esc(t.letter.heading[1])}</h2>`,
    p(t.letter.salutation),
    ...t.letter.body.map(p),
    p(t.letter.closing),
    p(`Secretary-General ${sg[0]} — ${t.letter.titles[0]}`),
    p(`Secretary-General ${sg[1]} — ${t.letter.titles[1]}`),

    p(t.footer.desc),
    p(t.footer.copyright),
  ]
  return parts.join('')
}

const fallbackDiv = block => `<div id="root"><div id="seo-fallback">${block}</div></div>`

function seoFallback() {
  // Load content fresh each build; cache-bust so the dev server picks up edits.
  const content = () => import(new URL('./src/content.js', import.meta.url).href + '?t=' + Date.now())
  return {
    name: 'seo-fallback',
    async transformIndexHtml(html) {
      const { T, COMMITTEES, SG } = await content()
      return html
        .replace('<!--SEO-->', renderHead('en', T.en))
        .replace('<div id="root"></div>', fallbackDiv(renderFallback('en', T.en, COMMITTEES, SG)))
    },
    // Emit the Spanish twin at /es/ by cloning the finished English HTML on
    // disk and swapping lang, head, and fallback. writeBundle runs after Vite
    // has written index.html (which generateBundle is too early to see).
    async writeBundle(opts) {
      const { readFile, mkdir, writeFile } = await import('node:fs/promises')
      const { join } = await import('node:path')
      const { T, COMMITTEES, SG } = await content()
      const enHtml = await readFile(join(opts.dir, 'index.html'), 'utf8')
      const es = enHtml
        .replace('<html lang="en">', '<html lang="es">')
        .replace(renderHead('en', T.en), renderHead('es', T.es))
        .replace(fallbackDiv(renderFallback('en', T.en, COMMITTEES, SG)), fallbackDiv(renderFallback('es', T.es, COMMITTEES, SG)))
      await mkdir(join(opts.dir, 'es'), { recursive: true })
      await writeFile(join(opts.dir, 'es', 'index.html'), es)
    },
  }
}

export default defineConfig({
  plugins: [react(), seoFallback()],
  server: {
    port: 3000,
  },
})
