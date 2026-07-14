import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect, createContext, useContext } from 'react'

/* ─── i18n ───────────────────────────────────────────────────────────────── */
const LangCtx = createContext({ lang: 'en', setLang: () => {} })
const useLang = () => useContext(LangCtx)
const useT   = () => { const { lang } = useLang(); return T[lang] }

const T = {
  en: {
    nav: [
      { label: 'About',      href: '#about' },
      { label: 'Committees', href: '#committees' },
      { label: 'Schedule',   href: '#schedule' },
      { label: 'Letter',     href: '#letter' },
    ],
    hero: { date: 'October 2nd – October 4th 2026 · Vicente López, Buenos Aires' },
    stats: ['Committees', 'Delegate Seats', 'Chairs', 'Conference Days', 'Languages'],
    about: {
      heading: ['What is', 'LINCOLNMUN?'],
      p1: 'LINCOLNMUN is a three-day Model UN conference founded for secondary school students by secondary school students in the Buenos Aires region. Delegates step into the roles of UN representatives, historical figures, and influential persons to address key global challenges while building skills in leadership and public speaking.',
      p2: 'From the opening ceremony to the closing asado, every element of the conference is run by students. Beyond delegating, students may apply to chair across any of our thirteen committees, presenting a unique opportunity for students to assume leadership roles before committee sessions begin.',
      p3: 'LINCOLNMUN welcomes experienced and first-time delegations alike, matching delegates to roles that meet each school where they are. Bilingual by design, two-thirds of our committees run in English and one-third in Spanish, making LINCOLNMUN the most balanced bilingual Model UN conference in Argentina.',
      tagline: 'For students, by students.',
      stat1: 'English Conferences',
      stat2: 'Open to All',
    },
    committees: {
      heading: 'Committees',
      filters: [{ key: 'en', label: 'English' }, { key: 'es', label: 'Spanish' }],
      hint: 'Click any card to view room, chairs, topics, and contact details.',
      types: { parliamentary: 'Parliamentary', court: 'Court Procedure', crisis: 'Crisis' },
      modal: { room: 'Room', seats: 'delegates', language: 'Language', level: 'Level', chairs: 'Chairs', contact: 'Chair Contact', topics: 'Topics' },
      notes: { 'Advanced': 'Advanced', 'Intermediate': 'Intermediate', 'Beginner': 'Beginner', 'Beginner · Large': 'Beginner · Large', 'Advanced · Historical': 'Advanced · Historical', 'Advanced · Crisis': 'Advanced · Crisis', 'Avanzado': 'Advanced', 'Intermedio': 'Intermediate' },
    },
    schedule: {
      heading: 'Conference Schedule',
      days: [
        { day: 'Day 1', date: 'Friday, 2 October', sessions: [
          { time: '4:00 PM',           activity: 'Reception  ·  Lobby' },
          { time: '4:30 PM – 5:30 PM', activity: 'Opening Ceremony  ·  Auditorium' },
          { time: '5:30 PM – 7:00 PM', activity: 'Committee Session 1' },
          { time: '7:00 PM',           activity: 'Dais and Secretariat debrief  ·  Mansion' },
        ]},
        { day: 'Day 2', date: 'Saturday, 3 October', sessions: [
          { time: '08:30',         activity: 'Reception · Lobby' },
          { time: '09:00 – 11:30', activity: 'Committee Session 2' },
          { time: '11:30 – 11:45', activity: 'Break' },
          { time: '11:45 – 13:00', activity: 'Committee Session 3' },
          { time: '13:00 – 14:30', activity: 'Lunch  ·  Gym / Cafeteria / Library' },
          { time: '14:30 – 17:00', activity: 'Committee Session 4' },
          { time: '17:00 – 17:15', activity: 'Break' },
          { time: '17:15 – 19:00', activity: 'Committee Session 5' },
          { time: '19:00',         activity: 'Dais and Secretariat debrief  ·  Mansion' },
        ]},
        { day: 'Day 3', date: 'Sunday, 4 October', sessions: [
          { time: '08:30',         activity: 'Reception · Lobby' },
          { time: '09:00 – 11:30', activity: 'Committee Session 6' },
          { time: '11:30 – 11:45', activity: 'Break' },
          { time: '11:45 – 13:00', activity: 'Committee Session 7' },
          { time: '13:00 – 14:30', activity: 'Lunch  ·  Gym / Cafeteria / Library' },
          { time: '14:30 – 15:30', activity: 'Committee Session 8' },
          { time: '15:30 – 17:00', activity: 'Closing Ceremony  ·  Auditorium' },
          { time: '17:00 – 19:00', activity: 'Asado & Social Lunch  ·  Middle School Field' },
          { time: '19:00',         activity: 'Conference Closure' },
        ]},
      ],
    },
    letter: {
      heading: ['A letter from the', 'Secretaries-General'],
      salutation: 'Honorable Chairs, Esteemed Delegates, and Fellow Guests,',
      body: [
        'Most schools in Buenos Aires don\'t have reliable access to Model UN. Not on a yearly schedule you can actually plan around, not without depending on whichever teacher happens to run one that year. That gap is the entire reason LINCOLNMUN exists.',
        'We split the work roughly down the middle. One of us has spent this year buried in committee topics, procedure, and a 250-page handbook most delegates will only ever skim. The other has spent it calling schools that had never heard of Lincoln\'s conference and asking them to send students anyway, with nothing to point to yet except a plan. Neither job was the easy one.',
        'If the conference feels effortless once you\'re actually in the room, that\'s not an accident. It\'s the two of us spending a year making sure you never have to think about the parts that don\'t work.',
        'What LINCOLNMUN becomes from here, whether the schools that gave us a first chance decide to come back, gets settled in your committee room this October. Not in anything we write here.',
        'See you there.',
      ],
      closing: 'Best regards,',
      titles: ['Founding Secretary-General, LINCOLNMUN', 'Founding Secretary-General, LINCOLNMUN'],
    },
    footer: {
      desc: 'A student-run Model United Nations conference. Asociación Escuelas Lincoln, Buenos Aires.',
      links: 'Quick Links',
      edition: 'Edition I',
      facts: [
        { label: 'Dates',      value: '2 – 4 October 2026' },
        { label: 'Location',   value: 'La Lucila, Buenos Aires' },
        { label: 'Committees', value: '13 · English & Spanish' },
        { label: 'Delegates',  value: 'Up to 300' },
      ],
      connect: 'Connect',
      copyright: 'La Lucila · Buenos Aires Province · Argentina',
    },
  },

  es: {
    nav: [
      { label: 'Sobre Nosotros', href: '#about' },
      { label: 'Comités',        href: '#committees' },
      { label: 'Programa',       href: '#schedule' },
      { label: 'Carta',          href: '#letter' },
    ],
    hero: { date: '2 al 4 de octubre de 2026 · Vicente López, Buenos Aires' },
    stats: ['Comités', 'Lugares para Delegados', 'Presidentes', 'Días de Conferencia', 'Idiomas'],
    about: {
      heading: ['¿Qué es', 'LINCOLNMUN?'],
      p1: 'LINCOLNMUN es una conferencia de Modelo de Naciones Unidas de tres días, fundada por y para estudiantes secundarios de la región de Buenos Aires. Los delegados asumen los roles de representantes de la ONU, figuras históricas y personas influyentes para abordar desafíos globales mientras desarrollan habilidades de liderazgo y oratoria.',
      p2: 'Desde la ceremonia de apertura hasta el asado de cierre, cada elemento de la conferencia está a cargo de estudiantes. Además de delegar, los estudiantes pueden postularse para presidir alguno de nuestros trece comités, una oportunidad única de asumir roles de liderazgo antes de que comiencen las sesiones.',
      p3: 'LINCOLNMUN da la bienvenida tanto a delegaciones con experiencia como a las que participan por primera vez, asignando a los delegados roles acordes al nivel de cada escuela. Bilingüe por diseño, dos tercios de nuestros comités se desarrollan en inglés y un tercio en español, lo que hace de LINCOLNMUN la conferencia de MUN bilingüe más equilibrada de Argentina.',
      tagline: 'De estudiantes, para estudiantes.',
      stat1: 'Conferencias en Inglés',
      stat2: 'Abierto a Todos',
    },
    committees: {
      heading: 'Comités',
      filters: [{ key: 'en', label: 'Inglés' }, { key: 'es', label: 'Español' }],
      hint: 'Hacé clic en cualquier tarjeta para ver la sala, los presidentes, los temas y los datos de contacto.',
      types: { parliamentary: 'Parlamentario', court: 'Proc. de Corte', crisis: 'Crisis' },
      modal: { room: 'Sala', seats: 'delegados', language: 'Idioma', level: 'Nivel', chairs: 'Presidentes', contact: 'Contacto de Presidentes', topics: 'Temas' },
      notes: { 'Advanced': 'Avanzado', 'Intermediate': 'Intermedio', 'Beginner': 'Principiante', 'Beginner · Large': 'Principiante · Grande', 'Advanced · Historical': 'Avanzado · Histórico', 'Advanced · Crisis': 'Avanzado · Crisis', 'Avanzado': 'Avanzado', 'Intermedio': 'Intermedio' },
    },
    schedule: {
      heading: 'Programa de la Conferencia',
      days: [
        { day: 'Día 1', date: 'Viernes, 2 de octubre', sessions: [
          { time: '4:00 PM',           activity: 'Recepción  ·  Lobby' },
          { time: '4:30 PM – 5:30 PM', activity: 'Ceremonia de Apertura  ·  Auditorio' },
          { time: '5:30 PM – 7:00 PM', activity: 'Sesión de Comité 1' },
          { time: '7:00 PM',           activity: 'Reunión de la Mesa y el Secretariado  ·  Mansión' },
        ]},
        { day: 'Día 2', date: 'Sábado, 3 de octubre', sessions: [
          { time: '08:30',         activity: 'Recepción · Lobby' },
          { time: '09:00 – 11:30', activity: 'Sesión de Comité 2' },
          { time: '11:30 – 11:45', activity: 'Descanso' },
          { time: '11:45 – 13:00', activity: 'Sesión de Comité 3' },
          { time: '13:00 – 14:30', activity: 'Almuerzo  ·  Gimnasio / Cafetería / Biblioteca' },
          { time: '14:30 – 17:00', activity: 'Sesión de Comité 4' },
          { time: '17:00 – 17:15', activity: 'Descanso' },
          { time: '17:15 – 19:00', activity: 'Sesión de Comité 5' },
          { time: '19:00',         activity: 'Reunión de la Mesa y el Secretariado  ·  Mansión' },
        ]},
        { day: 'Día 3', date: 'Domingo, 4 de octubre', sessions: [
          { time: '08:30',         activity: 'Recepción · Lobby' },
          { time: '09:00 – 11:30', activity: 'Sesión de Comité 6' },
          { time: '11:30 – 11:45', activity: 'Descanso' },
          { time: '11:45 – 13:00', activity: 'Sesión de Comité 7' },
          { time: '13:00 – 14:30', activity: 'Almuerzo  ·  Gimnasio / Cafetería / Biblioteca' },
          { time: '14:30 – 15:30', activity: 'Sesión de Comité 8' },
          { time: '15:30 – 17:00', activity: 'Ceremonia de Cierre  ·  Auditorio' },
          { time: '17:00 – 19:00', activity: 'Asado y Almuerzo Social  ·  Campo de Middle School' },
          { time: '19:00',         activity: 'Cierre de la Conferencia' },
        ]},
      ],
    },
    letter: {
      heading: ['Una carta de los', 'Secretarios Generales'],
      salutation: 'Honorables Presidentes, Estimados Delegados y Queridos Invitados,',
      body: [
        'La mayoría de los colegios de Buenos Aires no tienen acceso confiable a Modelo de Naciones Unidas. No con un calendario anual en el que realmente se pueda planificar, no sin depender de cualquier docente que decida organizarlo ese año. Esa brecha es exactamente la razón por la que existe LINCOLNMUN.',
        'Dividimos el trabajo más o menos a la mitad. Uno de nosotros pasó este año inmerso en temas de comité, procedimientos y un manual de 250 páginas que la mayoría de los delegados apenas hojearán. El otro lo pasó llamando a colegios que nunca habían escuchado hablar de la conferencia de Lincoln y pidiéndoles que enviaran estudiantes de todas formas, sin nada concreto que mostrar excepto un plan. Ninguno de los dos tuvo la parte fácil.',
        'Si la conferencia parece sin esfuerzo una vez que estás en la sala, no es casualidad. Es el resultado de que ambos pasamos un año asegurándonos de que nunca tengas que pensar en las partes que no funcionan.',
        'Lo que se convierta LINCOLNMUN a partir de acá, si los colegios que nos dieron una primera oportunidad deciden volver, se define en tu sala de comité este octubre. No en nada de lo que escribamos acá.',
        'Nos vemos ahí.',
      ],
      closing: 'Atentamente,',
      titles: ['Secretario General Fundador, LINCOLNMUN', 'Secretaria General Fundadora, LINCOLNMUN'],
    },
    footer: {
      desc: 'Una conferencia de Modelo de Naciones Unidas dirigida por estudiantes. Asociación Escuelas Lincoln, Buenos Aires.',
      links: 'Enlaces Rápidos',
      edition: 'Edición I',
      facts: [
        { label: 'Fechas',     value: '2 al 4 de octubre de 2026' },
        { label: 'Lugar',      value: 'La Lucila, Buenos Aires' },
        { label: 'Comités',    value: '13 · Inglés y Español' },
        { label: 'Delegados',  value: 'Hasta 300' },
      ],
      connect: 'Contacto',
      copyright: 'La Lucila · Provincia de Buenos Aires · Argentina',
    },
  },
}

const MOBILE_CSS = `
  /* ── Global: horizontal padding scales with viewport ── */
  section {
    padding-left:  clamp(1.1rem, 3.5vw, 2.5rem) !important;
    padding-right: clamp(1.1rem, 3.5vw, 2.5rem) !important;
  }

  /* ── Phone  (< 768px) ── */
  @media (max-width: 767px) {
    :root { --orphan-col: auto; }
    .about-image-col { position: relative !important; height: 380px !important; inset: auto !important; }
    .committee-modal-panel {
      max-width: 100% !important; width: 100% !important;
      max-height: 100dvh !important; height: 100dvh !important;
      padding: 1.5rem 1.25rem 2rem !important;
      border-radius: 0 !important;
    }
    .countdown-unit { padding: 0.7rem 0.9rem !important; }
    .stats-strip-grid { grid-template-columns: repeat(3, 1fr) !important; }
    #letter > div { max-width: 100% !important; }
  }

  /* ── Tablet  (768px – 1199px) ── */
  @media (min-width: 768px) and (max-width: 1199px) {
    .stats-strip-grid { grid-template-columns: repeat(5, 1fr) !important; }
    .committee-modal-panel { max-width: 520px !important; }
  }

  /* ── Large desktop  (≥ 1920px) ── */
  @media (min-width: 1920px) {
    section {
      padding-left:  clamp(2.5rem, 5vw, 6rem) !important;
      padding-right: clamp(2.5rem, 5vw, 6rem) !important;
    }
  }
`

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
function Reveal({ children, className = '', style }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-72px' })
  return (
    <motion.div ref={ref} variants={stagger}
      initial="hidden" animate={inView ? 'visible' : 'hidden'}
      className={className} style={style}
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
function Navbar() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen]   = useState(false)
  const { lang, setLang } = useLang()
  const tx = useT()

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const LangToggle = ({ inDrawer }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2, ...(inDrawer ? { padding: '0.9rem 2.75rem', borderTop: '1px solid rgba(255,255,255,0.04)' } : {}) }}>
      {['en', 'es'].map((l, i) => (
        <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {i === 1 && <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.6rem', margin: '0 4px' }}>|</span>}
          <button onClick={() => setLang(l)} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0',
            fontFamily: F.body, fontSize: '0.65rem', letterSpacing: '0.14em',
            fontWeight: lang === l ? 700 : 400,
            color: lang === l ? C.white : 'rgba(255,255,255,0.35)',
            transition: 'color 0.2s',
          }}>
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  )

  return (
    <motion.nav
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: 'clamp(14px, 1.5vw, 28px) clamp(14px, 1.5vw, 28px)',
        background: solid ? C.navy : 'transparent',
        borderBottom: solid ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'background 0.4s ease, border-color 0.4s ease',
      }}
    >
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none' }}>
        <img src="/logo.png" alt="Escuelas Lincoln" style={{
          width: 'clamp(44px, 5.2vw, 96px)', height: 'clamp(44px, 5.2vw, 96px)', borderRadius: '50%', objectFit: 'cover',
        }} />
      </a>

      <div className="hidden md:flex" style={{ alignItems: 'center', gap: 34 }}>
        {tx.nav.map(({ label, href }) => (
          <a key={href} href={href} style={{
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
        <LangToggle />
      </div>

      <div className="md:hidden" style={{ display: 'flex', alignItems: 'center', marginRight: 4 }}>
        <LangToggle />
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
              position: 'absolute', top: '100%', left: 0, right: 0,
              background: C.navy, overflow: 'hidden',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {tx.nav.map(({ label, href }) => (
              <a key={href} href={href} onClick={() => setOpen(false)} style={{
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
  useCountdown('2026-10-02T16:00:00-03:00')
  const tx = useT()

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
          style={{ fontFamily: F.display, fontSize: 'clamp(0.875rem, 1.5vw, 1rem)', color: 'rgba(255,255,255,0.7)', marginBottom: '2rem' }}
        >
          {tx.hero.date}
        </motion.p>

        

      </div>
    </section>
  )
}

/* ─── Stats strip ────────────────────────────────────────────────────────── */
function StatsStrip() {
  const tx = useT()
  const vals = ['13', '300', '26', '3', '2']
  const items = vals.map((v, i) => ({ v, l: tx.stats[i] }))
  return (
    <div style={{ background: C.navy, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="stats-strip-grid grid grid-cols-3 md:grid-cols-5" style={{ maxWidth: 1100, margin: '0 auto' }}>
        {items.map(({ v, l }, i) => (
          <div key={l} style={{
            padding: 'clamp(2rem, 5vw, 5rem) 0.75rem', textAlign: 'center',
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
  const { about: ab } = useT()
  return (
    <section id="about" style={{ background: C.white, padding: 'clamp(3rem, 7vw, 7rem) clamp(1.1rem, 3.5vw, 2.5rem)' }}>
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ maxWidth: 1100, margin: '0 auto', gap: '5rem', alignItems: 'stretch' }}>

        <Reveal>

          <motion.h2 variants={fadeUp} style={{
            fontFamily: F.display, fontWeight: 600, color: C.text,
            fontSize: 'clamp(2.4rem, 4vw, 3.75rem)', lineHeight: 1.08,
            letterSpacing: '-0.02em', marginBottom: '2rem',
          }}>
            {ab.heading[0]}<br />{ab.heading[1]}
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontFamily: F.body, fontSize: '0.95rem', lineHeight: 1.85, color: '#334155', marginBottom: '1.35rem' }}>{ab.p1}</motion.p>
          <motion.p variants={fadeUp} style={{ fontFamily: F.body, fontSize: '0.95rem', lineHeight: 1.85, color: '#334155', marginBottom: '2.25rem' }}>{ab.p2}</motion.p>
          <motion.p variants={fadeUp} style={{ fontFamily: F.body, fontSize: '0.95rem', lineHeight: 1.85, color: '#334155', marginBottom: 0 }}>{ab.p3}</motion.p>
        </Reveal>

        <Reveal style={{ position: 'relative' }}>
          <motion.div variants={fadeUp} className="about-image-col" style={{ overflow: 'hidden', position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
            <img src="/classroom.jpg" alt="Delegates in committee session" style={{ display: 'block', width: '100%', flex: 1, minHeight: 0, objectFit: 'cover', objectPosition: 'center 20%' }} />
            <div style={{ flex: '1 1 0', minHeight: 0, background: C.navy, padding: '0 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ fontFamily: F.display, fontSize: '2rem', fontWeight: 600, color: C.goldLight, lineHeight: 1.1, letterSpacing: '-0.01em', textAlign: 'center', whiteSpace: 'nowrap', margin: 0 }}>
              <span style={{ fontStyle: 'italic' }}>{ab.tagline}</span>
              </p>
            </div>
            <div className="grid grid-cols-2" style={{ flex: '1 1 0', minHeight: 0, background: C.navy, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.display, fontSize: '2.1rem', fontWeight: 600, color: C.goldLight, lineHeight: 1 }}>
                  <sup style={{ fontSize: '2rem' }}>2</sup>&frasl;<sub style={{ fontSize: '2rem' }}>3</sub>
                </div>
                <div style={{ fontFamily: F.body, fontSize: '0.85rem', letterSpacing: '0.17em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.33)', marginTop: 6 }}>{ab.stat1}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <div style={{ height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/hands.svg" alt="Raised hands" style={{ display: 'block', height: 50, width: 'auto' }} />
                </div>
                <div style={{ fontFamily: F.body, fontSize: '0.85rem', letterSpacing: '0.17em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.33)', marginTop: 6 }}>{ab.stat2}</div>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Committees ─────────────────────────────────────────────────────────── */
const IMG = id => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=70`
const COMMITTEES = [
  { abbr: 'UNSC',  name: 'Security Council',           lang: 'en', seats: 15, type: 'parliamentary', note: 'Advanced',          room: '4th Floor · Room TBC', chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC', img: IMG('1548630435-998a2cbbff67') },
  { abbr: 'GA',    name: 'General Assembly',            lang: 'en', seats: 50, type: 'parliamentary', note: 'Beginner · Large',   room: 'Auditorium',           chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC', img: IMG('1714568834394-0407d393e4b7') },
  { abbr: 'ECOSOC',name: 'ECOSOC',                      lang: 'en', seats: 20, type: 'parliamentary', note: 'Intermediate',       room: '4th Floor · Room TBC', chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC', img: IMG('1579227114496-27346f474519') },
  { abbr: 'UNHRC', name: 'Human Rights Council',        lang: 'en', seats: 20, type: 'parliamentary', note: 'Intermediate',       room: '4th Floor · Room TBC', chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC', img: IMG('1594415156128-af1d8788db6c') },
  { abbr: 'PC',    name: 'Political Committee',         lang: 'en', seats: 20, type: 'parliamentary', note: 'Intermediate',       room: '4th Floor · Room TBC', chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC', img: IMG('1782998307726-f93ec14eda24') },
  { abbr: 'ICJ',   name: "Int'l Court of Justice",      lang: 'en', seats: 15, type: 'court',         note: 'Advanced',          room: '4th Floor · Room TBC', chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC', img: IMG('1768839719921-6a554fb3e847') },
  { abbr: 'ICC',   name: "Int'l Criminal Court",        lang: 'en', seats: 30, type: 'court',         note: 'Advanced',          room: 'Library',              chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC', img: IMG('1768839722927-df0ef3188f6d') },
  { abbr: 'HICC',  name: 'Historical ICC',              lang: 'en', seats: 30, type: 'court',         note: 'Advanced · Historical', room: 'Aula Magna',        chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC', img: IMG('1676181739859-08330dea8999') },
  { abbr: 'HG',    name: 'The Hunger Games',            lang: 'en', seats: 15, type: 'crisis',        note: 'Advanced · Crisis', room: '4th Floor · Room TBC', chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC', img: IMG('1643538146589-350d289182e8') },
  { abbr: 'CS',    name: 'Consejo de Seguridad',        lang: 'es', seats: 15, type: 'parliamentary', note: 'Avanzado',          room: '5th Floor · Room TBC', chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC', img: IMG('1552912276-dde406237918') },
  { abbr: 'ECOS',  name: 'ECOSOC en Español',           lang: 'es', seats: 20, type: 'parliamentary', note: 'Intermedio',        room: '5th Floor · Room TBC', chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC', img: IMG('1556983852-43bf21186b2a') },
  { abbr: 'CP',    name: 'Comité Político',             lang: 'es', seats: 20, type: 'parliamentary', note: 'Intermedio',        room: '5th Floor · Room TBC', chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC', img: IMG('1540910419892-4a36d2c3266c') },
  { abbr: 'CDH',   name: 'Consejo de Derechos Humanos', lang: 'es', seats: 20, type: 'parliamentary', note: 'Intermedio',        room: '5th Floor · Room TBC', chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC', img: IMG('1511898634545-c01af8a54dd5') },
]

const TYPE_TAG = {
  parliamentary: { label: 'Parliamentary',   bg: 'rgba(24,35,67,0.07)',   fg: '#1B2F5E' },
  court:         { label: 'Court Procedure', bg: 'rgba(110,15,35,0.07)',  fg: '#6B1120' },
  crisis:        { label: 'Crisis',          bg: 'rgba(170,110,0,0.09)',  fg: '#7A5200' },
}

function CommitteeCard({ c, onOpen }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onOpen}
      style={{
        position: 'relative', aspectRatio: '1 / 1', cursor: 'pointer',
        overflow: 'hidden', backgroundColor: C.navyDark,
      }}
      onMouseEnter={e => { const img = e.currentTarget.querySelector('img'); if (img) img.style.transform = 'scale(1.06)' }}
      onMouseLeave={e => { const img = e.currentTarget.querySelector('img'); if (img) img.style.transform = 'scale(1)' }}
    >
      <img
        src={c.img} alt={c.name} loading="lazy"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', transition: 'transform 0.55s ease',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(8, 13, 28) 0%, rgba(24,35,67,0.62) 45%, rgba(24,35,67,0.30) 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: '1.75rem',
      }}>
        <h3 style={{
          fontFamily: F.display, fontVariant:'small', color: C.white,
          textAlign: 'center', fontSize: 'clamp(1.4rem, 2.4vw, 1.9rem)',
          fontWeight: 600, lineHeight: 1.2, letterSpacing: '0.02em',
          textShadow: '0 1px 12px rgba(0,0,0,0.35)',
        }}>
          {c.name}
        </h3>
      </div>
    </motion.div>
  )
}

function CommitteeModal({ c, onClose }) {
  const isTBC = v => v === 'TBC'
  const tag = TYPE_TAG[c.type]
  const tx = useT()

  const handleKey = (e) => { if (e.key === 'Escape') onClose() }
  const ref = useRef(null)
  useEffect(() => { ref.current?.focus() }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(10,15,35,0.72)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
        className="committee-modal-panel"
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKey}
        tabIndex={-1}
        ref={ref}
        style={{
          background: C.white, maxWidth: 480, width: '100%',
          maxHeight: '90vh', overflowY: 'auto',
          padding: '2.25rem 2.25rem 2rem',
          outline: 'none',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <div>
            <button
                  onClick={onClose}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', lineHeight: 0 }}
                  aria-label="Close"
                >
                  <svg width="18" height="18" fill="none" stroke={C.muted} strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
          </div>
        </div>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            
            <h2 style={{ fontFamily: F.display, fontSize: '1.55rem', fontWeight: 600, color: C.navy, lineHeight: 1.2 }}>
              {c.name}
            </h2>
            
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
            <span style={{ fontFamily: F.body, fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.22rem 0.55rem', background: tag.bg, color: tag.fg, fontWeight: 600 }}>
              {tx.committees.types[c.type]}
            </span>
            
          </div>
        </div>

        {/* Room & Seats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '0.85rem' }}>
          {[
            { label: tx.committees.modal.room, value: c.room },
            { label: tx.committees.modal.seats, value: `${c.seats} ${tx.committees.modal.seats}` },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: C.offWhite, padding: '0.7rem 0.9rem' }}>
              <p style={{ fontFamily: F.body, fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted, marginBottom: '0.25rem' }}>{label}</p>
              <p style={{ fontFamily: F.body, fontSize: '0.78rem', fontWeight: 600, color: C.navy }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Lang & Note */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '0.85rem' }}>
          {[
            { label: tx.committees.modal.language, value: c.lang === 'es' ? 'Español' : 'English' },
            { label: tx.committees.modal.level, value: tx.committees.notes[c.note] || c.note },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: C.offWhite, padding: '0.7rem 0.9rem' }}>
              <p style={{ fontFamily: F.body, fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted, marginBottom: '0.25rem' }}>{label}</p>
              <p style={{ fontFamily: F.body, fontSize: '0.78rem', fontWeight: 600, color: C.navy }}>{value}</p>
            </div>
          ))}
        </div>


{/*
        {/* Chairs & Contact 
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

        {/* Topics 
        <div>
          <p style={{ fontFamily: F.body, fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted, marginBottom: '0.6rem' }}>Topics</p>
          {[{ n: 'I', v: c.topic1 }, { n: 'II', v: c.topic2 }].map(({ n, v }) => (
            <div key={n} style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
              <span style={{ fontFamily: F.display, fontSize: '0.85rem', color: C.gold, fontWeight: 600, minWidth: 18, lineHeight: 1.5 }}>{n}</span>
              <span style={{ fontFamily: F.body, fontSize: '0.78rem', color: isTBC(v) ? C.muted : C.text, fontStyle: isTBC(v) ? 'italic' : 'normal', lineHeight: 1.55 }}>{v}</span>
            </div>
          ))}
        </div>

*/}
      </motion.div>
    </motion.div>
  )
}

function Committees() {
  const [active, setActive] = useState('en')
  const [modal, setModal] = useState(null)
  const tx = useT()
  const filtered = active ? COMMITTEES.filter(c => c.lang === active) : COMMITTEES

  const toggleLang = (key) => setActive(prev => prev === key ? null : key)
  const handleToggle = (abbr) => setModal(abbr)

  return (
    <section id="committees" style={{ background: C.navy, padding: 'clamp(3rem, 7vw, 7rem) clamp(1.1rem, 3.5vw, 2.5rem)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end" style={{ justifyContent: 'space-between', gap: '2rem', marginBottom: '1.5rem' }}>
            <motion.h2 variants={fadeUp} style={{
              fontFamily: F.display, fontWeight: 600, color: C.white,
              fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', lineHeight: 1.08, letterSpacing: '-0.02em',
            }}>
              {tx.committees.heading}
            </motion.h2>

            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '0.25rem' }}>
              {tx.committees.filters.map(({ key, label }) => {
                const on = active === key
                return (
                  <button key={key} onClick={() => toggleLang(key)} aria-pressed={on} style={{
                    border: `1px solid ${on ? C.goldLight : 'rgba(255,255,255,0.15)'}`,
                    cursor: 'pointer', background: on ? C.goldLight : 'transparent',
                    padding: '0.5rem 1.2rem',
                    fontFamily: F.body, fontWeight: 600, fontSize: '0.72rem',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: on ? C.navy : 'rgba(255,255,255,0.5)',
                    transition: 'all 0.18s',
                  }}>
                    {label}
                  </button>
                )
              })}
            </motion.div>
          </div>
        </Reveal>

        <motion.div layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: '1.25rem' }}
        >
          <AnimatePresence>
            {filtered.map((c, i) => {
              const cols = 3
              const orphans = filtered.length % cols
              const isOrphan = orphans > 0 && i >= filtered.length - orphans
              const orphanStyle = isOrphan && orphans === 1 ? { gridColumnStart: 'var(--orphan-col, 2)' } : {}
              return (
                <div key={c.abbr} style={orphanStyle}>
                  <CommitteeCard c={c} onOpen={() => handleToggle(c.abbr)} />
                </div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {modal && (() => {
          const c = COMMITTEES.find(x => x.abbr === modal)
          return c ? <CommitteeModal key={modal} c={c} onClose={() => setModal(null)} /> : null
        })()}
      </AnimatePresence>
    </section>
  )
}

/* ─── Countdown band  ─────────────────── */
function Countdown() {
  const { d, h, m, s } = useCountdown('2026-10-02T16:00:00-03:00')
  const units = [{ v: d, l: 'Days' }, { v: h, l: 'Hours' }, { v: m, l: 'Minutes' }, { v: s, l: 'Seconds' }]
  return (
    // ponytail: 50/50 gradient puts the color seam through the vertical center of the band;
    // 0.5in top padding is the requested breather below the committee cards.
    <div style={{ background: `linear-gradient(to bottom, ${C.navy} 50%, ${C.navyMid} 50%)`, padding: '0.5in 1.5rem 3.5rem' }}>
      <Reveal>
        <motion.div variants={fadeUp} style={{
          display: 'flex', justifyContent: 'center', flexWrap: 'wrap',
          gap: 'clamp(1.5rem, 6vw, 4.5rem)', maxWidth: 1000, margin: '0 auto',
          background: C.navyDark, padding: '2.75rem 3rem',
          boxShadow: '0 24px 60px rgba(8,13,28,0.35)',
        }}>
          {units.map(({ v, l }) => (
            <div key={l} className="countdown-unit" style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: F.display, fontWeight: 600, color: C.gold, fontSize: 'clamp(3rem, 9vw, 6.5rem)', lineHeight: 1 }}>
                {String(v).padStart(2, '0')}
              </div>
              <div style={{ fontFamily: F.body, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.offWhite, marginTop: 10 }}>
                {l}
              </div>
            </div>
          ))}
        </motion.div>
      </Reveal>
    </div>
  )
}

function Schedule() {
  const [day, setDay] = useState(0)
  const tx = useT()
  const days = tx.schedule.days

  return (
    <section id="schedule" style={{ background: C.navyMid, padding: 'clamp(3rem, 7vw, 7rem) clamp(1.1rem, 3.5vw, 2.5rem)' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <Reveal>
          <motion.h2 variants={fadeUp} style={{
            fontFamily: F.display, fontWeight: 600, color: C.white,
            fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: '3rem',
          }}>
            {tx.schedule.heading}
          </motion.h2>

          <motion.div variants={fadeUp} style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '2.75rem', overflowX: 'auto' }}>
            {days.map(({ day: d, label }, i) => (
              <button key={d} onClick={() => setDay(i)} style={{
                fontFamily: F.body, fontSize: '0.63rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '0.85rem 1.4rem', background: 'none', border: 'none',
                borderBottom: day === i ? `2px solid ${C.goldLight}` : '2px solid transparent',
                color: day === i ? C.goldLight : 'rgba(255,255,255,0.35)',
                cursor: 'pointer', fontWeight: day === i ? 600 : 400,
                transition: 'color 0.2s', whiteSpace: 'nowrap', marginBottom: -1,
              }}>
                {d}  {label}
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
              {days[day].date}
            </p>
            {days[day].sessions.map(({ time, activity }, i) => (
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

/* ─── Letter ─────────────────────────────────────────────────────────────── */
function Letter() {
  const { letter: lt } = useT()
  return (
    <section id="letter" style={{ background: C.offWhite, padding: 'clamp(3rem, 7vw, 7rem) clamp(1.1rem, 3.5vw, 2.5rem)' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <Reveal>
          <motion.h2 variants={fadeUp} style={{
            fontFamily: F.display, fontWeight: 600, color: C.text,
            fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '2.5rem',
          }}>
            {lt.heading[0]}<br />{lt.heading[1]}
          </motion.h2>

          <motion.div variants={fadeUp}>
            <div style={{ marginTop: '1rem' }}>
              <p style={{ fontFamily: F.body, fontSize: '0.88rem', color: C.text, marginBottom: '1.75rem', lineHeight: 1.75 }}>
                {lt.salutation}
              </p>
              {lt.body.map((p, i) => (
                <p key={i} style={{ fontFamily: F.body, fontSize: '0.88rem', color: C.text, lineHeight: 1.8, marginBottom: '1.25rem' }}>
                  {p}
                </p>
              ))}
              <p style={{ fontFamily: F.body, fontSize: '0.78rem', color: C.muted, marginBottom: '2rem', fontStyle: 'italic', marginTop: '2rem' }}>
                {lt.closing}
              </p>
              <p style={{ fontFamily: F.display, fontSize: '1.05rem', fontWeight: 600, color: C.text, marginBottom: '0.15rem' }}>
                Manav Purswani
              </p>
              <p style={{ fontFamily: F.body, fontSize: '0.68rem', color: C.muted, marginBottom: '1.5rem' }}>
                {lt.titles[0]}
              </p>
              <p style={{ fontFamily: F.display, fontSize: '1.05rem', fontWeight: 600, color: C.text, marginBottom: '0.15rem' }}>
                Cata Gamero
              </p>
              <p style={{ fontFamily: F.body, fontSize: '0.68rem', color: C.muted, marginBottom: '1.5rem' }}>
                {lt.titles[1]}
              </p>
              <p style={{ fontFamily: F.body, fontSize: '0.63rem', color: 'rgba(15,23,42,0.45)', letterSpacing: '0.04em' }}>
                Asociación Escuelas Lincoln, Buenos Aires, Argentina, 2026
              </p>
            </div>
          </motion.div>

        </Reveal>
      </div>
    </section>
  )
}

/* ─── Contact ────────────────────────────────────────────────────────────── */
function Contact() {
  const { footer: ft } = useT()
  const tx = useT()
  return (
    <section id="contact" style={{ background: C.navyDark, padding: 'clamp(2.5rem, 5vw, 5rem) clamp(1.1rem, 3.5vw, 2.5rem)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ maxWidth: 1100, margin: '0 auto', gap: '3rem' }}>

          {/* Col 1 — Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.2rem' }}>
              <img src="/logo.png" alt="Lincoln" style={{ width: 54, height: 54, borderRadius: '50%', objectFit: 'cover', opacity: 0.78 }} />
              <span style={{ fontFamily: F.display, fontSize: '1rem', fontWeight: 600, color: C.white, letterSpacing: '0.06em' }}>LINCOLNMUN</span>
            </div>
            <p style={{ fontFamily: F.body, fontSize: '0.79rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.33)' }}>
              {ft.desc}
            </p>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <p style={{ fontFamily: F.body, fontSize: '0.57rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: C.goldLight, marginBottom: '1.2rem', fontWeight: 600 }}>
              {ft.links}
            </p>
            {tx.nav.map(({ label, href }) => (
              <a key={label} href={href} style={{
                display: 'block', fontFamily: F.body, fontSize: '0.79rem',
                color: 'rgba(255,255,255,0.38)', textDecoration: 'none', marginBottom: '0.55rem', transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = C.white)}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.38)')}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Col 3 — Edition I */}
          <div>
            <p style={{ fontFamily: F.body, fontSize: '0.57rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: C.goldLight, marginBottom: '1.2rem', fontWeight: 600 }}>
              {ft.edition}
            </p>
            {ft.facts.map(({ label, value }) => (
              <div key={label} style={{ marginBottom: '0.65rem' }}>
                <p style={{ fontFamily: F.body, fontSize: '0.5rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', marginBottom: '0.1rem' }}>{label}</p>
                <p style={{ fontFamily: F.body, fontSize: '0.79rem', color: 'rgba(255,255,255,0.55)' }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Col 4 — Connect */}
          <div>
            <p style={{ fontFamily: F.body, fontSize: '0.57rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: C.goldLight, marginBottom: '1.2rem', fontWeight: 600 }}>
              {ft.connect}
            </p>
            {[
              {
                href: 'mailto:munleadership@lincoln.edu.ar',
                label: 'munleadership@lincoln.edu.ar',
                external: false,
                icon: (
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                href: 'https://www.instagram.com/lincolnmun.ba/',
                label: '@lincolnmun.ba',
                external: true,
                icon: (
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2 }}>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="4" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                  </svg>
                ),
              },
            ].map(({ href, label, external, icon }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                  fontFamily: F.body, fontSize: '0.79rem',
                  color: 'rgba(255,255,255,0.38)', textDecoration: 'none',
                  marginBottom: '0.75rem', transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = C.white)}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.38)')}
              >
                {icon}
                <span>{label}</span>
              </a>
            ))}
          </div>

        </div>
      </Reveal>
    </section>
  )
}

/* ─── Footer ─────────────────────────────────────────────────────────────── */
function Footer() {
  const { footer: ft } = useT()
  return (
    <footer style={{ background: C.navyDark, borderTop: '1px solid rgba(255,255,255,0.04)', padding: '1.4rem 2.75rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <p style={{ fontFamily: F.body, fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.05em' }}>
          © 2026 Asociación Escuelas Lincoln · LINCOLNMUN
        </p>
        <p style={{ fontFamily: F.body, fontSize: '0.65rem', color: 'rgba(255,255,255,0.16)', letterSpacing: '0.05em' }}>
          {ft.copyright}
        </p>
      </div>
    </footer>
  )
}

/* ─── App ────────────────────────────────────────────────────────────────── */
export default function App() {
  const [lang, setLang] = useState('en')
  return (
    <LangCtx.Provider value={{ lang, setLang }}>
      <style>{MOBILE_CSS}</style>
      <Navbar />
      <Hero />
      <StatsStrip />
      <About />
      <Letter />
      <Committees />
      <Countdown />
      <Schedule />
      <Contact />
      <Footer />
    </LangCtx.Provider>
  )
}
