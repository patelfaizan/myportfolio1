/**
 * Every string on the site lives here.
 * To update the site, edit this file only — no component needs to change.
 */

export const profile = {
  name: 'Patel Mohammed Faizan',
  nameLines: ['Patel Mohammed', 'Faizan'],
  title: 'Mechanical Engineering Postgraduate',
  specialisation: 'Machine Design',
  disciplines: 'CAE · FEA · CAD · Simulation',
  location: 'Bengaluru, Karnataka, India',
  locationShort: 'Bengaluru, Karnataka',
  email: 'Patelfaizan0602@gmail.com',
  phone: '+91 63661 71427',
  phoneHref: '+916366171427',
  linkedin: 'https://www.linkedin.com/in/patelfaizan',
  github: 'https://github.com/patelfaizan',
  status: 'Open to work',
}

/** Drives the navbar, the scale rail and the scroll spy. Order = page order. */
export const sections = [
  { id: 'about', label: 'About', tick: 'ABOUT' },
  { id: 'experience', label: 'Experience', tick: 'EXP' },
  { id: 'projects', label: 'Projects', tick: 'PROJ' },
  { id: 'skills', label: 'Skills', tick: 'SKILLS' },
  { id: 'certifications', label: 'Certificates', tick: 'CERT' },
  { id: 'education', label: 'Education', tick: 'EDU' },
  { id: 'profile', label: null, tick: 'PROFILE' },
  { id: 'contact', label: 'Contact', tick: 'CONTACT' },
]

export const specStrip = [
  { label: 'Discipline', value: 'Mechanical Engineering' },
  { label: 'Focus', value: 'Machine Design' },
  { label: 'Tools', value: 'ANSYS / Abaqus / SolidWorks' },
  { label: 'Status', value: 'Open to work' },
]

export const about = {
  lead:
    "I'm a Mechanical Engineer based in Bengaluru, specialising in Machine Design.",
  body:
    "My focus is on how products are engineered to survive real-world loads — using CAD to shape parts and FEA to prove they'll hold up under stress, fatigue, and cyclic loading. I work in ANSYS, Abaqus and SolidWorks, alongside the fundamentals of materials, manufacturing and product design that sit underneath any good simulation. I learn by building — whether that's failure-testing a bracket, designing a charging system, or documenting how a fire-protection system actually gets specified.",
}

export const experience = [
  {
    role: 'Data Processing Coordinator (Intern)',
    org: 'ModelyzeLabs AI',
    location: 'Bengaluru',
    period: 'JAN 2026 — APR 2026',
    summary:
      'Worked as DPC with experience in data processing and documentation. Knowledge of MEP systems including HVAC, plumbing, and fire protection. Skilled in ANSYS, Finite Element Analysis, and engineering analysis.',
  },
  {
    role: 'Engineering Intern',
    org: 'Bosch',
    location: 'Bengaluru',
    period: 'DEC 2025 — JAN 2026',
    summary:
      'Hands-on internship supporting design, analysis, and testing activities. Assisted senior engineers in product development, performed basic simulations, and contributed to technical documentation.',
  },
  {
    role: 'Intern, Wheel & Axle Manufacturing',
    org: 'Rail Wheel Factory',
    location: 'Bengaluru',
    period: 'AUG 2022 — SEP 2022',
    bullets: [
      'Gained practical exposure to large-scale manufacturing processes in wheel and axle production',
      'Observed quality control and machining operations in railway components',
      'Contributed to a 10% increase in production output',
    ],
  },
]

export const projects = [
  {
    id: 'bracket',
    domain: 'Structural',
    year: '2025',
    title: 'Failure Analysis of a Steel Bracket in ANSYS Workbench',
    period: 'JUL 2025 — AUG 2025',
    bullets: [
      'Performed static and fatigue failure analysis of a steel bracket',
      'Evaluated stress distribution, deformation, fatigue life, and factor of safety under cyclic loading',
      'Conducted parameterisation studies varying thickness and width to propose optimised designs',
      'Optimised design reduced failure rates by 15%',
    ],
    tools: ['ANSYS Workbench', 'Fatigue Analysis', 'Structural FEA'],
  },
  {
    id: 'ev-wind',
    domain: 'Energy Systems',
    year: '2022',
    title: 'Charging of EV Batteries using Wind Energy',
    period: 'JUN 2021 — NOV 2022',
    bullets: [
      'Designed a wind-energy-based charging system for EV batteries',
      'Integrated energy storage systems for stable power supply',
      'Achieved a 25% increase in charging efficiency using renewable energy',
    ],
    tools: ['Wind Energy', 'EV Charging', 'Energy Storage'],
  },
  {
    id: 'fire',
    domain: 'Safety Systems',
    year: '2023',
    title: 'Automatic Fire Protection System',
    period: 'NOV 2022 — JUN 2023',
    bullets: [
      'Designed an automatic fire detection and suppression system',
      'Integrated sprinklers, alarms, and suppression systems',
      'Ensured compliance with safety codes across an area exceeding 10,000 sq ft',
      'Performed risk assessments against applicable standards',
    ],
    tools: ['Fire Detection', 'Safety Codes', 'Risk Assessment'],
  },
  {
    id: 'ml',
    domain: 'Machine Learning',
    year: '2026',
    title: 'Machine Learning-Based Prediction of Fatigue Crack Growth Rate and Fatigue Life',
    period: 'JAN 2026 — SEP 2026',
    bullets: [
      'Developed a dual-output machine learning framework predicting fatigue crack growth rate (da/dN) and remaining fatigue life in SAE 1020 steel across stress ratios R = 0.1–0.8',
      'Trained and compared five models – Linear Regression, Random Forest, Gradient Boosting, a residual deep network (FCGR-Net) and a Physics-Informed Neural Network – on a 2,312-sample dataset of five specimen geometries',
      'Validated predictions against the Paris–Erdogan analytical solution and an ANSYS Workbench SMART crack-growth model of CTS01, with SIF within 0.73% of the analytical result',
    ],
    tools: ['Fatigue Life', 'FCGR', 'Machine Learning Prediction'],
  },
  
]

export const skills = [
  { group: 'CAE Software', items: ['ANSYS', 'Abaqus'] },
  { group: 'CAD Software', items: ['Solid Edge', 'SolidWorks'] },
  { group: 'Programming', items: ['Python', 'Java'] },
  { group: 'Documentation', items: ['MS Word', 'MS PowerPoint'] },
]

export const certifications = [
  {
    title: 'Product Design and Manufacturing',
    issuer: 'NPTEL · IIT Kanpur',
    credential: 'Elite · 12-week course · 4 credits',
    period: '', // left blank until confirmed — renders nothing
  },
  {
    title: 'Processing of Polymers and Polymer Composites',
    issuer: 'NPTEL · IIT Roorkee',
    credential: 'Elite · 8-week course · 3 credits',
    period: '',
  },
  {
    title: 'Abaqus CAE: Static and Dynamic Analysis',
    issuer: 'Udemy',
    credential: '12 hours · Completed',
    period: '',
  },
]

export const education = [
  {
    degree: 'M.Tech, Machine Design',
    org: 'B.M.S College of Engineering',
    location: 'Bengaluru',
    period: 'DEC 2024 — AUG 2026',
    cgpa: 'CGPA 8.9 / 10.0',
  },
  {
    degree: 'B.E., Mechanical Engineering',
    org: 'G.M. Institute of Technology',
    location: 'Davanagere',
    period: 'SEP 2019 — JUL 2023',
    cgpa: 'CGPA 8.2 / 10.0',
  },
]

export const strengths = [
  'Analytical and creative problem-solving',
  'Structured teamwork',
  'Independent execution',
  'Time management',
]

export const languages = [
  { name: 'English', level: 'Fluent' },
  { name: 'Hindi', level: 'Professional' },
  { name: 'Urdu', level: 'Native' },
  { name: 'Kannada', level: 'Professional' },
]

export const contactCopy = {
  heading: "Let's talk about the work.",
  intro:
    'Open to roles in machine design, CAE and product engineering. Use the form, or reach me directly.',
}
