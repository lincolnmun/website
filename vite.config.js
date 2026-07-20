import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const p = s => `<p>${esc(s)}</p>`

/* Build a semantic no-JS / SEO fallback from the site content (English).
   React clears #root on mount, so this is invisible to JS users. */
function renderFallback(t, committees, sg) {
  const parts = [
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

function seoFallback() {
  return {
    name: 'seo-fallback',
    async transformIndexHtml(html) {
      // cache-bust so the dev server picks up edits to content.js on reload
      const url = new URL('./src/content.js', import.meta.url).href + '?t=' + Date.now()
      const { T, COMMITTEES, SG } = await import(url)
      const block = renderFallback(T.en, COMMITTEES, SG)
      return html.replace('<div id="root"></div>', `<div id="root">${block}</div>`)
    },
  }
}

export default defineConfig({
  plugins: [react(), seoFallback()],
  server: {
    port: 3000,
  },
})
