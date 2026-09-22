const aboutData = {
  title: 'FontWandel Technologies',
  description:
    'is a digital transformation and innovation company committed to enabling a more digitally empowered future. We believe technology is more than a tool — it is a catalyst for transforming how organizations operate, how people connect, how decisions are made, and how opportunities are created.',
  statistics: [
    { label: 'Core services', value: '6' },
    { label: 'Wandel Suite products live', value: '4' },
    { label: 'Sectors served', value: '7' },
  ],
};

const expertiseData = {
  title: 'What drives us:',
  expertise: [
    {
      title: 'Our vision:',
      description: 'Fostering a digital enabled economy where innovation and technology accelerate sustainable growth, opportunities, and transformation.',
    },
    {
      title: 'Our mission:',
      description: 'To enable organizations and communities to embrace digital transformation by delivering innovative, secure, and connected technology solutions that improve productivity, unlock opportunity, and accelerate sustainable growth.',
    },
    {
      title: 'Our values — F.O.N.T:',
      description: 'Forward Thinking, Ownership, Nurturing Innovation, and Trust — anticipating emerging technology shifts, taking full accountability for outcomes, continuously improving what we ship, and earning long-term partnerships through reliability and transparency.',
    },
  ],
};

export default function About() {
  return (
    <>
      <section className="mx-auto max-w-[85rem] px-4 pt-48 pb-12 sm:px-6 lg:px-8">
        <div className="max-w-7xl">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl text-balance text-slate-800 sm:text-5xl md:text-6xl lg:text-7xl">
              {aboutData.title}
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-slate-700 sm:text-xl/8">
              {aboutData.description}
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
              {aboutData.statistics.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse gap-1">
                  <dt className="text-base/7 text-slate-700">{stat.label}</dt>
                  <dd className="text-4xl font-semibold tracking-tight text-slate-800">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mx-auto mt-16 max-w-2xl lg:mx-0">
            <h2 className="text-2xl font-semibold text-balance text-slate-800 md:text-3xl md:leading-tight">
              Leadership
            </h2>
            <p className="mt-6 text-lg text-pretty text-slate-700">
              FontWandel is run by a lean team of 9 — 6 working team members delivering development, IT support, and cybersecurity services, and 3 board members providing strategic guidance and oversight.
            </p>
            <p className="mt-4 text-lg text-pretty text-slate-700">
              <span className="font-semibold text-slate-800">Chrispin Silvery Karengi</span> — Founder &amp; Technical Director. A BSc Cybersecurity and Information Technology graduate, leading FontWandel&apos;s strategic direction and technical delivery, from systems architecture and cybersecurity to the rollout of digital transformation projects for government institutions, schools, SMEs, and corporate organizations. Areas of focus: Cybersecurity, Systems Architecture, Digital Strategy, IT Infrastructure.
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[85rem] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="group relative isolate overflow-hidden rounded-3xl bg-teal-200 p-5 sm:p-11">
          <div className="svgBlock mx-auto max-w-7xl relative">
            <h2 className="relative pl-4 text-2xl font-semibold text-balance text-slate-800 md:text-3xl md:leading-tight">
              {expertiseData.title}
            </h2>
            <dl className="relative mt-10 grid max-w-xl grid-cols-1 items-start text-base/7 text-slate-600 sm:max-w-none lg:grid-flow-row-dense lg:auto-rows-fr lg:grid-cols-3">
              {expertiseData.expertise.map((item, index) => (
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
