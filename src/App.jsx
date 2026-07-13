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
        height: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2.75rem',
        background: solid ? C.navy : 'transparent',
        borderBottom: solid ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'background 0.4s ease, border-color 0.4s ease',
      }}
    >
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none' }}>
        <img src="/logo.png" alt="Escuelas Lincoln" style={{
          width: 100, height: 100, borderRadius: '50%', objectFit: 'cover',
        }} />
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
  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/campus.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', transform: 'scale(1.05)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(24,35,67,0.62)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.35), transparent, rgba(0,0,0,0.55))' }} />

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: C.white, padding: '0 1rem', width: '100%', maxWidth: 1280, margin: '2.5rem auto 0' }}>

        <motion.h1
          initial={{ opacity: 0, y: 38 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7, ease: 'easeOut' }}
          style={{ fontFamily: F.display, fontWeight: 700, fontSize: 'clamp(3.5rem, 8vw, 11rem)', lineHeight: 1, letterSpacing: '-0.01em', textShadow: '0 6px 40px rgba(0,0,0,0.55)' }}
        >
          LINCOLNMUN
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 1.15 }}
          style={{ fontFamily: F.display, fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', fontStyle: 'italic', marginBottom: '0.25rem' }}
        >
          Asociación Escuelas Lincoln
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.28 }}
          style={{ fontFamily: F.display, fontSize: 'clamp(0.875rem, 1.5vw, 1rem)', color: 'rgba(255,255,255,0.7)', marginBottom: '0.25rem' }}
        >
          October 2nd – October 4th 2026 · Vicente López, Buenos Aires
        </motion.p>

        <motion.a
          href="#registration"
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.45 }}
          style={{
            display: 'inline-block', marginTop: '0.25rem',
            fontFamily: F.body, fontSize: '0.72rem', fontWeight: 600,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            background: C.goldLight, color: C.navy,
            padding: '0.9rem 2.4rem', borderRadius: 2, textDecoration: 'none',
            boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
            transition: 'background 0.2s, transform 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#e8a800'; e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.background = C.goldLight; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          Register
        </motion.a>

      </div>
    </section>
  )
}

/* ─── Stats strip ────────────────────────────────────────────────────────── */
function StatsStrip() {
  const items = [
    { v: '13', l: 'Committees' },
    { v: '300', l: 'Delegate Seats' },
    { v: '26',  l: 'Chairs' },
    { v: '3',   l: 'Conference Days' },
    { v: '2',   l: 'Languages' },
  ]
  return (
    <div style={{ background: C.navy, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="grid grid-cols-3 md:grid-cols-5" style={{ maxWidth: 1100, margin: '0 auto' }}>
        {items.map(({ v, l }, i) => (
          <div key={l} style={{
            padding: '5rem 0.75rem', textAlign: 'center',
            borderRight: i < 4 ? '1px solid rgba(255,255,255,0.05)' : 'none',
          }}>
            <div style={{ fontFamily: F.display, fontSize: '2.8rem', fontWeight: 600, color: C.goldLight, lineHeight: 1 }}>{v}</div>
            <div style={{ fontFamily: F.body, fontSize: '0.85rem', letterSpacing: '0.17em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.33)', marginTop: 6 }}>{l}</div>
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

          <motion.h2 variants={fadeUp} style={{
            fontFamily: F.display, fontWeight: 600, color: C.text,
            fontSize: 'clamp(2.4rem, 4vw, 3.75rem)', lineHeight: 1.08,
            letterSpacing: '-0.02em', marginBottom: '2rem',
          }}>
            What is<br />LincolnMUN?
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontFamily: F.body, fontSize: '0.95rem', lineHeight: 1.85, color: '#334155', marginBottom: '1.35rem' }}>
            LINCOLNMUN is a three-day Model UN conference founded for secondary school students by secondary school students in the Buenos Aires region. Delegates step into the roles of UN representatives, historical figures, and influential persons to address key global challenges while building skills in leadership and public speaking.          </motion.p>
          <motion.p variants={fadeUp} style={{ fontFamily: F.body, fontSize: '0.95rem', lineHeight: 1.85, color: '#334155', marginBottom: '2.25rem' }}>
            From the opening ceremony to the closing asado, every element of the conference is run by students. Beyond delegating, students may apply to chair across any of our thirteen committees, presenting a unique opportunity for students to assume leadership roles before committee sessions begin.
          </motion.p>
          <motion.p variants={fadeUp} style={{ fontFamily: F.body, fontSize: '0.95rem', lineHeight: 1.85, color: '#334155', marginBottom: '2.25rem' }}>
            LINCOLNMUN welcomes experienced and first-time delegations alike, matching delegates to roles that meet each school where they are. Bilingual by design, two-thirds of our committees run in English and one-third in Spanish, making LINCOLNMUN the most balanced bilingual Model UN conference in Argentina.          </motion.p>
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

          
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Committees ─────────────────────────────────────────────────────────── */
const COMMITTEES = [
  { abbr: 'UNSC',  name: 'Security Council',           lang: 'en', seats: 15, type: 'parliamentary', note: 'Advanced',          room: '4th Floor · Room TBC', chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC' },
  { abbr: 'GA',    name: 'General Assembly',            lang: 'en', seats: 50, type: 'parliamentary', note: 'Beginner · Large',   room: 'Auditorium',           chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC' },
  { abbr: 'ECOSOC',name: 'ECOSOC',                      lang: 'en', seats: 20, type: 'parliamentary', note: 'Intermediate',       room: '4th Floor · Room TBC', chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC' },
  { abbr: 'UNHRC', name: 'Human Rights Council',        lang: 'en', seats: 20, type: 'parliamentary', note: 'Intermediate',       room: '4th Floor · Room TBC', chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC' },
  { abbr: 'PC',    name: 'Political Committee',         lang: 'en', seats: 20, type: 'parliamentary', note: 'Intermediate',       room: '4th Floor · Room TBC', chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC' },
  { abbr: 'ICJ',   name: "Int'l Court of Justice",      lang: 'en', seats: 15, type: 'court',         note: 'Advanced',          room: '4th Floor · Room TBC', chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC' },
  { abbr: 'ICC',   name: "Int'l Criminal Court",        lang: 'en', seats: 30, type: 'court',         note: 'Advanced',          room: 'Library',              chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC' },
  { abbr: 'HICC',  name: 'Historical ICC',              lang: 'en', seats: 30, type: 'court',         note: 'Advanced · Historical', room: 'Aula Magna',        chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC' },
  { abbr: 'HG',    name: 'The Hunger Games',            lang: 'en', seats: 15, type: 'crisis',        note: 'Advanced · Crisis', room: '4th Floor · Room TBC', chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC' },
  { abbr: 'CS',    name: 'Consejo de Seguridad',        lang: 'es', seats: 15, type: 'parliamentary', note: 'Avanzado',          room: '5th Floor · Room TBC', chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC' },
  { abbr: 'ECOS',  name: 'ECOSOC en Español',           lang: 'es', seats: 20, type: 'parliamentary', note: 'Intermedio',        room: '5th Floor · Room TBC', chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC' },
  { abbr: 'CP',    name: 'Comité Político',             lang: 'es', seats: 20, type: 'parliamentary', note: 'Intermedio',        room: '5th Floor · Room TBC', chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC' },
  { abbr: 'CDH',   name: 'Consejo de Derechos Humanos', lang: 'es', seats: 20, type: 'parliamentary', note: 'Intermedio',        room: '5th Floor · Room TBC', chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC' },
]

const TYPE_TAG = {
  parliamentary: { label: 'Parliamentary',   bg: 'rgba(24,35,67,0.07)',   fg: '#1B2F5E' },
  court:         { label: 'Court Procedure', bg: 'rgba(110,15,35,0.07)',  fg: '#6B1120' },
  crisis:        { label: 'Crisis',          bg: 'rgba(170,110,0,0.09)',  fg: '#7A5200' },
}

function CommitteeCard({ c, isExpanded, onToggle }) {
  const tag = TYPE_TAG[c.type]
  const isTBC = v => v === 'TBC'

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onToggle}
      style={{
        background: C.white, padding: '1.75rem 2rem', cursor: 'pointer',
        transition: 'background 0.18s',
        outline: isExpanded ? `1.5px solid ${C.gold}` : 'none',
        outlineOffset: -1,
      }}
      onMouseEnter={e => { if (!isExpanded) e.currentTarget.style.background = C.offWhite }}
      onMouseLeave={e => { if (!isExpanded) e.currentTarget.style.background = C.white }}
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

      {/* Chevron */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.85rem' }}>
        <motion.svg
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          width="14" height="14" fill="none"
          stroke={isExpanded ? C.gold : C.muted}
          strokeWidth="1.8" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </motion.svg>
      </div>

      {/* Expandable details */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingTop: '1.25rem', marginTop: '1rem', borderTop: `1px solid ${C.border}` }}>

              {/* Room & Seats */}
              <div className="grid grid-cols-2" style={{ gap: '0.6rem', marginBottom: '0.85rem' }}>
                {[
                  { label: 'Room', value: c.room },
                  { label: 'Seats', value: `${c.seats} delegates` },
                ].map(({ label, value }) => (
                  <div key={label} style={{ background: C.offWhite, padding: '0.7rem 0.9rem' }}>
                    <p style={{ fontFamily: F.body, fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted, marginBottom: '0.25rem' }}>{label}</p>
                    <p style={{ fontFamily: F.body, fontSize: '0.78rem', fontWeight: 600, color: C.navy }}>{value}</p>
                  </div>
                ))}
              </div>

              {/* Chairs & Contact */}
              <div style={{ padding: '0.8rem 0.9rem', border: `1px solid ${C.border}`, marginBottom: '0.85rem' }}>
                {[
                  { label: 'Chairs', value: c.chairs },
                  { label: 'Chair Contact', value: c.contact },
                ].map(({ label, value }, i) => (
                  <div key={label} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    paddingBottom: i === 0 ? '0.55rem' : 0, marginBottom: i === 0 ? '0.55rem' : 0,
                    borderBottom: i === 0 ? `1px solid ${C.border}` : 'none',
                  }}>
                    <p style={{ fontFamily: F.body, fontSize: '0.5rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: C.muted }}>{label}</p>
                    <p style={{ fontFamily: F.body, fontSize: '0.75rem', color: isTBC(value) ? C.muted : C.navy, fontStyle: isTBC(value) ? 'italic' : 'normal' }}>{value}</p>
                  </div>
                ))}
              </div>

              {/* Topics */}
              <div>
                <p style={{ fontFamily: F.body, fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted, marginBottom: '0.5rem' }}>Topics</p>
                {[{ n: 'I', v: c.topic1 }, { n: 'II', v: c.topic2 }].map(({ n, v }) => (
                  <div key={n} style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                    <span style={{ fontFamily: F.display, fontSize: '0.85rem', color: C.gold, fontWeight: 600, minWidth: 18, lineHeight: 1.5 }}>{n}</span>
                    <span style={{ fontFamily: F.body, fontSize: '0.78rem', color: isTBC(v) ? C.muted : C.text, fontStyle: isTBC(v) ? 'italic' : 'normal', lineHeight: 1.55 }}>{v}</span>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function Committees() {
  const [lang, setLang] = useState('all')
  const [expanded, setExpanded] = useState(null)
  const filtered = lang === 'all' ? COMMITTEES : COMMITTEES.filter(c => c.lang === lang)

  const handleLangChange = (key) => { setLang(key); setExpanded(null) }
  const handleToggle = (abbr) => setExpanded(prev => prev === abbr ? null : abbr)

  return (
    <section id="committees" style={{ background: C.white, padding: '7rem 2.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <Label>Edition I · October 2026</Label>
          <Rule />
          <div className="flex flex-col md:flex-row md:items-end" style={{ justifyContent: 'space-between', gap: '2rem', marginBottom: '1.5rem' }}>
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
                <button key={key} onClick={() => handleLangChange(key)} style={{
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
          <motion.p variants={fadeUp} style={{ fontFamily: F.body, fontSize: '0.72rem', color: C.muted, marginBottom: '2.5rem' }}>
            Click any card to view room, chairs, topics, and contact details.
          </motion.p>
        </Reveal>

        <motion.div layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: '1px', background: C.border }}
        >
          <AnimatePresence>
            {filtered.map((c, i) => {
              const cols = 3
              const orphans = filtered.length % cols
              const isOrphan = orphans > 0 && i >= filtered.length - orphans
              const orphanStyle = isOrphan && orphans === 1 ? { gridColumnStart: 2 } : {}
              return (
                <div key={c.abbr} style={orphanStyle}>
                  <CommitteeCard
                    c={c}
                    isExpanded={expanded === c.abbr}
                    onToggle={() => handleToggle(c.abbr)}
                  />
                </div>
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
    day: 'Day 1', date: 'Friday, 2 October', label: 'Opening Evening',
    sessions: [
      { time: '13:00 – 16:00', activity: 'Setup · Secretariat, Head of Logistics & Tech on site. Rooms dressed; registration prepared.' },
      { time: '16:00',         activity: 'Doors open · Arriving delegations begin registration' },
      { time: '16:30 – 17:30', activity: 'Opening Ceremony — Auditorium' },
      { time: '17:30 – 19:00', activity: 'Committee Session 1' },
      { time: '19:00',         activity: 'Day 1 close · Dais and Secretariat debrief' },
    ],
  },
  {
    day: 'Day 2', date: 'Saturday, 3 October', label: 'Full Day',
    sessions: [
      { time: '08:30',         activity: 'Doors open · Refreshments' },
      { time: '09:00 – 11:30', activity: 'Committee Session 2' },
      { time: '11:30 – 11:45', activity: 'Break' },
      { time: '11:45 – 13:00', activity: 'Committee Session 3' },
      { time: '13:00 – 14:30', activity: 'Lunch (1.5 hours)' },
      { time: '14:30 – 17:00', activity: 'Committee Session 4' },
      { time: '17:00 – 17:15', activity: 'Break' },
      { time: '17:15 – 19:00', activity: 'Committee Session 5' },
      { time: '19:00',         activity: 'Day 2 close' },
    ],
  },
  {
    day: 'Day 3', date: 'Sunday, 4 October', label: 'Voting & Closing',
    sessions: [
      { time: '08:30',         activity: 'Doors open · Refreshments' },
      { time: '09:00 – 11:30', activity: 'Committee Session 6' },
      { time: '11:30 – 11:45', activity: 'Break · Gather information for awards' },
      { time: '11:45 – 13:00', activity: 'Committee Session 7' },
      { time: '13:00 – 14:30', activity: 'Lunch · Dais begins awards deliberation' },
      { time: '14:30 – 15:30', activity: 'Committee Session 8' },
      { time: '15:30 – 17:00', activity: 'Closing Ceremony — awards, recognitions, thanks' },
      { time: '17:00 – 19:00', activity: 'Asado & social — food, snacks, games ("stay as long as you can")' },
      { time: '19:00',         activity: 'Conference concludes · Teardown' },
    ],
  },
]

function Schedule() {
  const [day, setDay] = useState(0)

  return (
    <section id="schedule" style={{ background: C.navyDark, padding: '7rem 2.5rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <Reveal>
          <Label light>2 – 4 October 2026</Label>
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
              <img src="/logo.png" alt="Lincoln" style={{ width: 70, height: 70, borderRadius: '50%', objectFit: 'cover', opacity: 0.78 }} />
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
