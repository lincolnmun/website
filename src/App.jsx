import { motion, useInView } from 'framer-motion'
import { useState, useRef } from 'react'

/* To Do:

1) Fix Comittees Section
2) Add paragraph for what is Lincoln MUN
3) Add Google Form for registrations
4) Confirm Stats in what is Lincoln MUN

*/



/* Design*/
const BLUE   = '#182343'
const RED    = '#D70E33'
const SKY    = '#75AADB'
const YELLOW = '#FDB71E'
const SERIF  = '"Times New Roman", Times, serif'

/* ─── Animation variants ────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: 'easeOut' } },
}
const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
}
const stagger = {
  visible: { transition: { staggerChildren: 0.13 } },
}

/* ─── Section reveal wrapper ────────────────────────────────── */
function Reveal({ children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* Navigation Bar */
const NAV_LINKS = ['About', 'Committees', 'Conference', 'Registration', 'Contact']

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <motion.nav
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-3"
      style={{ background: 'linear-gradient(to bottom, rgba(24,35,67,0.85) 0%, transparent 100%)' }}
    >
      {/* Logo */}
      <a href="#" className="flex items-center gap-3 shrink-0">
        <img
          src="/logo.jpg"
          alt="Escuelas Lincoln"
          className="w-14 h-14 rounded-full object-cover border-2 border-white/25 shadow-lg"
        />
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-7">
        {NAV_LINKS.map((link) => (
          <motion.a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="text-white/85 text-xs uppercase tracking-[0.22em] cursor-pointer transition-colors duration-200 hover:text-white"
            whileHover={{ color: SKY }}
            style={{ fontFamily: SERIF }}
          >
            {link}
          </motion.a>
        ))}
      </div>

      {/* ─── Mobile hamburger ──────────────────────────────────*/}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-white p-1.5 focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {open
            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          }
        </svg>
      </button>

      {/* ─── Mobile menu ──────────────────────────────────*/}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 py-3"
          style={{ background: 'rgba(24,35,67,0.97)', backdropFilter: 'blur(8px)' }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="block text-white/85 hover:text-white text-xs uppercase tracking-[0.22em] px-8 py-3 hover:bg-white/10 transition-colors"
              style={{ fontFamily: SERIF }}
            >
              {link}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  )
}

/* Hero */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Campus background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: 'url(/campus.webp)' }}
      />
      {/* Dark overlays */}
      <div className="absolute inset-0" style={{ background: 'rgba(24,35,67,0.62)' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/55" />

      {/* Hero content */}
      <div className="relative z-10 text-center text-white px-4 w-full max-w-7xl mx-auto mt-10">

        {/* Session label */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.5 }}
          className="uppercase tracking-[0.45em] text-xs md:text-sm font-bold mb-5"
          style={{ color: YELLOW, fontFamily: SERIF }}
        >
          
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 38 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: 'easeOut' }}
          className="font-bold leading-none tracking-tight"
          style={{
            fontFamily: SERIF,
            fontSize: 'clamp(3.5rem, 8vw, 11rem)',
            textShadow: '0 6px 40px rgba(0,0,0,0.55)',
            letterSpacing: '-0.01em',
          }}
        >
          LINCOLNMUN
        </motion.h1>

        

        {/* Location */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 1.15 }}
          className="text-lg md:text-2xl italic mb-1"
          style={{ fontFamily: SERIF }}
        >
          Buenos Aires, Argentina
        </motion.p>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.28 }}
          className="text-sm md:text-base text-white/70 mb-2"
          style={{ fontFamily: SERIF }}
        >
          October 15th - October 18th 2026 
        </motion.p>

      
      </div>

      
    </section>
  )
}

/* About */
function About() {
  const stats = [
    { num: '14',   label: 'Committees'  },
    { num: '300+', label: 'Delegates'   },
    { num: '$',  label: 'Prizes/Scholarships'     },
    { num: '3-4?',    label: 'Days'        },
  ]

  return (
    <section id="about" className="py-24 px-6" style={{ backgroundColor: BLUE }}>
      <Reveal className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <motion.p variants={fadeUp} className="uppercase tracking-[0.3em] text-xs mb-4 font-bold" style={{ color: YELLOW, fontFamily: SERIF }}>
            About
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight" style={{ fontFamily: SERIF }}>
            What is<br />LincolnMUN?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/70 text-base leading-relaxed mb-5" style={{ fontFamily: SERIF }}>
            Insert Paragraph Here
          </motion.p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map(({ num, label }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="border border-white/10 p-7 text-center transition-colors duration-300 hover:border-white/30"
            >
              <p className="text-4xl font-bold mb-2" style={{ color: YELLOW, fontFamily: SERIF }}>{num}</p>
              <p className="uppercase tracking-widest text-xs text-white/55" style={{ fontFamily: SERIF }}>{label}</p>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

/* ─── Committees ────────────────────────────────────────────── */
const COMMITTEES = [
  { abbr: 'SC',    name: 'Security Council',          topic: 'International Peace & Security',          level: 'Advanced'     },
  { abbr: 'GA',    name: 'General Assembly',           topic: 'Sustainable Development Goals',           level: 'Beginner'     },
  { abbr: 'ECOSOC',name: 'ECOSOC',                     topic: 'Global Economic Recovery',                level: 'Intermediate' },
  { abbr: 'HRC',   name: 'Human Rights Council',       topic: 'Refugee Rights & Protection',             level: 'Intermediate' },
  { abbr: 'WHO',   name: 'World Health Organization',  topic: 'Pandemic Preparedness 2030',              level: 'Beginner'     },
  { abbr: 'UNEP',  name: 'Environmental Programme',    topic: 'Climate Action & Net-Zero Commitments',   level: 'Advanced'     },
]

function levelStyle(level) {
  if (level === 'Beginner')     return { background: `${YELLOW}22`, color: '#92400E' }
  if (level === 'Intermediate') return { background: `${SKY}22`,    color: BLUE }
  return                               { background: `${RED}18`,     color: RED  }
}

function Committees() {
  return (
    <section id="committees" className="py-24 px-6 bg-white">
      <Reveal className="max-w-6xl mx-auto">
        <motion.p variants={fadeUp} className="uppercase tracking-[0.3em] text-center text-xs mb-4 font-bold" style={{ color: RED, fontFamily: SERIF }}>
          Committees
        </motion.p>
        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-center mb-4" style={{ color: BLUE, fontFamily: SERIF }}>
          Choose Your Committee
        </motion.h2>
      

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMMITTEES.map((c) => (
            <motion.div
              key={c.abbr}
              variants={fadeUp}
              className="border border-gray-200 p-6 cursor-pointer group transition-all duration-300 hover:shadow-lg"
              style={{ fontFamily: SERIF }}
              whileHover={{ borderColor: BLUE, y: -3 }}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs uppercase tracking-widest font-bold" style={{ color: RED }}>{c.abbr}</span>
                <span className="text-xs uppercase tracking-wide px-2 py-0.5 font-semibold rounded-sm" style={levelStyle(c.level)}>
                  {c.level}
                </span>
              </div>
              <h3 className="font-bold text-lg mb-2 transition-colors duration-200 group-hover:text-red-700" style={{ color: BLUE, fontFamily: SERIF }}>
                {c.name}
              </h3>
              <p className="text-gray-500 text-sm" style={{ fontFamily: SERIF }}>{c.topic}</p>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

/* Conference details  */
function Conference() {
  const details = [
    {
      icon: (
        <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Date',
      value: 'October 15th - October 18th',
      sub: '2026',
    },
    {
      icon: (
        <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Location',
      value: 'Asociacion Escuelas Lincoln',
      sub: 'Buenos Aires, Argentina',
    },
    {
      icon: (
        <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Delegates',
      value: '300+ Students',
      sub: 'From Buenos Aires & beyond',
    },
  ]

  return (
    <section id="conference" className="py-24 px-6" style={{ backgroundColor: '#f7f8fa' }}>
      <Reveal className="max-w-6xl mx-auto">
        <motion.p variants={fadeUp} className="uppercase tracking-[0.3em] text-center text-xs mb-4 font-bold" style={{ color: RED, fontFamily: SERIF }}>
          Info
        </motion.p>
        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-center mb-4" style={{ color: BLUE, fontFamily: SERIF }}>
          Conference Details
        </motion.h2>
        

        <div className="grid md:grid-cols-3 gap-6">
          {details.map(({ icon, label, value, sub }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="text-center p-9 bg-white border border-gray-100 transition-all duration-300 hover:shadow-md"
              whileHover={{ borderColor: SKY, y: -2 }}
            >
              <div className="flex justify-center mb-5" style={{ color: BLUE }}>{icon}</div>
              <p className="uppercase tracking-widest text-xs font-bold mb-2" style={{ color: RED, fontFamily: SERIF }}>{label}</p>
              <p className="text-2xl font-bold mb-1" style={{ color: BLUE, fontFamily: SERIF }}>{value}</p>
              <p className="text-gray-500 text-sm" style={{ fontFamily: SERIF }}>{sub}</p>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

/*Registration*/
function Registration() {
  return (
    <section id="registration" className="py-28 px-6 text-white" style={{ backgroundColor: BLUE }}>
      <Reveal className="max-w-4xl mx-auto text-center">
        <motion.p variants={fadeUp} className="uppercase tracking-[0.3em] text-xs mb-4 font-bold" style={{ color: YELLOW, fontFamily: SERIF }}>
          Registration
        </motion.p>
        <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-bold mb-4 leading-tight" style={{ fontFamily: SERIF }}>
          Ready to Debate?
        </motion.h2>
        <motion.p variants={fadeUp} className="text-white/70 text-base leading-relaxed mb-10 max-w-xl mx-auto" style={{ fontFamily: SERIF }}>
          Registration is open. 
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
          

        </motion.div>
      </Reveal>
    </section>
  )
}

/*Contact*/
function Contact() {
  return (
    <section id="contact" className="py-20 px-6 text-white" style={{ backgroundColor: '#0f1829' }}>
      <Reveal className="max-w-3xl mx-auto text-center">
        <motion.p variants={fadeUp} className="uppercase tracking-[0.3em] text-xs mb-4 font-bold" style={{ color: YELLOW, fontFamily: SERIF }}>
          Contact
        </motion.p>
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: SERIF }}>
          Get In Touch
        </motion.h2>
        <motion.p variants={fadeUp} className="text-white/60 mb-8 leading-relaxed" style={{ fontFamily: SERIF }}>
          Questions about LincolnMUN? Reach out to the team here:
        </motion.p>
        <motion.a
          variants={fadeUp}
          href="mailto:lincolnmun@lincoln.edu.ar"
          className="text-lg font-semibold transition-colors duration-200"
          style={{ color: SKY, fontFamily: SERIF }}
          whileHover={{ color: 'white' }}
        >
          munleadership@lincoln.edu.ar
        </motion.a>
      </Reveal>
    </section>
  )
}

/* Footer  */
function Footer() {
  return (
    <footer className="py-8 px-6 text-center text-white/40" style={{ backgroundColor: '#090e1a' }}>
      <div className="flex items-center justify-center gap-3 mb-3">
        <img src="/logo.jpg" alt="Lincoln" className="w-8 h-8 rounded-full object-cover opacity-50" />
        <span className="text-white/60 text-sm uppercase tracking-widest" style={{ fontFamily: SERIF }}>LincolnMUN</span>
      </div>
      <p className="text-xs" style={{ fontFamily: SERIF }}>
        © 2026 Asociación Escuelas Lincoln · Buenos Aires, Argentina
      </p>
    </footer>
  )
}

/*App */
export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Committees />
      <Conference />
      <Registration />
      <Contact />
      <Footer />
    </>
  )
}
