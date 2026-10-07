export type Track = 'operations' | 'engineering'

export type Role = {
  id: string
  title: string
  org: string
  location: string
  track: Track
  start: string
  end: string | null
  row: number
  period: string
  summary: string
  highlights: string[]
  outcome?: { value: string; label: string }
  tags: string[]
  link?: { label: string; href: string }
  photos?: { src: string; alt: string; width: number; height: number }[]
}

export const profile = {
  name: 'Praise Fakorede',
  role: 'Operator and Systems Builder',
  location: 'Lagos, Nigeria',
  email: 'praisefakorede6@gmail.com',
  linkedin: 'https://linkedin.com/in/praise-fakorede',
  linkedinLabel: 'linkedin.com/in/praise-fakorede',
  intro:
    'I look for the structural gaps before touching the process layer, then build the infrastructure that holds under pressure. Three years shipping mobile products across fintech, health-tech, proptech and Web3. Three years running multi-regional delivery across live events, media and energy.',
}

export const results = [
  {
    value: '85%',
    label: 'CSAT sustained for three years',
    context: 'Service delivery framework, BCP Origins',
  },
  {
    value: '5 hubs',
    label: 'Run from one decentralised roadmap',
    context: 'Nigeria and the UK, 16+ major engagements',
  },
  {
    value: '+47%',
    label: 'Conversion lift on a four-month MVP',
    context: '40% faster checkout, 25% longer sessions',
  },
  {
    value: '−20%',
    label: 'Development cycle time',
    context: 'Production refactor on a live health-tech platform',
  },
  {
    value: '99.9%',
    label: 'Uptime on real-time data',
    context: 'Cross-chain crypto portfolio tracker',
  },
  {
    value: '1 of 16k+',
    label: 'Harvard Aspire Leaders, Cohort 5',
    context: 'Applicants from 130+ countries',
  },
]

export const roles: Role[] = [
  {
    id: 'bcp',
    title: 'Operations Lead',
    org: 'BCP Origins',
    location: 'Lagos, Nigeria',
    track: 'operations',
    start: '2023-06',
    end: null,
    row: 0,
    period: '06/2023 – Present',
    summary:
      'Built the operating system behind a distributed, multi-regional team running live events and media engagements across Nigeria and the UK.',
    highlights: [
      'Architected a decentralised operating roadmap across five hubs, giving every stakeholder and location real-time project visibility.',
      'Engineered a service delivery framework that sustained an 85% CSAT rating over three years.',
      'Run end-to-end delivery and SLAs across 16+ major engagements, owning vendors from onboarding to post-event relations.',
      'Built the SOPs, process documentation and KPI monitoring that standardise execution across the team.',
    ],
    outcome: { value: '85%', label: 'CSAT, three years running' },
    tags: ['Operating roadmaps', 'SLAs', 'Vendor management', 'SOPs', 'KPIs'],
    photos: [
      {
        src: '/images/bcp-audience.jpg',
        alt: 'Overhead view of a packed auditorium at a BCP Origins event',
        width: 1568,
        height: 2352,
      },
      {
        src: '/images/bcp-coordination.jpg',
        alt: 'Praise coordinating with a lanyard-wearing team member during a BCP Origins event',
        width: 1725,
        height: 2156,
      },
    ],
  },
  {
    id: 'hugheston',
    title: 'Strategy and Operations Associate',
    org: 'Hugheston Energies',
    location: 'Remote',
    track: 'operations',
    start: '2025-02',
    end: '2026-03',
    row: 1,
    period: '02/2025 – 03/2026',
    summary:
      'Recruited to support the CEO, then moved through four roles while building out the Solar and Energy Trading divisions.',
    highlights: [
      'Executive Assistant to the CEO: designed the meeting minutes and stakeholder briefing system, and served as primary liaison to division heads.',
      'Solar Division: designed the foundational structure, value packages, partner relations and customer journey maps, then guided early execution.',
      'Energy Trading: built the administrative infrastructure for the desk, streamlined transaction workflows and reported on positions and performance.',
      'Policy Driver: led the drafting and rollout of corporate policies and drove company-wide adoption.',
    ],
    outcome: { value: '4 roles', label: 'In 13 months' },
    tags: ['Division design', 'Executive operations', 'Policy rollout'],
  },
  {
    id: 'v0',
    title: 'Technical Operations Lead',
    org: 'v0 IRL Event, v0 by Vercel',
    location: 'Lagos, Nigeria',
    track: 'operations',
    start: '2026-02',
    end: '2026-02',
    row: 2,
    period: '02/2026',
    summary:
      'Ran the operational framework for a live AI technical training, from venue logistics to the attendee journey.',
    highlights: [
      'Integrated venue logistics, stakeholder communication and resource allocation into one workflow.',
      'Coordinated between the technical instructor and logistics staff, removing bottlenecks to keep the environment stable.',
      'Redesigned check-in and communication loops, raising engagement and cutting administrative overhead.',
      'Delivered within the approved budget through up-front resource planning.',
    ],
    outcome: { value: 'On budget', label: 'Live AI training delivered' },
    tags: ['Event operations', 'Attendee journey', 'Budgeting'],
    photos: [
      {
        src: '/images/v0-irl-guiding.jpg',
        alt: 'Praise guiding attendees through the v0 build at their laptops',
        width: 1080,
        height: 720,
      },
      {
        src: '/images/v0-irl-floor.jpg',
        alt: 'Praise checking in with participants on the training floor',
        width: 1080,
        height: 720,
      },
      {
        src: '/images/v0-irl-setup.jpg',
        alt: 'Praise and the instructor setting up the presentation station before the session',
        width: 1080,
        height: 720,
      },
    ],
  },
  {
    id: 'pixelcrest',
    title: 'Senior Mobile Developer',
    org: 'PixelCrest Technologies',
    location: 'Remote, UK',
    track: 'engineering',
    start: '2025-06',
    end: '2025-11',
    row: 0,
    period: '06/2025 – 11/2025',
    summary:
      'Led the platform modernisation of Qcast, a video-first Q&A product, from Android 15 compliance to a rebuilt identity layer.',
    highlights: [
      'Delivered Android 15 compliance through a full dependency update and a V1 to V2 refactor of core systems, on schedule.',
      'Re-engineered identity with AWS Cognito and social sign-in, fixing OTP edge cases that caused onboarding drop-off.',
      'Added video upload de-duplication, cutting redundant storage by 15%, and built a 720p and 1080p recording suite.',
      'Set architectures for deep-linking, caching, cross-platform sync and documentation.',
    ],
    outcome: { value: '−15%', label: 'Redundant storage' },
    tags: ['Flutter', 'AWS Cognito', 'OAuth', 'Platform modernisation'],
    link: {
      label: 'Qcast on Google Play',
      href: 'https://play.google.com/store/apps/details?id=com.qcast&hl=en',
    },
  },
  {
    id: 'web3',
    title: 'Mobile Software Engineer',
    org: 'Web3 and Crypto',
    location: 'Remote',
    track: 'engineering',
    start: '2024-06',
    end: '2025-05',
    row: 0,
    period: '06/2024 – 05/2025',
    summary:
      'Owned end-to-end delivery of a cross-chain crypto portfolio tracking app.',
    highlights: [
      'Built real-time portfolio tracking across multiple chains in Flutter.',
      'Integrated Web3 protocols for secure wallet connections and transaction management.',
      'Used Riverpod for high-concurrency async work, sustaining 99.9% uptime on live data streams.',
    ],
    outcome: { value: '99.9%', label: 'Uptime, real-time data' },
    tags: ['Flutter', 'Riverpod', 'Web3', 'Wallets'],
  },
  {
    id: 'realown',
    title: 'Mobile Engineer',
    org: 'Realown Realty Limited',
    location: 'Remote',
    track: 'engineering',
    start: '2023-12',
    end: '2024-03',
    row: 1,
    period: '12/2023 – 03/2024',
    summary:
      'Built the MVP investment app for a Nigerian proptech startup from scratch in four months.',
    highlights: [
      'Shipped payments, investment dashboards and portfolio tracking with Flutter and Firebase.',
      'Post-launch: conversion up 47%, checkout 40% faster, sessions 25% longer.',
    ],
    outcome: { value: '+47%', label: 'Conversion after launch' },
    tags: ['Flutter', 'Firebase', 'Payments', 'MVP'],
  },
  {
    id: 'blueroomcare',
    title: 'Mobile Application Developer',
    org: 'Blueroomcare',
    location: 'Remote',
    track: 'engineering',
    start: '2022-10',
    end: '2024-03',
    row: 0,
    period: '10/2022 – 03/2024',
    summary:
      'Rebuilt the foundations of a digital mental health platform serving patients and therapists.',
    highlights: [
      'Refactored the production codebase, cutting development cycle time by 20% without adding technical debt.',
      'Redesigned the UI architecture of both apps, reducing complaints and improving therapist response time.',
      'Architected V2.0 API integrations and kept UX compliance across a 1.5-year production cycle.',
    ],
    outcome: { value: '−20%', label: 'Dev cycle time' },
    tags: ['Flutter', 'Clean Architecture', 'Health-tech'],
    link: {
      label: 'Blueroomcare on Google Play',
      href: 'https://play.google.com/store/apps/details?id=com.blueroom&hl=en',
    },
  },
  {
    id: 'mozopay',
    title: 'Mobile Engineer',
    org: 'Mozopay',
    location: 'Remote',
    track: 'engineering',
    start: '2023-02',
    end: '2023-04',
    row: 1,
    period: '02/2023 – 04/2023',
    summary:
      'Worked on UI architecture, interface design and V2.0 API integrations for a fintech mobile app.',
    highlights: [
      'Contributed to UI architecture and interface design with the engineering team.',
      'Delivered V2.0 API integrations.',
    ],
    tags: ['Flutter', 'Fintech', 'APIs'],
  },
]

export const capabilities = [
  {
    title: 'Systems and operations design',
    items: [
      'Operating roadmaps',
      'Service delivery frameworks',
      'SLA and KPI monitoring',
      'SOPs and process documentation',
      'Workflow optimisation',
      'Policy design and rollout',
    ],
  },
  {
    title: 'Program and stakeholder leadership',
    items: [
      'Multi-regional coordination',
      'Vendor management',
      'Budget and resource planning',
      'Executive briefings',
      'Customer journey mapping',
    ],
  },
  {
    title: 'Engineering',
    items: [
      'Flutter and Dart',
      'Clean Architecture',
      'System design',
      'API integrations',
      'Firebase, AWS Cognito',
      'OAuth and social sign-in',
      'Agile and Scrum',
    ],
  },
  {
    title: 'Tools',
    items: ['Notion', 'Slack', 'Google Workspace', 'Git and GitHub', 'VS Code', 'Android Studio'],
  },
]

export const credentials = [
  {
    title: 'Harvard Aspire Leaders Program, Cohort 5',
    issuer: 'Aspire Institute',
    date: '10/2025 – 12/2025',
    note: 'Selected from 16,000+ applicants across 130+ countries.',
  },
  {
    title: 'Operations Management',
    issuer: 'IESE Business School (Coursera)',
    date: '2026',
  },
  {
    title: 'B.Eng, Industrial and Production Engineering',
    issuer: 'Federal University of Technology Akure',
    date: '2023',
    note: 'Operations Management, Project Management, Organizational Behavior.',
  },
  {
    title: 'Six Sigma Green Belt',
    issuer: 'In progress',
    date: '2026',
  },
]
