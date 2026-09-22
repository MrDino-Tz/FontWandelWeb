export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  body: string[];
}

export const articles: Article[] = [
  {
    slug: 'from-paper-to-digital-how-transformation-works',
    title: 'From Paper to Digital: How Transformation Works',
    description:
      'What happens when paper forms become digital workflows and notebooks become a central database.',
    date: '2025-02-04',
    body: [
      'Across Tanzania, organizations are held back not by ambition but by fragmentation. Government offices, schools, SMEs, and corporates still run critical work on paper files, scattered spreadsheets, and chat threads. Reports are compiled by hand, payments reconciled manually, and customer records live in notebooks or disconnected systems.',
      'Digital transformation replaces each manual step with a connected one: paper becomes digital forms, notebooks become a central database, scattered communication becomes automated workflows, and hand-compiled reports become live dashboards. The proven path is to start with one painful process, prove the value, and then expand.',
    ],
  },
  {
    slug: 'understanding-live-dashboards-and-kpi-reports',
    title: 'Understanding Your Live Dashboards and KPI Reports',
    description:
      'Manual reports become live dashboards — how to read them and act with confidence.',
    date: '2025-02-10',
    body: [
      'A live dashboard shows the same numbers leadership already trusts — sales, collections, attendance, stock — updated automatically instead of compiled by hand at month end. Because the data is current, decisions stop waiting on reports.',
      'Read dashboards the same way every time: compare each figure against its target, watch the trend over recent weeks rather than single days, and drill into the exceptions. Bring the dashboard into the meeting and decide on what you see.',
    ],
  },
  {
    slug: 'getting-started-with-digital-forms-and-approvals',
    title: 'Getting Started with Digital Forms and Approvals',
    description:
      'Submit, approve, and track work without paper files or chat threads.',
    date: '2025-02-15',
    body: [
      'Approvals that travel on paper or in chat threads get lost, duplicated, or approved by the wrong person. A digital form captures structured information at the source — with timestamps and attachments — so nothing depends on memory.',
      'Submit from a phone or office computer and the request routes itself to the right approver. Every approval leaves an audit trail, so questions like "who approved this, and when?" always have an answer.',
    ],
  },
  {
    slug: 'keeping-your-records-clean-and-reliable',
    title: 'Keeping Your Records Clean and Reliable',
    description:
      'Simple habits that keep your central database accurate and trustworthy.',
    date: '2025-02-18',
    body: [
      'A central database is only as trustworthy as what goes into it. The usual culprits are duplicates, inconsistent spellings of names, mixed date formats, and half-filled records — small messes that compound into reports nobody believes.',
      'Four habits prevent most of it: one agreed format for dates and phone numbers, search before creating a new record, fill every required field at entry time, and review exception lists weekly. FontWandel bakes validation rules into your forms during setup so the system enforces the habits for you.',
    ],
  },
  {
    slug: 'mobile-money-reconciliation-made-simple',
    title: 'Mobile-Money Reconciliation Made Simple',
    description:
      'How integrated digital payments replace manual reconciliation.',
    date: '2025-02-20',
    body: [
      'Reconciling mobile-money payments by hand eats hours every week and hides leakage. When your system is integrated with the payment rails, every transaction records itself against the right invoice the moment it happens.',
      'Each day the system auto-matches payments and flags only the exceptions for a human to review. Month-end closes faster, disputes get evidence in seconds, and finance finally trusts the numbers.',
    ],
  },
  {
    slug: 'how-to-raise-a-support-case',
    title: 'How to Raise a Support Case',
    description:
      'Send us your issue by email and standby personnel will pick it up and resolve it as soon as possible.',
    date: '2025-02-22',
    body: [
      'Any client or customer can raise a case or issue by email. It appears on FontWandel\u2019s internal platform — FontWandel Connect — where standby personnel pick it up and resolve it as soon as possible. This support promise covers all our services and products.',
      'To get the fastest resolution, include who is affected, what happened and when, the steps to reproduce it, screenshots where possible, and how urgent it is. Our helpdesk works both remotely and on-site.',
    ],
  },
  {
    slug: 'backing-up-and-recovering-your-data',
    title: 'Backing Up and Recovering Your Data',
    description:
      'How cloud backup and disaster recovery protect your operations.',
    date: '2025-02-25',
    body: [
      'Hardware fails, ransomware spreads, and offices flood. Cloud backup with a tested disaster-recovery plan is part of every FontWandel engagement: automated daily copies stored off-site, with clear roles for who restores what.',
      'Ask two questions about any backup: when was a restore last tested, and how much work would we lose if systems failed right now? If neither answer is crisp, that is the first thing to fix.',
    ],
  },
  {
    slug: 'cybersecurity-awareness-for-your-team',
    title: 'Cybersecurity Awareness for Your Team',
    description:
      'Practical habits that keep your systems, data, and accounts safe.',
    date: '2025-02-28',
    body: [
      'Most breaches start with people, not technology: a phishing message, a reused password, an unknown flash drive. Technology controls matter, but trained staff are the layer attackers meet first.',
      'Build four habits across the team: unique passwords with multi-factor authentication where available, verifying payment-change requests by phone before acting, locking screens when stepping away, and reporting suspicious messages instead of clicking. FontWandel reinforces this with security awareness training.',
    ],
  },
];

export const references: Article[] = [
  {
    slug: 'fontwandel-service-catalog',
    title: 'FontWandel Service Catalog',
    description: 'The six core services at a glance.',
    date: '2025-01-20',
    body: [
      'FontWandel\u2019s work is organized into six core services: Digital Transformation & Business Automation; Systems & Web Development; IT Office Maintenance & Infrastructure Servicing; Cybersecurity Solutions; Digital Payments & Systems Integration; and Data, Analytics & Intelligence.',
      'Distinct from bespoke services, Wandel Suite is our line of ready-to-deploy products — Net Kitonga, Duka Kamili, SmrtEvent, and Foleni Kiganjani — sold or licensed directly to businesses. To engage us, start with a conversation: contact us and we will map the right solution through Discover, Design, Build, Secure, and Optimize.',
    ],
  },
  {
    slug: 'getting-started-with-fontwandel',
    title: 'Getting Started with FontWandel',
    description: 'How an engagement runs, from first call to ongoing support.',
    date: '2025-01-15',
    body: [
      'Every engagement follows five steps. Discover: we study your operations and pain points. Design: we map the right digital solution to the real problem. Build: we develop and deploy the system. Secure: cybersecurity is applied by design. Optimize: we monitor, refine, and scale over time.',
      'After go-live, support continues through FontWandel Connect — raise any case by email — plus helpdesk assistance remote and on-site, and staff training so your team owns the system with confidence.',
    ],
  },
  {
    slug: 'working-with-your-new-system',
    title: 'Working With Your New System',
    description: 'Roles, habits, and review rhythms after go-live.',
    date: '2025-01-10',
    body: [
      'A new system succeeds when people know their part: who submits, who approves, who reviews exceptions, and who calls support. Define these roles on day one and revisit them as the team changes.',
      'Keep a weekly review rhythm — exceptions, pending approvals, and one KPI that matters — and raise support cases early rather than working around problems. Small issues reported fast stay small.',
    ],
  },
];
