import { Link } from 'react-router-dom';
import Icon from '../components/ui/Icon';

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
              <img
                src="https://images.pexels.com/photos/9301762/pexels-photo-9301762.jpeg?auto=compress&cs=tinysrgb&w=1260"
                alt="Team collaborating in front of a large screen"
                loading="eager"
                className="h-full w-full rounded-xl object-cover shadow-lg"
              />
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
            <img src="https://images.pexels.com/photos/8204363/pexels-photo-8204363.jpeg?auto=compress&cs=tinysrgb&w=1260" alt="Team collaborating on data at a modern workspace" loading="lazy" className="rounded-xl shadow-lg" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[85rem] border-b border-dashed border-slate-400 px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="order-last md:order-first">
            <img src="https://images.pexels.com/photos/9301737/pexels-photo-9301737.jpeg?auto=compress&cs=tinysrgb&w=1260" alt="Professionals analyzing data in a modern office" loading="lazy" className="rounded-xl shadow-lg" />
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
