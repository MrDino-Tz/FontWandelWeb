import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { IconName } from '../components/ui/Icon';
import { apiGet, apiSend } from '../api';

const STORAGE_KEY = 'fontwandel-site-content-v1';

export interface Btn {
  label: string;
  to: string;
}

export interface HeroContent {
  bannerText: string;
  bannerLinkText: string;
  bannerTo: string;
  title: string;
  subtitle: string;
  primaryBtn: Btn;
  secondaryBtn: Btn;
}

export type HomeSectionId =
  | 'hero'
  | 'showcase'
  | 'animated'
  | 'grid'
  | 'cta'
  | 'contact';

export interface HomeLayoutItem {
  id: HomeSectionId;
  visible: boolean;
}

export interface ShowcaseItem {
  title: string;
  description: string;
  /** Omitted for the trailing "more" block, which lists bullets instead. */
  image?: string;
  bullets: string[];
}

export interface ShowcaseContent {
  heading: string;
  sub: string;
  moreTitle: string;
  items: ShowcaseItem[];
}

export interface GridCard {
  heading: string;
  description: string;
  icon: IconName;
}

export interface GridContent {
  lead: string;
  accentA: string;
  accentB: string;
  suffix: string;
  intro: string;
  cards: GridCard[];
}

export interface AnimatedContent {
  title: string;
  sub: string;
  cta: Btn;
  cards: string[];
}

export interface CtaContent {
  line1: string;
  lead: string;
  accentA: string;
  accentB: string;
  sub: string;
  btn: Btn;
}

export interface Stat {
  label: string;
  value: string;
}

export interface FoundationItem {
  title: string;
  description: string;
}

export interface AboutContent {
  title: string;
  description: string;
  stats: Stat[];
  foundationTitle: string;
  foundation: FoundationItem[];
  leadershipTitle: string;
  leadership: string[];
}

export interface ChannelLine {
  label: string;
  href: string;
}

export interface Channel {
  title: string;
  icon: IconName;
  lines: ChannelLine[];
}

export interface ContactContent {
  heading: string;
  intro: string;
  channels: Channel[];
}

export interface FooterContent {
  companyName: string;
  description: string;
}

export interface SiteContent {
  hero: HeroContent;
  homeLayout: HomeLayoutItem[];
  showcase: ShowcaseContent;
  grid: GridContent;
  animated: AnimatedContent;
  cta: CtaContent;
  about: AboutContent;
  contact: ContactContent;
  footer: FooterContent;
}

export const AVAILABLE_IMAGES = [
  '/assets/images/automation-workflow.svg',
  '/assets/images/graph.webp',
  '/assets/images/dashboard.webp',
  '/assets/images/net-kitonga.svg',
  '/assets/images/duka-kamili.svg',
  '/assets/images/smrtevent.svg',
  '/assets/images/foleni-kiganjani.svg',
  '/assets/images/platform-automation.svg',
  '/assets/images/platform-analytics.svg',
];

export const AVAILABLE_ICONS: IconName[] = [
  'arrowDownRight',
  'chevronRight',
  'cursorRays',
  'cog',
  'puzzle',
  'dataBase',
  'brain',
  'lightbulb',
  'chartPie',
  'portfolio',
  'presentationChart',
  'articles',
  'documentChartBar',
  'blankDocument',
  'documentMagnifyingGlass',
  'info',
  'mobile',
  'email',
  'world',
  'mapPin',
  'download',
  'badge',
  'chatBubble',
  'arrowPath',
  'check',
  'checkCircle',
  'thumbUp',
  'thumbDown',
];

const defaults: SiteContent = {
  hero: {
    bannerText: 'FontWandel Technologies Ltd',
    bannerLinkText: 'Bridging Organizations to Digital Transformation',
    bannerTo: '/about',
    title: 'Enable Digital Transformation for Economy Shift',
    subtitle:
      'We work with organizations, businesses, institutions, and communities to turn digital challenges into practical, connected, and secure solutions — from software development and cybersecurity to data intelligence, digital platforms, and payment integrations.',
    primaryBtn: { label: 'Discover FontWandel', to: '/about' },
    secondaryBtn: { label: 'Get in Touch', to: '/contact' },
  },
  homeLayout: [
    { id: 'hero', visible: true },
    { id: 'showcase', visible: true },
    { id: 'animated', visible: true },
    { id: 'grid', visible: true },
    { id: 'cta', visible: true },
    { id: 'contact', visible: true },
  ],
  showcase: {
    heading: 'Our core services',
    sub: 'Six connected services that replace fragmented, manual processes with secure digital operations.',
    moreTitle: 'And more...',
    items: [
      {
        title: 'Digital Transformation & Business Automation',
        description:
          'Turning manual, paper- and spreadsheet-based operations into connected digital workflows — process digitization, digital forms and approvals, CRM and ERP systems, and document management.',
        image: '/assets/images/automation-workflow.svg',
        bullets: [],
      },
      {
        title: 'Systems & Web Development',
        description:
          'End-to-end design and development of custom systems, business websites, and mobile applications — from corporate, NGO, school, and church sites to e-commerce, booking, portals, and SaaS platforms.',
        image: '/assets/images/graph.webp',
        bullets: [],
      },
      {
        title: 'IT Maintenance & Infrastructure',
        description:
          'Your on-call IT vendor for offices, schools, SMEs, and corporates — installations and support, server and network infrastructure, cloud solutions and backup, helpdesk, CCTV servicing, and hardware supply.',
        image: '/assets/images/dashboard.webp',
        bullets: [],
      },
      {
        title: 'Cybersecurity Solutions',
        description: '',
        bullets: [
          'Cybersecurity Solutions — assessments, network and endpoint security, and awareness training, built in by design',
          'Digital Payments & Systems Integration — mobile-money, billing and subscriptions, reconciliation, and API integrations',
          'Data, Analytics & Intelligence — data collection and MIS, dashboards and BI, automated reporting and KPI tracking',
        ],
      },
    ],
  },
  grid: {
    lead: 'Why choose ',
    accentA: 'Font',
    accentB: 'Wandel',
    suffix: '?',
    intro:
      'One technology partner for your systems, infrastructure, and cybersecurity — solutions built around your actual operations, secure by design, and ready to scale with you.',
    cards: [
      {
        heading: 'One technology partner',
        description:
          'Systems, infrastructure, and cybersecurity from a single partner — no juggling vendors, no disconnected tools.',
        icon: 'cursorRays',
      },
      {
        heading: 'Built around your operations',
        description:
          'Solutions mapped to your actual operations, not generic templates — connected systems instead of one-off, siloed tools.',
        icon: 'cog',
      },
      {
        heading: 'Secure and scalable by design',
        description:
          'Security built in from the ground up, on solutions that grow from a single SME to a multi-branch corporate or government office.',
        icon: 'puzzle',
      },
    ],
  },
  animated: {
    title: 'From discovery to ongoing support',
    sub: 'We understand your operational problems first, then apply technology to solve them — and stay with you long after go-live.',
    cta: { label: 'Learn More', to: '/about' },
    cards: [
      'Discover & design — we study your operations, then map the right solution.',
      'Build & secure — we develop and deploy with cybersecurity by design.',
      'Optimize — we monitor, refine, and scale with you over time.',
    ],
  },
  cta: {
    line1: 'Transform your business today.',
    lead: 'Get started with ',
    accentA: 'Font',
    accentB: 'Wandel',
    sub: "Tell us about your operations — we'll map the right digital solution and walk with you from discovery to ongoing support.",
    btn: { label: 'Get in Touch', to: '/contact' },
  },
  about: {
    title: 'FontWandel Technologies',
    description:
      'is a digital transformation and innovation company committed to enabling a more digitally empowered future. We believe technology is more than a tool — it is a catalyst for transforming how organizations operate, how people connect, how decisions are made, and how opportunities are created.',
    stats: [
      { label: 'Core services', value: '6' },
      { label: 'Wandel Suite products live', value: '4' },
      { label: 'Sectors served', value: '7' },
    ],
    foundationTitle: 'What drives us:',
    foundation: [
      {
        title: 'Our vision:',
        description:
          'Fostering a digital enabled economy where innovation and technology accelerate sustainable growth, opportunities, and transformation.',
      },
      {
        title: 'Our mission:',
        description:
          'To enable organizations and communities to embrace digital transformation by delivering innovative, secure, and connected technology solutions that improve productivity, unlock opportunity, and accelerate sustainable growth.',
      },
      {
        title: 'Our values — F.O.N.T:',
        description:
          'Forward Thinking, Ownership, Nurturing Innovation, and Trust — anticipating emerging technology shifts, taking full accountability for outcomes, continuously improving what we ship, and earning long-term partnerships through reliability and transparency.',
      },
    ],
    leadershipTitle: 'Leadership',
    leadership: [
      'FontWandel is run by a lean team of 9 — 6 working team members delivering development, IT support, and cybersecurity services, and 3 board members providing strategic guidance and oversight.',
      'Chrispin Silvery Karengi — Founder & Technical Director. A BSc Cybersecurity and Information Technology graduate, leading FontWandel\u2019s strategic direction and technical delivery, from systems architecture and cybersecurity to the rollout of digital transformation projects for government institutions, schools, SMEs, and corporate organizations. Areas of focus: Cybersecurity, Systems Architecture, Digital Strategy, IT Infrastructure.',
    ],
  },
  contact: {
    heading: 'Get in touch',
    intro:
      'Based in Arusha, Tanzania — reach out for general inquiries, or raise a support case directly with our team.',
    channels: [
      {
        title: 'General inquiries',
        icon: 'email',
        lines: [
          { label: 'Info@fontwandel.co.tz', href: 'mailto:info@fontwandel.co.tz' },
          { label: '+255 757 830 276', href: 'tel:+255757830276' },
        ],
      },
      {
        title: 'Support & cases',
        icon: 'chatBubble',
        lines: [
          { label: 'Connect@fontwandel.co.tz', href: 'mailto:connect@fontwandel.co.tz' },
          { label: '+255 792 476 367', href: 'tel:+255792476367' },
        ],
      },
    ],
  },
  footer: {
    companyName: 'FontWandel Technologies Ltd.',
    description:
      'FontWandel Technologies Ltd. is a digital transformation and innovation company enabling organizations to embrace secure, connected technology.',
  },
};

function load(): SiteContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as Partial<SiteContent>;
    if (!parsed.hero || !parsed.homeLayout) return defaults;
    return { ...defaults, ...parsed };
  } catch {
    return defaults;
  }
}

type Path = (string | number)[];

function setIn<T>(obj: T, path: Path, value: unknown): T {
  if (path.length === 0) return value as T;
  const [head, ...rest] = path;
  if (Array.isArray(obj)) {
    const clone = [...obj];
    clone[head as number] = setIn(clone[head as number], rest, value);
    return clone as T;
  }
  const clone = { ...(obj as Record<string, unknown>) };
  clone[head as string] = setIn(clone[head as string], rest, value);
  return clone as T;
}

export type SyncStatus = 'idle' | 'saving' | 'saved' | 'error';

interface Store {
  content: SiteContent;
  sync: SyncStatus;
  set: (path: Path, value: unknown) => void;
  push: <T>(path: Path, item: T) => void;
  removeAt: (path: Path, index: number) => void;
  moveHomeSection: (index: number, dir: -1 | 1) => void;
  toggleHomeSection: (index: number) => void;
  reset: () => void;
}

const Ctx = createContext<Store | null>(null);

const SAVE_DEBOUNCE_MS = 500;

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(load);
  const [sync, setSync] = useState<SyncStatus>('idle');
  const contentRef = useRef<SiteContent>(content);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const apply = useCallback((next: SiteContent) => {
    contentRef.current = next;
    setContent(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
    setSync('saving');
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      apiSend<SiteContent>('PUT', '/content', next)
        .then(() => setSync('saved'))
        .catch(() => setSync('error'));
    }, SAVE_DEBOUNCE_MS);
  }, []);

  useEffect(() => {
    let cancelled = false;
    apiGet<Partial<SiteContent>>('/content')
      .then((data) => {
        if (cancelled) return;
        const merged = { ...defaults, ...data } as SiteContent;
        if (!merged.hero || !merged.homeLayout) return;
        contentRef.current = merged;
        setContent(merged);
      })
      .catch(() => {
        /* backend unreachable — keep the localStorage copy */
      });
    return () => {
      cancelled = true;
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, []);

  const set = useCallback(
    (path: Path, value: unknown) => {
      apply(setIn(contentRef.current, path, value));
    },
    [apply],
  );

  const push = useCallback(
    <T,>(path: Path, item: T) => {
      const arr = path.reduce<unknown>(
        (acc, key) => (acc as Record<string, unknown>)[key as string],
        contentRef.current,
      ) as unknown[];
      apply(setIn(contentRef.current, path, [...arr, item]));
    },
    [apply],
  );

  const removeAt = useCallback(
    (path: Path, index: number) => {
      const arr = path.reduce<unknown>(
        (acc, key) => (acc as Record<string, unknown>)[key as string],
        contentRef.current,
      ) as unknown[];
      apply(
        setIn(
          contentRef.current,
          path,
          arr.filter((_, i) => i !== index),
        ),
      );
    },
    [apply],
  );

  const moveHomeSection = useCallback(
    (index: number, dir: -1 | 1) => {
      const order = [...contentRef.current.homeLayout];
      const j = index + dir;
      if (j < 0 || j >= order.length) return;
      [order[index], order[j]] = [order[j], order[index]];
      apply({ ...contentRef.current, homeLayout: order });
    },
    [apply],
  );

  const toggleHomeSection = useCallback(
    (index: number) => {
      const order = contentRef.current.homeLayout.map((item, i) =>
        i === index ? { ...item, visible: !item.visible } : item,
      );
      apply({ ...contentRef.current, homeLayout: order });
    },
    [apply],
  );

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* storage unavailable */
    }
    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
      saveTimer.current = null;
    }
    const show = (next: SiteContent) => {
      contentRef.current = next;
      setContent(next);
      setSync('idle');
    };
    apiSend<SiteContent>('POST', '/content/reset')
      .then((data) => show({ ...defaults, ...data } as SiteContent))
      .catch(() => show(defaults));
  }, []);

  const value = useMemo(
    () => ({
      content,
      sync,
      set,
      push,
      removeAt,
      moveHomeSection,
      toggleHomeSection,
      reset,
    }),
    [content, sync, set, push, removeAt, moveHomeSection, toggleHomeSection, reset],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useContent(): Store {
  const store = useContext(Ctx);
  if (!store) throw new Error('useContent must be used inside SiteContentProvider');
  return store;
}

export { defaults as defaultContent };
