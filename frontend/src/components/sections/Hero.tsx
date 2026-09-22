import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

export function AnnouncementBanner() {
  const text = 'FontWandel Technologies Ltd';
  const linkText = 'Bridging Organizations to Digital Transformation';
  return (
    <div className="flex justify-center">
      <div className="rounded-xl bg-slate-50 shadow-md">
        <Link
          to="/about"
          className="group flex h-9 w-fit items-center justify-center gap-0 rounded-xl transition duration-300"
          aria-label={`${text} - ${linkText}`}
        >
          <div className="flex h-full w-fit items-center gap-2 rounded-xl bg-linear-to-tr from-gold-600 to-gold-500 px-3">
            <span className="text-sm font-medium text-black">{text}</span>
          </div>
          <div className="hidden h-full w-fit items-center justify-center gap-2 px-3 sm:flex">
            <span className="text-sm transition duration-300 group-hover:underline">{linkText}</span>
            <Icon name="chevronRight" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export function HeroContent() {
  return (
    <>
      <div className="mx-auto max-w-4xl text-left select-none sm:text-center">
        <h1 className="block text-4xl text-balance text-slate-800 sm:text-5xl md:text-6xl lg:text-7xl">
          Enable Digital Transformation for Economy Shift
        </h1>
      </div>
      <div className="mx-auto max-w-3xl text-left sm:text-center">
        <p className="text-lg text-pretty text-slate-700">
          We work with organizations, businesses, institutions, and communities to turn digital challenges into practical, connected, and secure solutions — from software development and cybersecurity to data intelligence, digital platforms, and payment integrations.
        </p>
      </div>
      <div className="flex flex-col justify-center gap-5 sm:flex-row">
        <Button to="/contact" variant="secondary">Get in Touch</Button>
        <Button to="/about" variant="primary">Discover FontWandel</Button>
      </div>
    </>
  );
}

const chartBars = [
  { x: 28, h: 76, delay: '0s', fill: '#B3DBF0' },
  { x: 88, h: 118, delay: '0.4s', fill: '#79C2E3' },
  { x: 148, h: 92, delay: '0.8s', fill: '#B3DBF0' },
  { x: 208, h: 142, delay: '0.2s', fill: '#1590C6' },
  { x: 268, h: 108, delay: '0.9s', fill: '#79C2E3' },
  { x: 328, h: 158, delay: '0.5s', fill: '#0C648F' },
  { x: 388, h: 126, delay: '1.1s', fill: '#1590C6' },
  { x: 448, h: 170, delay: '0.7s', fill: '#0C648F' },
];

export function HeroVideo() {
  return (
    <div className="relative m-auto w-full pt-16 sm:w-[90%]">
      <div className="via-off-white to-off-white pointer-events-none absolute inset-x-0 -bottom-2 z-10 hidden h-20 w-full bg-linear-to-b from-transparent sm:block" />

      {/* Floating notification: payment */}
      <div className="fw-float absolute top-24 -left-2 z-20 hidden items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-lg ring-1 ring-slate-200 sm:flex lg:left-[-3%]">
        <Icon name="checkCircle" />
        <div>
          <p className="text-sm font-semibold text-slate-800">Payment reconciled</p>
          <p className="text-xs text-slate-500">Mobile money • just now</p>
        </div>
      </div>

      {/* Floating notification: backup */}
      <div className="fw-float-slow absolute -right-2 bottom-14 z-20 hidden items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-lg ring-1 ring-slate-200 sm:flex lg:right-[-3%]">
        <Icon name="dataBase" />
        <div>
          <p className="text-sm font-semibold text-slate-800">Backup completed</p>
          <p className="text-xs text-slate-500">Cloud • daily 02:00</p>
        </div>
      </div>

      {/* Live operations panel */}
      <div className="relative overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-slate-200">
        <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-3">
          <span className="size-2.5 rounded-full bg-slate-200" />
          <span className="size-2.5 rounded-full bg-slate-200" />
          <span className="size-2.5 rounded-full bg-slate-200" />
          <span className="ml-2 text-sm font-medium text-slate-600">Operations at a glance</span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">
            <span className="fw-blink size-1.5 rounded-full bg-teal-600" />
            LIVE
          </span>
        </div>
        <div className="px-5 pt-4 pb-2">
          <svg viewBox="0 0 560 220" className="h-auto w-full" role="img" aria-label="Animated operations chart">
            <g>
              {chartBars.map((bar) => (
                <rect
                  key={bar.x}
                  x={bar.x}
                  y={200 - bar.h}
                  width="36"
                  height={bar.h}
                  rx="7"
                  fill={bar.fill}
                  className="fw-bar"
                  style={{ animationDelay: bar.delay }}
                />
              ))}
            </g>
            <path
              d="M8 178 C 70 162, 110 170, 165 138 S 275 122, 330 96 S 450 74, 552 34"
              fill="none"
              stroke="#0C648F"
              strokeWidth="6"
              strokeLinecap="round"
              className="fw-draw"
            />
            <circle cx="552" cy="34" r="8" fill="#F5B301" />
          </svg>
          <p className="pt-1 pb-3 text-center text-xs text-slate-400">
            From manual reports to live visibility
          </p>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="bg-linear-to-b from-teal-200 via-transparent to-white">
      <div className="mx-auto max-w-[85rem] space-y-8 px-4 pt-48 pb-12 sm:px-6 lg:px-8">
        <AnnouncementBanner />
        <HeroContent />
        <HeroVideo />
      </div>
    </section>
  );
}
