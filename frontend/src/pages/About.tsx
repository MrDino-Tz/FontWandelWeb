import { useContent } from '../admin/store';

export default function About() {
  const { content } = useContent();
  const about = content.about;
  return (
    <>
      <section className="mx-auto max-w-[85rem] px-4 pt-48 pb-12 sm:px-6 lg:px-8">
        <div className="max-w-7xl">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl text-balance text-slate-800 sm:text-5xl md:text-6xl lg:text-7xl">
              {about.title}
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-slate-700 sm:text-xl/8">
              {about.description}
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
              {about.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse gap-1">
                  <dt className="text-base/7 text-slate-700">{stat.label}</dt>
                  <dd className="text-4xl font-semibold tracking-tight text-slate-800">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mx-auto mt-16 max-w-2xl lg:mx-0">
            <h2 className="text-2xl font-semibold text-balance text-slate-800 md:text-3xl md:leading-tight">
              {about.leadershipTitle}
            </h2>
            {about.leadership.map((para, i) => (
              <p key={i} className={i === 0 ? 'mt-6 text-lg text-pretty text-slate-700' : 'mt-4 text-lg text-pretty text-slate-700'}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[85rem] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="group relative isolate overflow-hidden rounded-3xl bg-teal-200 p-5 sm:p-11">
          <div className="svgBlock mx-auto max-w-7xl relative">
            <h2 className="relative pl-4 text-2xl font-semibold text-balance text-slate-800 md:text-3xl md:leading-tight">
              {about.foundationTitle}
            </h2>
            <dl className="relative mt-10 grid max-w-xl grid-cols-1 items-start text-base/7 text-slate-600 sm:max-w-none lg:grid-flow-row-dense lg:auto-rows-fr lg:grid-cols-3">
              {about.foundation.map((item, index) => (
                <div key={item.title} className={`px-5 py-5 sm:px-10 lg:py-0 ${index === 1 ? 'h-full border-y border-dashed border-slate-400 lg:border-x lg:border-y-0' : ''}`}>
                  <dt className="text-lg font-semibold text-balance text-slate-600">{item.title}</dt>
                  <dd className="mt-2 text-pretty text-slate-500">{item.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
