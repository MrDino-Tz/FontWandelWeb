import Button from '../ui/Button';
import Icon from '../ui/Icon';
import { asset } from '../../utils/base';
import { useContent } from '../../admin/store';

/** Fixed editorial layout — content comes from the store, geometry stays put. */
const showcaseLayout = [
  {
    className: 'content-center border-b border-dashed border-slate-400 py-5 sm:col-span-2 sm:p-5',
    imgClass: 'mx-auto mt-10 rounded-xl shadow-lg sm:w-[75%]',
  },
  {
    className: 'content-center py-5 sm:row-start-2 sm:p-5 sm:py-10',
    imgClass: 'ml-auto mr-auto mt-10 w-[65%] rounded-xl shadow-lg sm:ml-0 sm:w-[45%]',
  },
  {
    className: 'content-center border-t border-dashed border-slate-400 py-5 sm:row-span-2 sm:row-start-2 sm:border-l sm:border-t-0 sm:p-5 sm:text-right',
    imgClass: 'ml-auto mr-auto mt-10 w-[80%] rounded-xl shadow-lg sm:mr-0',
  },
  {
    className: 'content-center border-t border-dashed border-slate-400 py-5 sm:p-5',
    imgClass: 'mx-auto mt-10 rounded-xl shadow-lg sm:w-[75%]',
  },
];

export function FeatureShowcase() {
  const { content } = useContent();
  const showcase = content.showcase;
  return (
    <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-20">
      <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
        <h2 className="text-2xl font-semibold text-balance text-slate-800 md:text-3xl md:leading-tight">
          {showcase.heading}
        </h2>
        <p className="mt-1 text-pretty text-slate-600">
          {showcase.sub}
        </p>
      </div>
      <div className="mx-auto grid max-w-[85rem] px-4 pb-10 sm:grid-cols-2 sm:grid-rows-3 sm:px-6 lg:px-8 lg:pb-14">
        {showcase.items.map((f, i) => {
          const layout = showcaseLayout[i] ?? showcaseLayout[showcaseLayout.length - 1];
          const isLast = i === showcase.items.length - 1;
          return (
            <div key={`${f.title}-${i}`} className={layout.className}>
              <h2 className="text-2xl font-bold text-slate-600">{isLast ? showcase.moreTitle : f.title}</h2>
              {f.description && (
                <p className="mt-2 text-base/6 text-slate-600">{f.description}</p>
              )}
              {f.image && (
                <img src={asset(f.image)} alt="" className={layout.imgClass} loading="lazy" />
              )}
              {f.bullets.length > 0 && (
                <ul className="mt-4 ml-4 w-4/5 list-inside list-disc space-y-2 text-base/6 text-slate-600 marker:text-teal-600">
                  {f.bullets.filter((b) => b.trim()).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const gridDecor = [
  {
    borderClasses: 'md:border-l md:border-r',
    gridClasses: '',
    gradientClasses: 'bg-linear-to-l from-teal-200 to-transparent',
  },
  {
    borderClasses: 'border-b border-t md:border-b-0',
    gridClasses: 'md:col-start-2 md:col-end-3',
    gradientClasses: 'bg-linear-to-t from-teal-200 to-transparent',
  },
  {
    borderClasses: 'md:border-l md:border-r md:border-t',
    gridClasses: 'md:col-end-4',
    gradientClasses: 'bg-linear-to-tl from-teal-200 to-transparent',
  },
];

export function FeatureGrid() {
  const { content } = useContent();
  const grid = content.grid;
  return (
    <section className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-20">
      <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-3 md:grid-rows-2">
        <div className="mx-auto max-w-lg pb-5 text-center md:col-span-2 lg:mx-0 lg:flex-auto lg:text-left">
          <h2 className="text-2xl font-semibold tracking-tight text-balance text-slate-800 md:text-3xl md:leading-tight">
            {grid.lead}<span className="text-navy-800">{grid.accentA}</span><span className="font-normal text-slate-400">{grid.accentB}</span>{grid.suffix}
          </h2>
          <p className="mt-6 text-start text-lg/8 text-pretty text-slate-700 sm:text-center md:text-start">
            {grid.intro}
          </p>
        </div>
        {grid.cards.map((f, i) => {
          const decor = gridDecor[i] ?? gridDecor[gridDecor.length - 1];
          return (
            <div key={`${f.heading}-${i}`} className={`group relative mx-auto flex flex-col border-dashed border-slate-400 py-10 ${decor.borderClasses} ${decor.gridClasses}`}>
              <div className={`group pointer-events-none absolute inset-0 h-full w-full ${decor.gradientClasses} opacity-0 transition duration-300 group-hover:opacity-100`} />
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
          );
        })}
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

const animatedIcons = ['dataBase', 'brain', 'lightbulb'] as const;
const animatedAlign = ['', 'self-center', 'self-end'];

export function FeatureAnimated() {
  const { content } = useContent();
  const animated = content.animated;
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
            {animated.title}
          </h2>
          <p className="mt-6 text-lg/8 text-pretty text-slate-700">
            {animated.sub}
          </p>
          <div className="mt-10 flex items-center justify-start gap-x-6 sm:justify-center lg:justify-start">
            <Button to={animated.cta.to} variant="tertiary" className="group inline-flex items-center justify-center gap-x-2 py-2.5 pr-4 pl-5 text-slate-700">
              {animated.cta.label} <Icon name="chevronRight" />
            </Button>
          </div>
        </div>
        <div className="relative my-16 flex flex-col gap-y-7 lg:my-8">
          {animated.cards.map((description, i) => (
            <FeatureCard
              key={i}
              icon={animatedIcons[i] ?? 'lightbulb'}
              description={description}
              styleClass={animatedAlign[i] ?? ''}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  const { content } = useContent();
  const cta = content.cta;
  return (
    <section className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-20">
      <div className="mx-auto mb-10 max-w-3xl text-center lg:mb-14">
        <h2 className="text-4xl text-balance text-slate-800 sm:text-5xl">
          {cta.line1} <br /> {cta.lead}<span className="font-medium text-navy-800">{cta.accentA}</span><span className="font-light text-slate-400">{cta.accentB}</span>.
        </h2>
        <p className="mt-5 text-pretty text-slate-600">
          {cta.sub}
        </p>
        <Button to={cta.btn.to} variant="primary" className="mt-7 inline-flex border-none px-3.5">
          {cta.btn.label}
        </Button>
      </div>
    </section>
  );
}
