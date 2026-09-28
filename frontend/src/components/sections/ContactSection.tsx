import Icon from '../ui/Icon';
import { useContent } from '../../admin/store';

export default function ContactSection() {
  const { content } = useContent();
  const contact = content.contact;
  return (
    <section className="mx-auto max-w-[85rem] px-4 pb-24 sm:px-6 lg:px-8">
      <div className="group relative isolate overflow-hidden rounded-3xl bg-teal-200 p-5 sm:p-11">
        <div className="svgBlock mx-auto max-w-7xl relative">
          <h2 className="relative pl-4 text-2xl font-semibold text-balance text-slate-800 md:text-3xl md:leading-tight">
            {contact.heading}
          </h2>
          <p className="relative mt-4 max-w-2xl pl-4 text-pretty text-slate-600">
            {contact.intro}
          </p>
          <div className="relative mt-8 grid gap-4 md:grid-cols-2">
            {contact.channels.map((c) => (
              <div key={c.title} className="rounded-2xl bg-white/80 px-6 py-5 shadow-sm backdrop-blur">
                <div className="flex items-center gap-3">
                  <Icon name={c.icon} />
                  <h3 className="text-lg font-semibold text-slate-800">{c.title}</h3>
                </div>
                <div className="mt-3 space-y-1.5">
                  {c.lines.map((l) => (
                    <p key={l.label}>
                      <a
                        href={l.href}
                        className="text-slate-700 underline-offset-4 transition hover:text-teal-700 hover:underline"
                      >
                        {l.label}
                      </a>
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
