import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

/* ─── Design Tokens ─────────────────────────────────────────────────────── */
const C = {
  navy:      '#182343',
  navyDark:  '#080D1C',
  navyMid:   '#0E1729',
  gold:      '#C9961A',
  goldLight: '#FDB71E',
  offWhite:  '#F7F6F2',
  white:     '#FFFFFF',
  text:      '#0F172A',
  muted:     '#64748B',
  border:    '#E2E8F0',
}

const F = {
  display: '"Cormorant Garamond", Georgia, serif',
  body:    '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
}

/* ─── Animation Variants ────────────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
}
const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.55 } },
}
const stagger = {
  visible: { transition: { staggerChildren: 0.09 } },
}

/* ─── Reveal on scroll ──────────────────────────────────────────────────── */
function Reveal({ children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-72px' })
  return (
    <motion.div ref={ref} variants={stagger}
      initial="hidden" animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Section overline label ────────────────────────────────────────────── */
function Label({ children, light = false }) {
  return (
    <motion.p variants={fadeUp} style={{
      fontFamily: F.body, fontSize: '0.62rem', letterSpacing: '0.28em',
      textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.6rem',
      color: light ? C.goldLight : C.gold,
    }}>
      {children}
    </motion.p>
  )
}

/* ─── Thin rule ─────────────────────────────────────────────────────────── */
function Rule({ light = false }) {
  return (
    <motion.div variants={fadeIn} style={{
      width: 36, height: 1, marginBottom: '1.75rem',
      background: light ? 'rgba(253,183,30,0.45)' : C.navy,
    }} />
  )
}

/* ─── Countdown hook ────────────────────────────────────────────────────── */
function useCountdown(isoTarget) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 })
  useEffect(() => {
    const tick = () => {
      const ms = Math.max(0, new Date(isoTarget) - Date.now())
      setTime({
        d: Math.floor(ms / 86400000),
        h: Math.floor((ms % 86400000) / 3600000),
        m: Math.floor((ms % 3600000) / 60000),
        s: Math.floor((ms % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [isoTarget])
  return time
}

/* ─── Navbar ────────────────────────────────────────────────────────────── */
const NAV = [
  { label: 'About',        href: '#about' },
  { label: 'Committees',   href: '#committees' },
  { label: 'Schedule',     href: '#schedule' },
  { label: 'Registration', href: '#registration' },
]

function Navbar() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 66, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2.75rem',
        background: solid ? C.navy : 'transparent',
        borderBottom: solid ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'background 0.4s ease, border-color 0.4s ease',
      }}
    >
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none' }}>
        <img src="/logo.jpg" alt="Escuelas Lincoln" style={{
          width: 38, height: 38, borderRadius: '50%', objectFit: 'cover',
          border: '1.5px solid rgba(255,255,255,0.18)',
        }} />
        <span style={{ fontFamily: F.display, fontSize: '1.1rem', fontWeight: 600, color: C.white, letterSpacing: '0.06em' }}>
          LINCOLNMUN
        </span>
      </a>

      <div className="hidden md:flex" style={{ alignItems: 'center', gap: 34 }}>
        {NAV.map(({ label, href }) => (
          <a key={label} href={href} style={{
            fontFamily: F.body, fontSize: '0.68rem', letterSpacing: '0.16em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)',
            textDecoration: 'none', transition: 'color 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = C.white)}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
          >
            {label}
          </a>
        ))}
        <a href="#registration" style={{
          fontFamily: F.body, fontSize: '0.66rem', fontWeight: 600,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          background: C.goldLight, color: C.navy,
          padding: '0.55rem 1.35rem', textDecoration: 'none',
          transition: 'background 0.2s',
        }}
          onMouseEnter={e => (e.currentTarget.style.background = '#e8a800')}
          onMouseLeave={e => (e.currentTarget.style.background = C.goldLight)}
        >
          Register
        </a>
      </div>

      <button className="md:hidden" onClick={() => setOpen(!open)} style={{
        background: 'none', border: 'none', color: C.white, cursor: 'pointer', padding: 4,
      }} aria-label="Toggle menu">
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          {open
            ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            : <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            style={{
              position: 'absolute', top: 66, left: 0, right: 0,
              background: C.navy, overflow: 'hidden',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {[...NAV, { label: 'Register', href: '#registration' }].map(({ label, href }) => (
              <a key={label} href={href} onClick={() => setOpen(false)} style={{
                display: 'block', fontFamily: F.body, fontSize: '0.72rem',
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.7)', padding: '1rem 2.75rem',
                textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}>
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */
function Hero() {
  const { d, h, m, s } = useCountdown('2026-10-15T09:00:00-03:00')

  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/campus.webp)', backgroundSize: 'cover', backgroundPosition: 'center', transform: 'scale(1.03)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,13,28,0.70)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(8,13,28,0.1) 0%, transparent 35%, rgba(8,13,28,0.65) 100%)' }} />

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 1.5rem', maxWidth: 860, margin: '0 auto' }}>

        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.65 }}
          style={{ fontFamily: F.body, fontSize: '0.6rem', letterSpacing: '0.34em', textTransform: 'uppercase', fontWeight: 600, color: C.goldLight, marginBottom: '1.75rem' }}
        >
          Founding Conference · I Edition
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: F.display, fontWeight: 600, fontSize: 'clamp(3rem, 9vw, 9rem)', lineHeight: 0.88, letterSpacing: '-0.01em', marginBottom: '2.25rem', whiteSpace: 'nowrap' }}
        >
          <span style={{ color: C.white }}>LINCOLN</span><span style={{ color: C.goldLight }}>MUN</span>
        </motion.h1>

        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 1.55 }}
          style={{ width: 44, height: 1, background: 'rgba(255,255,255,0.2)', margin: '0 auto 2rem' }} />

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.65 }}
          style={{ fontFamily: F.display, fontSize: 'clamp(1rem, 2vw, 1.3rem)', fontStyle: 'italic', color: 'rgba(255,255,255,0.68)', marginBottom: '0.35rem' }}>
          Asociación Escuelas Lincoln
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.75 }}
          style={{ fontFamily: F.body, fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '3.5rem' }}>
          15 – 18 October 2026 · Vicente López, Buenos Aires
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 1.9 }}
          style={{ display: 'inline-flex', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '3rem' }}
        >
          {[{ v: d, l: 'Days' }, { v: h, l: 'Hours' }, { v: m, l: 'Min' }, { v: s, l: 'Sec' }].map(({ v, l }, i) => (
            <div key={l} style={{
              padding: 'clamp(1rem, 2vw, 1.4rem) clamp(1.25rem, 3vw, 1.9rem)',
              textAlign: 'center',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none',
            }}>
              <div style={{ fontFamily: F.display, fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 600, color: C.white, lineHeight: 1, letterSpacing: '-0.02em' }}>
                {String(v).padStart(2, '0')}
              </div>
              <div style={{ fontFamily: F.body, fontSize: '0.54rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)', marginTop: 6 }}>
                {l}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 2.1 }}
          style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#registration" style={{
            fontFamily: F.body, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase',
            background: C.goldLight, color: C.navy, padding: '1rem 2.25rem',
            textDecoration: 'none', transition: 'background 0.2s, transform 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#e8a800'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = C.goldLight; e.currentTarget.style.transform = 'translateY(0)' }}>
            Register Your School
          </a>
          <a href="#about" style={{
            fontFamily: F.body, fontSize: '0.68rem', fontWeight: 400, letterSpacing: '0.16em', textTransform: 'uppercase',
            background: 'transparent', color: 'rgba(255,255,255,0.7)',
            border: '1px solid rgba(255,255,255,0.24)', padding: '1rem 2.25rem',
            textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s, transform 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.65)'; e.currentTarget.style.color = C.white; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.24)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.transform = 'translateY(0)' }}>
            Learn More
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }}
        style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
        <span style={{ fontFamily: F.body, fontSize: '0.54rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.26)' }}>Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
          <svg width="13" height="13" fill="none" stroke="rgba(255,255,255,0.26)" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ─── Stats strip ────────────────────────────────────────────────────────── */
function StatsStrip() {
  const items = [
    { v: '13', l: 'Committees' },
    { v: '300', l: 'Delegate Seats' },
    { v: '26',  l: 'Chairs' },
    { v: '4',   l: 'Conference Days' },
    { v: '2',   l: 'Languages' },
  ]
  return (
    <div style={{ background: C.navy, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="grid grid-cols-3 md:grid-cols-5" style={{ maxWidth: 1100, margin: '0 auto' }}>
        {items.map(({ v, l }, i) => (
          <div key={l} style={{
            padding: '1.5rem 0.75rem', textAlign: 'center',
            borderRight: i < 4 ? '1px solid rgba(255,255,255,0.05)' : 'none',
          }}>
            <div style={{ fontFamily: F.display, fontSize: '2rem', fontWeight: 600, color: C.goldLight, lineHeight: 1 }}>{v}</div>
            <div style={{ fontFamily: F.body, fontSize: '0.57rem', letterSpacing: '0.17em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.33)', marginTop: 6 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── About ─────────────────────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" style={{ background: C.offWhite, padding: '7rem 2.5rem' }}>
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ maxWidth: 1100, margin: '0 auto', gap: '5rem', alignItems: 'start' }}>

        <Reveal>
          <Label>About the Conference</Label>
          <Rule />
          <motion.h2 variants={fadeUp} style={{
            fontFamily: F.display, fontWeight: 600, color: C.text,
            fontSize: 'clamp(2.4rem, 4vw, 3.75rem)', lineHeight: 1.08,
            letterSpacing: '-0.02em', marginBottom: '2rem',
          }}>
            What is<br />LincolnMUN?
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontFamily: F.body, fontSize: '0.95rem', lineHeight: 1.85, color: '#334155', marginBottom: '1.35rem' }}>
            LINCOLNMUN is the inaugural student-founded Model United Nations conference of Asociación Escuelas Lincoln. Designed as a recurring, twice-yearly institution — LINCOLNMUN I in October 2026 and LINCOLNMUN II in April 2027 — it is hosted on the Lincoln campus in Vicente López and open to secondary-school delegations across Buenos Aires Province and the broader region.
          </motion.p>
          <motion.p variants={fadeUp} style={{ fontFamily: F.body, fontSize: '0.95rem', lineHeight: 1.85, color: '#334155', marginBottom: '2.25rem' }}>
            It is simultaneously a conference and the IB Diploma CAS project of the Founding Secretaries-General — built with the rigour and documentation standards of a professional institution, because that is what it is intended to become.
          </motion.p>
          <motion.blockquote variants={fadeUp} style={{
            borderLeft: `2px solid ${C.gold}`, paddingLeft: '1.4rem',
            fontFamily: F.display, fontSize: '1.15rem', fontStyle: 'italic',
            color: C.navy, lineHeight: 1.6,
          }}>
            "To give Buenos Aires schools consistent, local, and affordable access to a rigorous conference — and to build it as an institution that outlasts its founders."
            <footer style={{ fontFamily: F.body, fontSize: '0.63rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: C.muted, marginTop: '0.7rem', fontStyle: 'normal' }}>
              — Founding Mission
            </footer>
          </motion.blockquote>
        </Reveal>

        <Reveal>
          <motion.div variants={fadeUp} style={{ background: C.navy, padding: '2.5rem', marginBottom: '1.25rem' }}>
            <p style={{ fontFamily: F.body, fontSize: '0.57rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: C.goldLight, marginBottom: '1.75rem', fontWeight: 600 }}>
              Founding Objectives
            </p>
            {[
              { t: 'Rigour',     d: 'A well-chaired conference worth returning to — ≥85% of faculty advisors rate the overall experience ≥7/10.' },
              { t: 'Access',     d: 'At least one third of attending schools have no standing MUN programme, widening the regional circuit.' },
              { t: 'Continuity', d: 'Full documentation archive; asociación civil constituted 2026; structured handover to future Secretariats.' },
              { t: 'Integrity',  d: 'Balanced budget with contingency intact; clean post-conference financial report shared with administration.' },
            ].map(({ t, d }, i) => (
              <div key={t} style={{ paddingBottom: i < 3 ? '1.5rem' : 0, marginBottom: i < 3 ? '1.5rem' : 0, borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <p style={{ fontFamily: F.display, fontSize: '1.05rem', fontWeight: 600, color: C.white, marginBottom: '0.3rem' }}>{t}</p>
                <p style={{ fontFamily: F.body, fontSize: '0.77rem', color: 'rgba(255,255,255,0.43)', lineHeight: 1.65 }}>{d}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-2" style={{ background: C.white, border: `1px solid ${C.border}` }}>
            {[
              { l: 'Date',     v: '15–18 Oct 2026' },
              { l: 'Location', v: 'Vicente López, BA' },
              { l: 'Format',   v: '4 Conference Days' },
              { l: 'Scale',    v: 'Up to 300 Delegates' },
            ].map(({ l, v }, i) => (
              <div key={l} style={{
                padding: '1.4rem 1.75rem',
                borderRight: i % 2 === 0 ? `1px solid ${C.border}` : 'none',
                borderBottom: i < 2 ? `1px solid ${C.border}` : 'none',
              }}>
                <p style={{ fontFamily: F.body, fontSize: '0.57rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.muted, marginBottom: '0.4rem' }}>{l}</p>
                <p style={{ fontFamily: F.display, fontSize: '1.2rem', fontWeight: 600, color: C.navy }}>{v}</p>
              </div>
            ))}
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Committees ─────────────────────────────────────────────────────────── */
const COMMITTEES = [
  { abbr: 'UNSC',  name: 'Security Council',           lang: 'en', seats: 15, type: 'parliamentary', note: 'Advanced' },
  { abbr: 'GA',    name: 'General Assembly',            lang: 'en', seats: 50, type: 'parliamentary', note: 'Beginner · Large' },
  { abbr: 'ECOSOC',name: 'ECOSOC',                      lang: 'en', seats: 20, type: 'parliamentary', note: 'Intermediate' },
  { abbr: 'UNHRC', name: 'Human Rights Council',        lang: 'en', seats: 20, type: 'parliamentary', note: 'Intermediate' },
  { abbr: 'PC',    name: 'Political Committee',         lang: 'en', seats: 20, type: 'parliamentary', note: 'Intermediate' },
  { abbr: 'ICJ',   name: "Int'l Court of Justice",      lang: 'en', seats: 15, type: 'court',         note: 'Advanced' },
  { abbr: 'ICC',   name: "Int'l Criminal Court",        lang: 'en', seats: 30, type: 'court',         note: 'Advanced' },
  { abbr: 'HICC',  name: 'Historical ICC',              lang: 'en', seats: 30, type: 'court',         note: 'Advanced · Historical' },
  { abbr: 'HG',    name: 'The Hunger Games',            lang: 'en', seats: 15, type: 'crisis',        note: 'Advanced · Crisis' },
  { abbr: 'CS',    name: 'Consejo de Seguridad',        lang: 'es', seats: 15, type: 'parliamentary', note: 'Avanzado' },
  { abbr: 'ECOS',  name: 'ECOSOC en Español',           lang: 'es', seats: 20, type: 'parliamentary', note: 'Intermedio' },
  { abbr: 'CP',    name: 'Comité Político',             lang: 'es', seats: 20, type: 'parliamentary', note: 'Intermedio' },
  { abbr: 'CDH',   name: 'Consejo de Derechos Humanos', lang: 'es', seats: 20, type: 'parliamentary', note: 'Intermedio' },
]

const TYPE_TAG = {
  parliamentary: { label: 'Parliamentary',   bg: 'rgba(24,35,67,0.07)',   fg: '#1B2F5E' },
  court:         { label: 'Court Procedure', bg: 'rgba(110,15,35,0.07)',  fg: '#6B1120' },
  crisis:        { label: 'Crisis',          bg: 'rgba(170,110,0,0.09)',  fg: '#7A5200' },
}

function Committees() {
  const [lang, setLang] = useState('all')
  const filtered = lang === 'all' ? COMMITTEES : COMMITTEES.filter(c => c.lang === lang)

  return (
    <section id="committees" style={{ background: C.white, padding: '7rem 2.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <Label>Edition I · October 2026</Label>
          <Rule />
          <div className="flex flex-col md:flex-row md:items-end" style={{ justifyContent: 'space-between', gap: '2rem', marginBottom: '3rem' }}>
            <motion.h2 variants={fadeUp} style={{
              fontFamily: F.display, fontWeight: 600, color: C.text,
              fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', lineHeight: 1.08, letterSpacing: '-0.02em',
            }}>
              13 Committees.<br />Two Languages.
            </motion.h2>

            <motion.div variants={fadeUp} style={{ display: 'flex', border: `1px solid ${C.border}` }}>
              {[
                { key: 'all', label: 'All · 13' },
                { key: 'en',  label: 'English · 9' },
                { key: 'es',  label: 'Español · 4' },
              ].map(({ key, label }, i) => (
                <button key={key} onClick={() => setLang(key)} style={{
                  fontFamily: F.body, fontSize: '0.64rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '0.65rem 1.2rem', border: 'none', cursor: 'pointer',
                  borderRight: i < 2 ? `1px solid ${C.border}` : 'none',
                  background: lang === key ? C.navy : 'transparent',
                  color: lang === key ? C.white : C.muted,
                  fontWeight: lang === key ? 600 : 400,
                  transition: 'background 0.18s, color 0.18s',
                }}>
                  {label}
                </button>
              ))}
            </motion.div>
          </div>
        </Reveal>

        <motion.div layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: '1px', background: C.border }}
        >
          <AnimatePresence>
            {filtered.map((c, i) => {
              const tag = TYPE_TAG[c.type]
              const cols = 3
              const orphans = filtered.length % cols
              const isOrphan = orphans > 0 && i >= filtered.length - orphans
              const orphanStyle = isOrphan && orphans === 1 ? { gridColumnStart: 2 } : {}
              return (
                <motion.div key={c.abbr} layout
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  style={{ background: C.white, padding: '1.75rem 2rem', transition: 'background 0.18s', ...orphanStyle }}
                  onMouseEnter={e => (e.currentTarget.style.background = C.offWhite)}
                  onMouseLeave={e => (e.currentTarget.style.background = C.white)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <span style={{ fontFamily: F.body, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.gold, fontWeight: 700 }}>
                      {c.abbr}
                    </span>
                    <span style={{ fontFamily: F.body, fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.22rem 0.55rem', background: tag.bg, color: tag.fg, fontWeight: 600 }}>
                      {tag.label}
                    </span>
                  </div>

                  <h3 style={{ fontFamily: F.display, fontSize: '1.2rem', fontWeight: 600, color: C.navy, lineHeight: 1.25, marginBottom: '0.9rem' }}>
                    {c.name}
                  </h3>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.9rem', borderTop: `1px solid ${C.border}` }}>
                    <span style={{ fontFamily: F.body, fontSize: '0.71rem', color: C.muted }}>{c.note}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <span style={{
                        fontFamily: F.body, fontSize: '0.58rem', letterSpacing: '0.08em', padding: '0.2rem 0.5rem', fontWeight: 600,
                        background: c.lang === 'es' ? 'rgba(150,20,40,0.07)' : 'rgba(24,35,100,0.07)',
                        color: c.lang === 'es' ? '#7B1225' : '#1B2F5E',
                      }}>
                        {c.lang === 'es' ? 'Español' : 'English'}
                      </span>
                      <span style={{ fontFamily: F.body, fontSize: '0.71rem', color: C.muted }}>{c.seats}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Schedule ───────────────────────────────────────────────────────────── */
const DAYS = [
  {
    day: 'Day 1', date: 'Thursday, 15 Oct', label: 'Opening Evening',
    sessions: [
      { time: '13:00 – 16:00', activity: 'Setup · Dais arrival' },
      { time: '16:00 – 17:00', activity: 'Registration of arriving delegations' },
      { time: '17:00 – 18:00', activity: 'Opening Ceremony — Auditorium' },
      { time: '18:00 – 19:30', activity: 'Committee Session I' },
      { time: '19:30',         activity: 'Day close' },
    ],
  },
  {
    day: 'Day 2', date: 'Friday, 16 Oct', label: 'First Substantive Day',
    sessions: [
      { time: '08:30 – 09:15', activity: 'Dais briefing · Morning refreshments' },
      { time: '09:15 – 11:30', activity: 'Committee Session II' },
      { time: '11:45 – 13:30', activity: 'Committee Session III' },
      { time: '13:30 – 14:45', activity: 'Lunch' },
      { time: '14:45 – 17:15', activity: 'Committee Session IV' },
      { time: '17:30 – 18:15', activity: 'Committee Session V' },
      { time: '18:15',         activity: 'Day close' },
    ],
  },
  {
    day: 'Day 3', date: 'Saturday, 17 Oct', label: 'Second Substantive Day',
    sessions: [
      { time: '08:30 – 09:15', activity: 'Dais briefing · Morning refreshments' },
      { time: '09:15 – 11:30', activity: 'Committee Session VI' },
      { time: '11:45 – 13:30', activity: 'Committee Session VII' },
      { time: '13:30 – 14:45', activity: 'Lunch' },
      { time: '14:45 – 17:15', activity: 'Committee Session VIII' },
      { time: '17:30 – 18:15', activity: 'Committee Session IX' },
      { time: '18:15',         activity: 'Day close' },
    ],
  },
  {
    day: 'Day 4', date: 'Sunday, 18 Oct', label: 'Voting & Closing',
    sessions: [
      { time: '09:00 – 11:00', activity: 'Committee Session X' },
      { time: '11:30 – 12:45', activity: 'Final Committee Session' },
      { time: '12:45 – 14:00', activity: 'Lunch' },
      { time: '14:00 – 15:30', activity: 'Closing Ceremony with Awards' },
      { time: '15:30 – 16:15', activity: 'Group photographs · Informal close' },
      { time: '16:15 – 19:30', activity: 'Asado and Social Time' },
    ],
  },
]

function Schedule() {
  const [day, setDay] = useState(0)

  return (
    <section id="schedule" style={{ background: C.navyDark, padding: '7rem 2.5rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <Reveal>
          <Label light>15 – 18 October 2026</Label>
          <Rule light />
          <motion.h2 variants={fadeUp} style={{
            fontFamily: F.display, fontWeight: 600, color: C.white,
            fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: '3rem',
          }}>
            Conference Schedule
          </motion.h2>

          <motion.div variants={fadeUp} style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '2.75rem', overflowX: 'auto' }}>
            {DAYS.map(({ day: d, label }, i) => (
              <button key={d} onClick={() => setDay(i)} style={{
                fontFamily: F.body, fontSize: '0.63rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '0.85rem 1.4rem', background: 'none', border: 'none',
                borderBottom: day === i ? `2px solid ${C.goldLight}` : '2px solid transparent',
                color: day === i ? C.goldLight : 'rgba(255,255,255,0.35)',
                cursor: 'pointer', fontWeight: day === i ? 600 : 400,
                transition: 'color 0.2s', whiteSpace: 'nowrap', marginBottom: -1,
              }}>
                {d} · {label}
              </button>
            ))}
          </motion.div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div key={day}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.26 }}
          >
            <p style={{ fontFamily: F.body, fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.26)', marginBottom: '1.5rem' }}>
              {DAYS[day].date}
            </p>
            {DAYS[day].sessions.map(({ time, activity }, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                style={{
                  display: 'grid', gridTemplateColumns: '144px 1fr', gap: '1.75rem', alignItems: 'center',
                  padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                <span style={{ fontFamily: F.body, fontSize: '0.73rem', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.02em' }}>{time}</span>
                <span style={{ fontFamily: F.body, fontSize: '0.87rem', color: 'rgba(255,255,255,0.72)' }}>{activity}</span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

/* ─── Registration ───────────────────────────────────────────────────────── */
function Registration() {
  return (
    <section id="registration" style={{ background: C.navy, padding: '7rem 2.5rem' }}>
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ maxWidth: 1100, margin: '0 auto', gap: '5rem', alignItems: 'start' }}>

        <Reveal>
          <Label light>Registration · Edition I</Label>
          <Rule light />
          <motion.h2 variants={fadeUp} style={{
            fontFamily: F.display, fontWeight: 600, color: C.white,
            fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: '1.5rem',
          }}>
            Join the<br />Founding Edition
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontFamily: F.body, fontSize: '0.93rem', lineHeight: 1.85, color: 'rgba(255,255,255,0.52)', marginBottom: '1.5rem' }}>
            Registration follows a deliberate two-step sequence. Schools first submit a non-binding Expression of Interest — this lets us confirm the date works across school calendars and gauge real demand before anything is published. The formal registration form follows once fees and committees are locked.
          </motion.p>
          <motion.p variants={fadeUp} style={{ fontFamily: F.body, fontSize: '0.8rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.3)' }}>
            Open to secondary-school delegations from Buenos Aires Province and the broader region. At least one third of seats are reserved for schools without a standing MUN programme.
          </motion.p>
        </Reveal>

        <Reveal>
          <motion.div variants={fadeUp} style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '2.25rem 2.5rem' }}>
            <div style={{ marginBottom: '2.25rem' }}>
              {[
                { n: '01', t: 'Expression of Interest', d: 'Non-binding. Indicate your school, estimated delegation size, and committee language preferences. Sent before fees or topics are published.' },
                { n: '02', t: 'Binding Registration',   d: 'Opens once dates, fee, and committees are confirmed. Captures delegation specifics, Code of Conduct acknowledgement, and payment.' },
                { n: '03', t: 'Confirmation Packet',    d: 'Receive committee assignments, background guides 8 weeks prior, and pre-conference briefing materials for faculty advisors.' },
              ].map(({ n, t, d }, i) => (
                <div key={n} style={{
                  display: 'flex', gap: '1.25rem',
                  paddingBottom: i < 2 ? '1.75rem' : 0, marginBottom: i < 2 ? '1.75rem' : 0,
                  borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}>
                  <span style={{ fontFamily: F.display, fontSize: '1.3rem', fontWeight: 600, color: 'rgba(253,183,30,0.45)', lineHeight: 1, minWidth: 28 }}>{n}</span>
                  <div>
                    <p style={{ fontFamily: F.body, fontWeight: 600, fontSize: '0.81rem', color: C.white, marginBottom: '0.4rem' }}>{t}</p>
                    <p style={{ fontFamily: F.body, fontSize: '0.75rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.38)' }}>{d}</p>
                  </div>
                </div>
              ))}
            </div>
            <a
              href="mailto:munleadership@lincoln.edu.ar?subject=LINCOLNMUN I — Expression of Interest"
              style={{
                display: 'block', textAlign: 'center',
                fontFamily: F.body, fontSize: '0.67rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase',
                background: C.goldLight, color: C.navy, padding: '1.1rem 2rem',
                textDecoration: 'none', transition: 'background 0.18s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#e8a800')}
              onMouseLeave={e => (e.currentTarget.style.background = C.goldLight)}
            >
              Submit Expression of Interest
            </a>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Contact ────────────────────────────────────────────────────────────── */
function Contact() {
  return (
    <section id="contact" style={{ background: C.navyMid, padding: '5rem 2.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ maxWidth: 1100, margin: '0 auto', gap: '3.5rem' }}>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.2rem' }}>
              <img src="/logo.jpg" alt="Lincoln" style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', opacity: 0.78 }} />
              <span style={{ fontFamily: F.display, fontSize: '1rem', fontWeight: 600, color: C.white, letterSpacing: '0.06em' }}>LINCOLNMUN</span>
            </div>
            <p style={{ fontFamily: F.body, fontSize: '0.79rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.33)' }}>
              The founding Model United Nations conference of Asociación Escuelas Lincoln. Vicente López, Buenos Aires Province, Argentina.
            </p>
          </div>

          <div>
            <p style={{ fontFamily: F.body, fontSize: '0.57rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: C.goldLight, marginBottom: '1.2rem', fontWeight: 600 }}>
              Quick Links
            </p>
            {['About', 'Committees', 'Schedule', 'Registration'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} style={{
                display: 'block', fontFamily: F.body, fontSize: '0.79rem',
                color: 'rgba(255,255,255,0.38)', textDecoration: 'none', marginBottom: '0.55rem', transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = C.white)}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.38)')}
              >
                {link}
              </a>
            ))}
          </div>

          <div>
            <p style={{ fontFamily: F.body, fontSize: '0.57rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: C.goldLight, marginBottom: '1.2rem', fontWeight: 600 }}>
              Contact
            </p>
            <p style={{ fontFamily: F.body, fontSize: '0.79rem', color: 'rgba(255,255,255,0.32)', marginBottom: '0.5rem' }}>Founding Secretariat</p>
            <a href="mailto:munleadership@lincoln.edu.ar" style={{
              fontFamily: F.body, fontSize: '0.79rem', color: 'rgba(255,255,255,0.58)',
              textDecoration: 'none', display: 'block', marginBottom: '1rem', transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = C.white)}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.58)')}
            >
              munleadership@lincoln.edu.ar
            </a>
            <p style={{ fontFamily: F.body, fontSize: '0.75rem', color: 'rgba(255,255,255,0.24)', lineHeight: 1.75 }}>
              Asociación Escuelas Lincoln<br />Vicente López, Buenos Aires<br />Argentina
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

/* ─── Footer ─────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: C.navyDark, borderTop: '1px solid rgba(255,255,255,0.04)', padding: '1.4rem 2.75rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <p style={{ fontFamily: F.body, fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.05em' }}>
          © 2026 Asociación Escuelas Lincoln · LINCOLNMUN I
        </p>
        <p style={{ fontFamily: F.body, fontSize: '0.65rem', color: 'rgba(255,255,255,0.16)', letterSpacing: '0.05em' }}>
          Vicente López · Buenos Aires Province · Argentina
        </p>
      </div>
    </footer>
  )
}

/* ─── App ────────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsStrip />
      <About />
      <Committees />
      <Schedule />
      <Registration />
      <Contact />
      <Footer />
    </>
  )
}
