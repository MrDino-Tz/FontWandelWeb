import Button from '../ui/Button';
import Icon from '../ui/Icon';
import { asset } from '../../utils/base';

const showcaseFeatures = [
  {
    title: 'Digital Transformation & Business Automation',
    description: 'Turning manual, paper- and spreadsheet-based operations into connected digital workflows — process digitization, digital forms and approvals, CRM and ERP systems, and document management.',
    image: '/assets/images/automation-workflow.svg',
    className: 'content-center border-b border-dashed border-slate-400 py-5 sm:col-span-2 sm:p-5',
    imgClass: 'mx-auto mt-10 rounded-xl shadow-lg sm:w-[75%]',
  },
  {
    title: 'Systems & Web Development',
    description: 'End-to-end design and development of custom systems, business websites, and mobile applications — from corporate, NGO, school, and church sites to e-commerce, booking, portals, and SaaS platforms.',
    image: '/assets/images/graph.webp',
    className: 'content-center py-5 sm:row-start-2 sm:p-5 sm:py-10',
    imgClass: 'ml-auto mr-auto mt-10 w-[65%] rounded-xl shadow-lg sm:ml-0 sm:w-[45%]',
  },
  {
    title: 'IT Maintenance & Infrastructure',
    description: 'Your on-call IT vendor for offices, schools, SMEs, and corporates — installations and support, server and network infrastructure, cloud solutions and backup, helpdesk, CCTV servicing, and hardware supply.',
    image: '/assets/images/dashboard.webp',
    className: 'content-center border-t border-dashed border-slate-400 py-5 sm:row-span-2 sm:row-start-2 sm:border-l sm:border-t-0 sm:p-5 sm:text-right',
    imgClass: 'ml-auto mr-auto mt-10 w-[80%] rounded-xl shadow-lg sm:mr-0',
  },
  {
    title: 'And more...',
    description: '',
    moreFeatures: [
      'Cybersecurity Solutions — assessments, network and endpoint security, and awareness training, built in by design',
      'Digital Payments & Systems Integration — mobile-money, billing and subscriptions, reconciliation, and API integrations',
      'Data, Analytics & Intelligence — data collection and MIS, dashboards and BI, automated reporting and KPI tracking',
    ],
    className: 'content-center border-t border-dashed border-slate-400 py-5 sm:p-5',
    imgClass: '',
  },
];

export function FeatureShowcase() {
  return (
    <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-20">
      <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
        <h2 className="text-2xl font-semibold text-balance text-slate-800 md:text-3xl md:leading-tight">
          Our core services
        </h2>
        <p className="mt-1 text-pretty text-slate-600">
          Six connected services that replace fragmented, manual processes with secure digital operations.
        </p>
      </div>
      <div className="mx-auto grid max-w-[85rem] px-4 pb-10 sm:grid-cols-2 sm:grid-rows-3 sm:px-6 lg:px-8 lg:pb-14">
        {showcaseFeatures.map((f) => (
          <div key={f.title} className={f.className}>
            <h2 className="text-2xl font-bold text-slate-600">{f.title}</h2>
            {f.description && (
              <p className="mt-2 text-base/6 text-slate-600" dangerouslySetInnerHTML={{ __html: f.description }} />
            )}
            {'image' in f && f.image && (
              <img src={asset(f.image)} alt="" className={f.imgClass} loading="lazy" />
            )}
            {'moreFeatures' in f && f.moreFeatures && (
              <ul className="mt-4 ml-4 w-4/5 list-inside list-disc space-y-2 text-base/6 text-slate-600 marker:text-teal-600">
                {(f.moreFeatures as string[]).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const gridFeatures = [
  {
    borderClasses: 'md:border-l md:border-r',
    gradientClasses: 'bg-linear-to-l from-teal-200 to-transparent',
    icon: 'cursorRays' as const,
    heading: 'One technology partner',
    description:
      'Systems, infrastructure, and cybersecurity from a single partner — no juggling vendors, no disconnected tools.',
  },
  {
    borderClasses: 'border-b border-t md:border-b-0',
    gridClasses: 'md:col-start-2 md:col-end-3',
    gradientClasses: 'bg-linear-to-t from-teal-200 to-transparent',
    icon: 'cog' as const,
    heading: 'Built around your operations',
    description:
      'Solutions mapped to your actual operations, not generic templates — connected systems instead of one-off, siloed tools.',
  },
  {
    borderClasses: 'md:border-l md:border-r md:border-t',
    gridClasses: 'md:col-end-4',
    gradientClasses: 'bg-linear-to-tl from-teal-200 to-transparent',
    icon: 'puzzle' as const,
    heading: 'Secure and scalable by design',
    description:
      'Security built in from the ground up, on solutions that grow from a single SME to a multi-branch corporate or government office.',
  },
];

export function FeatureGrid() {
  return (
    <section className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-20">
      <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-3 md:grid-rows-2">
        <div className="mx-auto max-w-lg pb-5 text-center md:col-span-2 lg:mx-0 lg:flex-auto lg:text-left">
          <h2 className="text-2xl font-semibold tracking-tight text-balance text-slate-800 md:text-3xl md:leading-tight">
            Why choose <span className="text-navy-800">Font</span><span className="font-normal text-slate-400">Wandel</span>?
          </h2>
          <p className="mt-6 text-start text-lg/8 text-pretty text-slate-700 sm:text-center md:text-start">
            One technology partner for your systems, infrastructure, and cybersecurity — solutions built around your actual operations, secure by design, and ready to scale with you.
          </p>
        </div>
        {gridFeatures.map((f) => (
          <div key={f.heading} className={`group relative mx-auto flex flex-col border-dashed border-slate-400 py-10 ${f.borderClasses} ${'gridClasses' in f ? (f as { gridClasses: string }).gridClasses : ''}`}>
            <div className={`group pointer-events-none absolute inset-0 h-full w-full ${f.gradientClasses} opacity-0 transition duration-300 group-hover:opacity-100`} />
            <div className="relative z-10 mb-4 px-10">
              <Icon name={f.icon} />
            </div>
            <div className="relative z-10 mb-2 px-10 text-lg font-semibold">
              <span className="inline-block text-balance text-slate-800 transition duration-300 group-hover:translate-x-2">
                {f.heading}
              </span>
            </div>
            <p className="z-10 max-w-sm px-4 text-sm text-pretty text-slate-700 sm:max-w-lg md:mx-auto">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ icon, description, styleClass = '' }: { icon: 'dataBase' | 'brain' | 'lightbulb'; description: string; styleClass?: string }) {
  return (
    <div className={`relative z-10 flex items-center gap-4 rounded-2xl bg-white/80 backdrop-blur px-5 py-4 shadow-lg max-w-sm ${styleClass}`}>
      <Icon name={icon} />
      <p className="text-sm text-slate-700">{description}</p>
    </div>
  );
}

export function FeatureAnimated() {
  return (
    <section className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-20">
      <div className="relative isolate overflow-hidden rounded-3xl bg-teal-400 px-6 pt-16 shadow-xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
        <svg viewBox="0 0 1024 1024" className="absolute top-1/2 left-1/2 -z-10 size-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0" aria-hidden="true">
          <circle cx="512" cy="512" r="512" fill="url(#gradient_2)" fillOpacity="0.7" />
      <defs>
        <radialGradient id="gradient_2">
          <stop offset="0" stop-color="#0E7CB5"></stop>
          <stop offset="1" stop-color="#0E7CB5"></stop>
        </radialGradient>
      </defs>
        </svg>
        <div className="mx-auto my-auto max-w-md text-left sm:text-center lg:mx-0 lg:flex-auto lg:text-left">
          <h2 className="text-2xl font-semibold tracking-tight text-balance text-slate-800 md:text-3xl md:leading-tight">
            From discovery to ongoing support
          </h2>
          <p className="mt-6 text-lg/8 text-pretty text-slate-700">
            We understand your operational problems first, then apply technology to solve them — and stay with you long after go-live.
          </p>
          <div className="mt-10 flex items-center justify-start gap-x-6 sm:justify-center lg:justify-start">
            <Button to="/about" variant="tertiary" className="group inline-flex items-center justify-center gap-x-2 py-2.5 pr-4 pl-5 text-slate-700">
              Learn More <Icon name="chevronRight" />
            </Button>
          </div>
        </div>
        <div className="relative my-16 flex flex-col gap-y-7 lg:my-8">
          <FeatureCard icon="dataBase" description="Discover & design — we study your operations, then map the right solution." />
          <FeatureCard icon="brain" description="Build & secure — we develop and deploy with cybersecurity by design." styleClass="self-center" />
          <FeatureCard icon="lightbulb" description="Optimize — we monitor, refine, and scale with you over time." styleClass="self-end" />
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-20">
      <div className="mx-auto mb-10 max-w-3xl text-center lg:mb-14">
        <h2 className="text-4xl text-balance text-slate-800 sm:text-5xl">
          Transform your business today. <br /> Get started with <span className="font-medium text-navy-800">Font</span><span className="font-light text-slate-400">Wandel</span>.
        </h2>
        <p className="mt-5 text-pretty text-slate-600">
          Tell us about your operations — we&apos;ll map the right digital solution and walk with you from discovery to ongoing support.
        </p>
        <Button to="/contact" variant="primary" className="mt-7 inline-flex border-none px-3.5">
          Get in Touch
        </Button>
      </div>
    </section>
  );
}
