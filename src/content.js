/* ─── Site content: single source of truth ──────────────────────────────────
   Imported by App.jsx (rendered by React) and by vite.config.js (baked into
   index.html as a no-JS / SEO fallback). Edit text here. */

export const T = {
  en: {
    meta: {
      title: 'LINCOLNMUN | Model United Nations Conference · Buenos Aires',
      description: 'Model UN at Asociación Escuelas Lincoln, Buenos Aires — October 2–4, 2026. Most balanced bilingual, student-run conference with 13 committees, open to all levels of experience.',
      ogTitle: 'LINCOLNMUN | Model United Nations Conference · Buenos Aires',
      ogDescription: 'Three days of debate, diplomacy, and leadership, run entirely by students. 13 committees in English and Spanish. Register now for October 2–4, 2026.',
    },
    nav: [
      { label: 'About',      href: '#about' },
      { label: 'Letter',     href: '#letter' },
      { label: 'Committees', href: '#committees' },
      { label: 'Schedule',   href: '#schedule' },
      
    ],
    hero: { date: 'October 2nd – October 4th 2026 · Vicente López, Buenos Aires' },
    stats: ['Committees', 'Delegate Seats', 'Chairs', 'Conference Days', 'Languages'],
    about: {
      heading: ['What is', 'LINCOLNMUN?'],
      p1: 'LINCOLNMUN is a three-day Model UN conference founded for secondary school students by secondary school students in the Buenos Aires region. Delegates step into the roles of UN representatives, historical figures, and influential persons to address key global challenges while building skills in leadership and public speaking.',
      p2: 'From the opening ceremony to the closing asado, every element of the conference is run by students. Beyond delegating, students may apply to chair across any of our thirteen committees, presenting a unique opportunity for students to assume leadership roles before committee sessions begin.',
      p3: 'LINCOLNMUN welcomes experienced and first-time delegations alike, matching delegates to roles that meet each school where they are. Bilingual by design, two-thirds of our committees run in English and one-third in Spanish, making LINCOLNMUN the most balanced bilingual Model UN conference in Argentina.',
      tagline: 'For students, by students.',
      stat1: 'English Committees',
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
      salutation: 'Honorable chairs, esteemed delegates, and distinguished advisors,',
      body: [
        'We are ecstatic to warmly welcome you to Asociación Escuelas Lincoln as the Secretaries-General for the First Edition of LINCOLNMUN, which will take place from Friday, October 2nd, to Sunday, October 4th, 2026.',
        'We are two seniors who are currently enrolled in Asociación Escuelas Lincoln that have a combined background of more than ten years in Model United Nations, debate, and public speaking. Model UN has been a primary component of our secondary school experience, including competing in international public speaking competitions, national debates, chairing, and winning the title of best delegate at international conferences. Our objective is to create an experience that provides more students in the Buenos Aires area with an equivalent opportunity, with plans to eventually expand to other areas.',
        'Built by students for students, LINCOLNMUN provides a plethora of leadership opportunities for students in Argentina. In addition to conducting ceremonies, students are responsible for chairing thirteen committees. The conference is accessible to all, regardless of whether they are experienced or first-time delegations. Committees are conducted in both English and Spanish, thereby guaranteeing a highly inclusive environment that corresponds to the individual needs of each delegate.',
        'As we approach LINCOLNMUN, we are eager to reveal the diligent efforts of our students and staff to provide a first-rate edition for all. We aspire to provide delegates, both new and old, with an experience that they will cherish by offering a wide range of committees and limitless opportunities for student leadership.',
      ],
      closing: 'Best regards,',
      titles: ['LINCOLNMUN, 2026', 'LINCOLNMUN, 2026'],
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
    meta: {
      title: 'LINCOLNMUN | Modelo de Naciones Unidas (Modelo ONU) Bilingüe · Buenos Aires',
      description: 'Modelo de Naciones Unidas bilingüe (Modelo ONU / MUN) en Asociación Escuelas Lincoln, Buenos Aires — 2 al 4 de octubre de 2026. El Modelo ONU bilingüe más equilibrado de Argentina, con 13 comités y abierto a todos los niveles.',
      ogTitle: 'LINCOLNMUN | Modelo de Naciones Unidas (Modelo ONU) Bilingüe · Buenos Aires',
      ogDescription: 'Tres días de debate, diplomacia y liderazgo en el Modelo ONU (MUN) bilingüe más equilibrado de Argentina, organizados enteramente por estudiantes. 13 comités en inglés y español. Inscribite para el 2 al 4 de octubre de 2026.',
    },
    nav: [
      { label: 'Sobre el Programa', href: '#about' },
      { label: 'Carta',          href: '#letter' },
      { label: 'Comités',        href: '#committees' },
      { label: 'Programa',       href: '#schedule' },

    ],
    hero: { date: '2 al 4 de octubre de 2026 · Vicente López, Buenos Aires' },
    stats: ['Comités', 'Lugares para Delegados', 'Presidentes', 'Días de Conferencia', 'Idiomas'],
    about: {
      heading: ['¿Qué es', 'LINCOLNMUN?'],
      p1: 'LINCOLNMUN es una conferencia de Modelo de Naciones Unidas (Modelo ONU) de tres días, fundada por y para estudiantes secundarios de la región de Buenos Aires. Los delegados asumen los roles de representantes de la ONU, figuras históricas y personas influyentes para abordar desafíos globales mientras desarrollan habilidades de liderazgo y oratoria.',
      p2: 'Desde la ceremonia de apertura hasta el asado de cierre, cada elemento de la conferencia está a cargo de estudiantes. Además de delegar, los estudiantes pueden postularse para presidir alguno de nuestros trece comités, una oportunidad única de asumir roles de liderazgo antes de que comiencen las sesiones.',
      p3: 'LINCOLNMUN da la bienvenida tanto a delegaciones con experiencia como a las que participan por primera vez, asignando a los delegados roles acordes al nivel de cada escuela. Bilingüe por diseño, dos tercios de nuestros comités se desarrollan en inglés y un tercio en español, lo que hace de LINCOLNMUN la conferencia de MUN bilingüe más equilibrada de Argentina.',
      tagline: 'Hecho por estudiantes, para estudiantes.',
      stat1: 'Comités en Inglés',
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
      salutation: 'Honorables presidentes, estimados delegados y distinguidos asesores,',
      body: [
        'Nos alegra inmensamente darles la más cálida bienvenida a Asociación Escuelas Lincoln como los Secretarios Generales de la Primera Edición de LINCOLNMUN, que tendrá lugar desde el viernes 2 de octubre hasta el domingo 4 de octubre de 2026.',
        'Somos dos estudiantes de último año actualmente estudiando en Asociación Escuelas Lincoln, con una experiencia combinada de más de diez años en Modelo de Naciones Unidas, debate y oratoria. El Modelo de Naciones Unidas ha sido un componente fundamental de nuestra experiencia en la escuela secundaria, que incluye participar en competencias internacionales de oratoria, debates nacionales, presidir comités y ganar el título de mejor delegado en conferencias internacionales. Nuestro objetivo es crear una experiencia que brinde a más estudiantes de la zona de Buenos Aires una oportunidad equivalente, con planes de expandirnos eventualmente a otras áreas.',
        'Construido por estudiantes para estudiantes, LINCOLNMUN ofrece una gran cantidad de oportunidades de liderazgo para estudiantes en Argentina. Además de conducir las ceremonias, los estudiantes son responsables de presidir trece comités. La conferencia es accesible para todos, independientemente de si son delegaciones con experiencia o participantes por primera vez. Los comités se llevan a cabo tanto en inglés como en español, garantizando así un entorno sumamente inclusivo que responde a las necesidades individuales de cada delegado.',
        'A medida que nos acercamos a LINCOLNMUN, estamos ansiosos por revelar el trabajo dedicado de nuestros estudiantes y personal para ofrecer una edición de primer nivel para todos. Aspiramos a brindarles a los delegados, tanto nuevos como veteranos, una experiencia que atesorarán, ofreciendo una amplia variedad de comités e infinitas oportunidades de liderazgo estudiantil.',
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

/* Secretary-General surnames — shared by the letter section and the fallback. */
export const SG = ['Purswani', 'Gamero']

const IMG = id => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=70`

export const COMMITTEES = [
  { abbr: 'UNSC',  name: 'Security Council',           lang: 'en', seats: 15, type: 'parliamentary', note: 'Advanced',          room: '4th Floor · Room TBC', chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC', img: IMG('1727221167365-d365e63e7ebc') },
  { abbr: 'GA',    name: 'General Assembly',            lang: 'en', seats: 50, type: 'parliamentary', note: 'Beginner · Large',   room: 'Auditorium',           chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC', img: IMG('1673296630925-a16a5592cc14') },
  { abbr: 'ECOSOC',name: 'ECOSOC',                      lang: 'en', seats: 20, type: 'parliamentary', note: 'Intermediate',       room: '4th Floor · Room TBC', chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC', img: IMG('1633158829585-23ba8f7c8caf') },
  { abbr: 'UNHRC', name: 'Human Rights Council',        lang: 'en', seats: 20, type: 'parliamentary', note: 'Intermediate',       room: '4th Floor · Room TBC', chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC', img: IMG('1594415156128-af1d8788db6c') },
  { abbr: 'PC',    name: 'Political Committee',         lang: 'en', seats: 20, type: 'parliamentary', note: 'Intermediate',       room: '4th Floor · Room TBC', chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC', img: IMG('1477281765962-ef34e8bb0967') },
  { abbr: 'ICJ',   name: "Int'l Court of Justice",      lang: 'en', seats: 15, type: 'court',         note: 'Advanced',          room: '4th Floor · Room TBC', chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC', img: IMG('1768839719921-6a554fb3e847') },
  { abbr: 'ICC',   name: "Int'l Criminal Court",        lang: 'en', seats: 30, type: 'court',         note: 'Advanced',          room: 'Library',              chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC', img: IMG('1676181739859-08330dea8999') },
  { abbr: 'HICC',  name: 'Historical ICC',              lang: 'en', seats: 30, type: 'court',         note: 'Advanced · Historical', room: 'Aula Magna',        chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC', img: IMG('1607778417094-1fef13315e6e') },
  { abbr: 'HG',    name: 'The Hunger Games',            lang: 'en', seats: 15, type: 'crisis',        note: 'Advanced · Crisis', room: '4th Floor · Room TBC', chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC', img: IMG('1643538146589-350d289182e8') },
  { abbr: 'CS',    name: 'Consejo de Seguridad',        lang: 'es', seats: 15, type: 'parliamentary', note: 'Avanzado',          room: '5th Floor · Room TBC', chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC', img: IMG('1495149905644-c9f27692c2c3') },
  { abbr: 'ECOS',  name: 'ECOSOC en Español',           lang: 'es', seats: 20, type: 'parliamentary', note: 'Intermedio',        room: '5th Floor · Room TBC', chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC', img: IMG('1591033594798-33227a05780d') },
  { abbr: 'CP',    name: 'Comité Político',             lang: 'es', seats: 20, type: 'parliamentary', note: 'Intermedio',        room: '5th Floor · Room TBC', chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC', img: IMG('1540910419892-4a36d2c3266c') },
  { abbr: 'CDH',   name: 'Consejo de Derechos Humanos', lang: 'es', seats: 20, type: 'parliamentary', note: 'Intermedio',        room: '5th Floor · Room TBC', chairs: 'TBC', contact: 'TBC', topic1: 'TBC', topic2: 'TBC', img: IMG('1511898634545-c01af8a54dd5') },
]
