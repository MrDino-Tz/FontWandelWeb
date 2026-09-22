import { Link } from 'react-router-dom';
import Icon from '../components/ui/Icon';
import { asset } from '../utils/base';

const productsLive = ['Net Kitonga', 'Duka Kamili', 'SmrtEvent', 'Foleni Kiganjani'];
const whoTheyAreFor = ['Entrepreneurs', 'SMEs & Retail Shops', 'Event Organizers', 'Churches & Associations', 'Salons & Barbershops', 'Hospitals & Service Points'];
const comingSoon = ['School Management', 'QR Staff Attendance', 'Property Management', 'Expense Tracking', 'Queue Management', 'Membership Management'];

function Marquee({ items, duration = '30s', reverse = false }: { items: string[]; duration?: string; reverse?: boolean }) {
  return (
    <div className="group flex flex-row overflow-hidden p-2">
      <div
        className="animate-scroll flex w-max min-w-full shrink-0 flex-row flex-nowrap justify-around gap-5"
        style={{ ['--duration' as string]: duration, ['--direction' as string]: reverse ? 'reverse' : 'forwards' }}
        aria-hidden="true"
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-5 rounded-md bg-white px-4 py-2 text-slate-700 shadow-md ring-1 ring-white/15">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Platform() {
  return (
    <>
      <section className="mx-auto max-w-[85rem] px-4 pt-48 pb-12 sm:px-6 lg:px-8">
        <div className="max-w-7xl">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl text-balance text-slate-800 sm:text-5xl md:text-6xl lg:text-7xl">
              Software that works on day one
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-slate-700 sm:text-xl/8">
              Wandel Suite is FontWandel&apos;s own line of ready-to-deploy software products — sold and licensed directly to businesses. Four products are already live.
            </p>
          </div>
          <div className="relative m-auto w-full pt-16 sm:w-[90%]">
            <div className="aspect-video">
              <svg viewBox="0 0 800 450" className="aspect-auto w-full rounded-xl bg-white shadow-lg ring-1 ring-slate-200" role="img" aria-label="Data flowing from sources through processing to live dashboards">
                <circle cx="726" cy="60" r="24" fill="#B3DBF0" opacity="0.45" />
                <circle cx="70" cy="392" r="16" fill="#B3DBF0" opacity="0.35" />

                {/* Sources */}
                <rect x="40" y="40" width="120" height="100" rx="16" fill="#FFFFFF" stroke="#D8DEE7" strokeWidth="3" />
                <rect x="78" y="62" width="44" height="56" fill="#FFFFFF" stroke="#0C648F" strokeWidth="5" />
                <line x1="78" y1="81" x2="122" y2="81" stroke="#0C648F" strokeWidth="4" />
                <line x1="78" y1="99" x2="122" y2="99" stroke="#B9C2CF" strokeWidth="4" />
                <line x1="100" y1="62" x2="100" y2="118" stroke="#0C648F" strokeWidth="4" />

                <rect x="40" y="175" width="120" height="100" rx="16" fill="#FFFFFF" stroke="#D8DEE7" strokeWidth="3" />
                <path d="M64 242 a16 16 0 0 1 3 -31 a21 21 0 0 1 40 -7 a18 18 0 0 1 7 38 z" fill="#D9EDF8" stroke="#0C648F" strokeWidth="5" strokeLinejoin="round" />

                <rect x="40" y="310" width="120" height="100" rx="16" fill="#FFFFFF" stroke="#D8DEE7" strokeWidth="3" />
                <ellipse cx="100" cy="342" rx="22" ry="8" fill="#FFFFFF" stroke="#0C648F" strokeWidth="5" />
                <rect x="78" y="342" width="44" height="30" fill="#D9EDF8" />
                <line x1="78" y1="342" x2="78" y2="372" stroke="#0C648F" strokeWidth="5" />
                <line x1="122" y1="342" x2="122" y2="372" stroke="#0C648F" strokeWidth="5" />
                <path d="M78 372 A22 8 0 0 0 122 372" fill="none" stroke="#0C648F" strokeWidth="5" />

                {/* Ingestion flows */}
                <g stroke="#1590C6" strokeWidth="5" strokeLinecap="round" fill="none">
                  <line x1="166" y1="90" x2="324" y2="170" className="fw-flow" />
                  <line x1="166" y1="225" x2="324" y2="225" className="fw-flow" />
                  <line x1="166" y1="360" x2="324" y2="280" className="fw-flow" />
                </g>

                {/* Processor */}
                <rect x="330" y="155" width="140" height="140" rx="28" fill="#0C648F" />
                <g className="fw-spin-slow">
                  <g transform="translate(400,225)" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round">
                    <line x1="0" y1="-34" x2="0" y2="-18" />
                    <line x1="0" y1="18" x2="0" y2="34" />
                    <line x1="-34" y1="0" x2="-18" y2="0" />
                    <line x1="18" y1="0" x2="34" y2="0" />
                    <line x1="-24" y1="-24" x2="-13" y2="-13" />
                    <line x1="13" y1="13" x2="24" y2="24" />
                    <line x1="24" y1="-24" x2="13" y2="-13" />
                    <line x1="-13" y1="13" x2="-24" y2="24" />
                  </g>
                  <circle cx="400" cy="225" r="22" fill="#0C648F" stroke="#FFFFFF" strokeWidth="8" />
                </g>

                {/* Output flow */}
                <line x1="476" y1="225" x2="554" y2="225" stroke="#1590C6" strokeWidth="5" strokeLinecap="round" className="fw-flow" />

                {/* Dashboard output */}
                <rect x="560" y="110" width="200" height="230" rx="20" fill="#FFFFFF" stroke="#D8DEE7" strokeWidth="3" />
                <circle cx="586" cy="136" r="5" fill="#D8DEE7" />
                <circle cx="604" cy="136" r="5" fill="#D8DEE7" />
                <circle cx="622" cy="136" r="5" fill="#D8DEE7" />
                <polyline points="588,190 618,172 648,180 678,156" fill="none" stroke="#0C648F" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="678" cy="156" r="7" fill="#0C648F" />
                <rect x="590" y="250" width="26" height="60" rx="6" fill="#B3DBF0" className="fw-bar" style={{ animationDelay: '0.3s' }} />
                <rect x="626" y="225" width="26" height="85" rx="6" fill="#1590C6" className="fw-bar" style={{ animationDelay: '0.8s' }} />
                <rect x="662" y="245" width="26" height="65" rx="6" fill="#0C648F" className="fw-bar" style={{ animationDelay: '0.1s' }} />
                <rect x="698" y="210" width="26" height="100" rx="6" fill="#1590C6" className="fw-bar" style={{ animationDelay: '0.6s' }} />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[85rem] border-b border-dashed border-slate-400 px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-balance text-slate-800 md:text-3xl md:leading-tight">
              Four products, live today
            </h2>
            <p className="mt-6 max-w-3xl text-lg/8 text-pretty text-slate-700">
              Each product solves one operational problem end to end — and every product is backed by FontWandel Connect support.
            </p>
            <div className="mt-8 flex flex-col gap-4">
              {[
                'Net Kitonga — voucher generation and billing for hotspot internet businesses, hardware included',
                'Duka Kamili — invoicing, inventory tracking, and sales management in one platform',
                'SmrtEvent — smart cards, contribution tracking, event highlights, and RSVP confirmation',
                'Foleni Kiganjani — digital ticketing and notifications that end wait-time chaos',
              ].map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <Icon name="checkCircle" />
                  <p className="text-slate-600">{f}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex flex-col items-center justify-center gap-8 rounded-xl p-6">
            <img src={asset('/assets/images/platform-automation.svg')} alt="Connected systems illustration" className="rounded-xl shadow-lg" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[85rem] border-b border-dashed border-slate-400 px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="order-last md:order-first">
            <img src={asset('/assets/images/platform-analytics.svg')} alt="Analytics illustration" className="rounded-xl shadow-lg" />
          </div>
          <div className="text-end">
            <h2 className="text-2xl font-semibold tracking-tight text-balance text-slate-800 md:text-3xl md:leading-tight">
              On the roadmap
            </h2>
            <p className="mt-6 max-w-3xl text-lg/8 text-pretty text-slate-700">
              Coming soon to Wandel Suite: a school management system, QR staff attendance with payroll integration, property management software, expense tracking and budget reporting, queue management for hospitals, banks, and restaurants, and membership management for gyms and associations.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-20">
        <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2 md:justify-items-end">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-balance text-slate-800 md:text-3xl md:leading-tight">
              Wandel Suite at a glance
            </h2>
            <p className="mt-6 max-w-3xl text-lg/8 text-pretty text-slate-700">
              Four products live today and more on the way — each one sold or licensed directly to businesses like yours.
            </p>
          </div>
          <div className="h-full w-full">
            <div className="relative flex h-full flex-col justify-center rounded-lg py-8">
              <Marquee items={productsLive} duration="30s" />
              <Marquee items={whoTheyAreFor} duration="40s" reverse />
              <Marquee items={comingSoon} duration="20s" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[85rem] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="group relative isolate overflow-hidden rounded-3xl bg-teal-200 p-5 sm:p-11">
          <div className="svgBlock mx-auto max-w-7xl relative">
            <div className="relative z-5 mx-auto text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-balance text-slate-800 md:text-3xl md:leading-tight">
                Talk to us about Wandel Suite
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-lg/8 text-pretty text-slate-700">
                Whether a ready product fits or you need something bespoke, it starts with a conversation about your operations.
              </p>
              <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-4 sm:flex-row sm:justify-center">
                <Link to="/contact" className="mx-auto flex w-full items-center justify-center rounded-lg px-3.5 py-2.5 text-center text-sm font-semibold bg-teal-50 hover:bg-teal-50/70 text-slate-800 sm:w-1/2">
                  Get in Touch
                </Link>
                <Link to="/about" className="mx-auto flex w-full items-center justify-center rounded-lg px-3.5 py-2.5 text-center text-sm font-semibold bg-teal-600 text-white hover:bg-teal-600/80 sm:w-1/2">
                  About FontWandel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
