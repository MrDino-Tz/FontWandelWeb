import { useContent } from '../../admin/store';
import Icon from '../ui/Icon';
import { Marquee } from '../ui/Marquee';
import { asset } from '../../utils/base';

export function SectorsSection() {
  const { content } = useContent();
  const sectors = content.sectors;
  const leftRow = sectors.items.slice(0, 3);
  const rightRow = sectors.items.slice(3);
  const cardCls =
    'mx-4 flex w-[240px] shrink-0 items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-4 text-left sm:w-[280px]';
  return (
    <section className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-20">
      <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
        <h2 className="text-2xl font-semibold text-balance text-slate-800 md:text-3xl md:leading-tight">
          {sectors.heading}
        </h2>
        <p className="mt-1 text-pretty text-slate-600">{sectors.sub}</p>
      </div>
      {leftRow.length > 0 && (
        <Marquee pauseOnHover direction="left" speed={32}>
          {leftRow.map((item) => (
            <div key={item.name} className={cardCls}>
              <Icon name={item.icon} />
              <p className="text-sm font-medium text-slate-700">{item.name}</p>
            </div>
          ))}
        </Marquee>
      )}
      {rightRow.length > 0 && (
        <Marquee pauseOnHover direction="right" speed={32}>
          {rightRow.map((item) => (
            <div key={item.name} className={cardCls}>
              <Icon name={item.icon} />
              <p className="text-sm font-medium text-slate-700">{item.name}</p>
            </div>
          ))}
        </Marquee>
      )}
    </section>
  );
}

export function PartnersSection() {
  const { content } = useContent();
  const partners = content.partners;
  return (
    <section className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-20">
      <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
        <h2 className="text-2xl font-semibold text-balance text-slate-800 md:text-3xl md:leading-tight">
          {partners.heading}
        </h2>
        <p className="mt-1 text-pretty text-slate-600">{partners.sub}</p>
      </div>
      <Marquee pauseOnHover speed={35}>
        {partners.items.map((p) => (
          <div
            key={p.name}
            className="mx-4 w-[300px] shrink-0 rounded-2xl border border-dashed border-slate-300 bg-white p-6 sm:w-[340px]"
          >
            {p.logo && (
              <img
                src={asset(p.logo)}
                alt={`${p.name} logo`}
                className="mb-3 h-12 w-auto max-w-full object-contain"
                loading="lazy"
              />
            )}
            <h3 className="text-lg font-semibold text-slate-800">{p.name}</h3>
            <p className="mt-2 text-sm text-pretty text-slate-600">{p.work}</p>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
