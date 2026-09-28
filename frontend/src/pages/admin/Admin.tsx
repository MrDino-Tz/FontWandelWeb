import { useState, type ReactNode } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  useContent,
  AVAILABLE_IMAGES,
  AVAILABLE_ICONS,
  type HomeSectionId,
} from '../../admin/store';
import { useAuth } from '../../admin/auth';

type SectionKey =
  | 'hero'
  | 'layout'
  | 'showcase'
  | 'grid'
  | 'animated'
  | 'cta'
  | 'about'
  | 'contact'
  | 'footer';

const SECTIONS: { key: SectionKey; label: string }[] = [
  { key: 'hero', label: 'Hero' },
  { key: 'layout', label: 'Homepage Layout' },
  { key: 'showcase', label: 'Services Showcase' },
  { key: 'grid', label: 'Why-Us Grid' },
  { key: 'animated', label: 'Process Panel' },
  { key: 'cta', label: 'CTA Banner' },
  { key: 'about', label: 'About Page' },
  { key: 'contact', label: 'Contact Info' },
  { key: 'footer', label: 'Footer' },
];

const SECTION_NAMES: Record<HomeSectionId, string> = {
  hero: 'Hero',
  showcase: 'Services Showcase',
  animated: 'Process Panel',
  grid: 'Why-Us Grid',
  cta: 'CTA Banner',
  contact: 'Contact Section',
};

const inputCls =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600';

function Card({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="font-semibold text-slate-800">{title}</h3>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-slate-600">{label}</span>
      {children}
    </label>
  );
}

function ListShell({
  children,
  onAdd,
  addLabel,
}: {
  children: ReactNode;
  onAdd: () => void;
  addLabel: string;
}) {
  return (
    <div className="space-y-3">
      {children}
      <button
        type="button"
        onClick={onAdd}
        className="rounded-lg border border-dashed border-slate-300 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-teal-600 hover:text-teal-700"
      >
        + {addLabel}
      </button>
    </div>
  );
}

function ItemShell({
  index,
  total,
  onRemove,
  onMove,
  children,
}: {
  index: number;
  total: number;
  onRemove: () => void;
  onMove: (dir: -1 | 1) => void;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500">#{index + 1}</span>
        <div className="flex gap-1">
          <button
            type="button"
            disabled={index === 0}
            onClick={() => onMove(-1)}
            aria-label="Move up"
            className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 disabled:opacity-40"
          >
            ↑
          </button>
          <button
            type="button"
            disabled={index === total - 1}
            onClick={() => onMove(1)}
            aria-label="Move down"
            className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 disabled:opacity-40"
          >
            ↓
          </button>
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove"
            className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-red-600"
          >
            ✕
          </button>
        </div>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function moveInList<T>(arr: T[], i: number, dir: -1 | 1): T[] {
  const j = i + dir;
  if (j < 0 || j >= arr.length) return arr;
  const next = [...arr];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}

function HeroEditor() {
  const { content, set } = useContent();
  const h = content.hero;
  return (
    <Card title="Hero" hint="Top of the homepage: banner pill, headline, subtext, buttons.">
      <Field label="Banner pill — bold part">
        <input className={inputCls} value={h.bannerText} onChange={(e) => set(['hero', 'bannerText'], e.target.value)} />
      </Field>
      <Field label="Banner pill — link part">
        <input className={inputCls} value={h.bannerLinkText} onChange={(e) => set(['hero', 'bannerLinkText'], e.target.value)} />
      </Field>
      <Field label="Banner link target">
        <input className={inputCls} value={h.bannerTo} onChange={(e) => set(['hero', 'bannerTo'], e.target.value)} />
      </Field>
      <Field label="Headline">
        <textarea className={inputCls} rows={2} value={h.title} onChange={(e) => set(['hero', 'title'], e.target.value)} />
      </Field>
      <Field label="Subtext">
        <textarea className={inputCls} rows={4} value={h.subtitle} onChange={(e) => set(['hero', 'subtitle'], e.target.value)} />
      </Field>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Secondary button label">
          <input className={inputCls} value={h.secondaryBtn.label} onChange={(e) => set(['hero', 'secondaryBtn', 'label'], e.target.value)} />
        </Field>
        <Field label="Secondary button link">
          <input className={inputCls} value={h.secondaryBtn.to} onChange={(e) => set(['hero', 'secondaryBtn', 'to'], e.target.value)} />
        </Field>
        <Field label="Primary button label">
          <input className={inputCls} value={h.primaryBtn.label} onChange={(e) => set(['hero', 'primaryBtn', 'label'], e.target.value)} />
        </Field>
        <Field label="Primary button link">
          <input className={inputCls} value={h.primaryBtn.to} onChange={(e) => set(['hero', 'primaryBtn', 'to'], e.target.value)} />
        </Field>
      </div>
    </Card>
  );
}

function LayoutEditor() {
  const { content, moveHomeSection, toggleHomeSection } = useContent();
  return (
    <Card title="Homepage Layout" hint="Reorder sections, or hide any section without deleting its content.">
      <div className="space-y-2">
        {content.homeLayout.map((item, i) => (
          <div
            key={item.id}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ring-1 ${item.visible ? 'bg-white ring-slate-200' : 'bg-slate-100 ring-slate-200 opacity-60'}`}
          >
            <span className="text-xs font-semibold text-slate-400">{i + 1}</span>
            <span className="grow text-sm font-medium text-slate-800">{SECTION_NAMES[item.id]}</span>
            <button type="button" disabled={i === 0} onClick={() => moveHomeSection(i, -1)} aria-label="Move up" className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs disabled:opacity-40">↑</button>
            <button type="button" disabled={i === content.homeLayout.length - 1} onClick={() => moveHomeSection(i, 1)} aria-label="Move down" className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs disabled:opacity-40">↓</button>
            <button
              type="button"
              onClick={() => toggleHomeSection(i)}
              className={`rounded-lg px-3 py-1 text-xs font-semibold ${item.visible ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-600'}`}
            >
              {item.visible ? 'Shown' : 'Hidden'}
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ShowcaseEditor() {
  const { content, set, push, removeAt } = useContent();
  const s = content.showcase;
  const moveItem = (i: number, dir: -1 | 1) =>
    set(['showcase', 'items'], moveInList(s.items, i, dir));
  return (
    <Card title="Services Showcase" hint="Homepage services grid. The last item renders as the bulleted block — put one-per-line bullets there.">
      <Field label="Heading">
        <input className={inputCls} value={s.heading} onChange={(e) => set(['showcase', 'heading'], e.target.value)} />
      </Field>
      <Field label="Subheading">
        <textarea className={inputCls} rows={2} value={s.sub} onChange={(e) => set(['showcase', 'sub'], e.target.value)} />
      </Field>
      <Field label="Last-block title (bulleted block)">
        <input className={inputCls} value={s.moreTitle} onChange={(e) => set(['showcase', 'moreTitle'], e.target.value)} />
      </Field>
      <ListShell
        addLabel="Add service"
        onAdd={() => push(['showcase', 'items'], { title: 'New service', description: '', image: AVAILABLE_IMAGES[0], bullets: [] })}
      >
        {s.items.map((item, i) => (
          <ItemShell key={i} index={i} total={s.items.length} onRemove={() => removeAt(['showcase', 'items'], i)} onMove={(d) => moveItem(i, d)}>
            <Field label="Title">
              <input className={inputCls} value={item.title} onChange={(e) => set(['showcase', 'items', i, 'title'], e.target.value)} />
            </Field>
            <Field label="Description">
              <textarea className={inputCls} rows={3} value={item.description} onChange={(e) => set(['showcase', 'items', i, 'description'], e.target.value)} />
            </Field>
            <Field label="Image">
              <select className={inputCls} value={item.image ?? ''} onChange={(e) => set(['showcase', 'items', i, 'image'], e.target.value || undefined)}>
                <option value="">No image (bulleted block)</option>
                {AVAILABLE_IMAGES.map((src) => (
                  <option key={src} value={src}>{src.split('/').pop()}</option>
                ))}
              </select>
            </Field>
            <Field label="Bullets (one per line — only used when set)">
              <textarea
                className={inputCls}
                rows={3}
                value={item.bullets.join('\n')}
                onChange={(e) => set(['showcase', 'items', i, 'bullets'], e.target.value.split('\n'))}
              />
            </Field>
          </ItemShell>
        ))}
      </ListShell>
    </Card>
  );
}

function GridEditor() {
  const { content, set, push, removeAt } = useContent();
  const g = content.grid;
  const moveItem = (i: number, dir: -1 | 1) =>
    set(['grid', 'cards'], moveInList(g.cards, i, dir));
  return (
    <Card title="Why-Us Grid" hint="Homepage trust cards. First three keep the designed borders.">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Title lead">
          <input className={inputCls} value={g.lead} onChange={(e) => set(['grid', 'lead'], e.target.value)} />
        </Field>
        <Field label="Title ending">
          <input className={inputCls} value={g.suffix} onChange={(e) => set(['grid', 'suffix'], e.target.value)} />
        </Field>
        <Field label="Brand accent A">
          <input className={inputCls} value={g.accentA} onChange={(e) => set(['grid', 'accentA'], e.target.value)} />
        </Field>
        <Field label="Brand accent B">
          <input className={inputCls} value={g.accentB} onChange={(e) => set(['grid', 'accentB'], e.target.value)} />
        </Field>
      </div>
      <Field label="Intro">
        <textarea className={inputCls} rows={3} value={g.intro} onChange={(e) => set(['grid', 'intro'], e.target.value)} />
      </Field>
      <ListShell
        addLabel="Add card"
        onAdd={() => push(['grid', 'cards'], { heading: 'New reason', description: '', icon: 'checkCircle' as const })}
      >
        {g.cards.map((card, i) => (
          <ItemShell key={i} index={i} total={g.cards.length} onRemove={() => removeAt(['grid', 'cards'], i)} onMove={(d) => moveItem(i, d)}>
            <Field label="Heading">
              <input className={inputCls} value={card.heading} onChange={(e) => set(['grid', 'cards', i, 'heading'], e.target.value)} />
            </Field>
            <Field label="Description">
              <textarea className={inputCls} rows={3} value={card.description} onChange={(e) => set(['grid', 'cards', i, 'description'], e.target.value)} />
            </Field>
            <Field label="Icon">
              <select className={inputCls} value={card.icon} onChange={(e) => set(['grid', 'cards', i, 'icon'], e.target.value)}>
                {AVAILABLE_ICONS.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </Field>
          </ItemShell>
        ))}
      </ListShell>
    </Card>
  );
}

function AnimatedEditor() {
  const { content, set, push, removeAt } = useContent();
  const a = content.animated;
  const moveItem = (i: number, dir: -1 | 1) =>
    set(['animated', 'cards'], moveInList(a.cards, i, dir));
  return (
    <Card title="Process Panel" hint="Homepage teal panel: title, subtext, button, and stacked step cards.">
      <Field label="Title">
        <input className={inputCls} value={a.title} onChange={(e) => set(['animated', 'title'], e.target.value)} />
      </Field>
      <Field label="Subtext">
        <textarea className={inputCls} rows={3} value={a.sub} onChange={(e) => set(['animated', 'sub'], e.target.value)} />
      </Field>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Button label">
          <input className={inputCls} value={a.cta.label} onChange={(e) => set(['animated', 'cta', 'label'], e.target.value)} />
        </Field>
        <Field label="Button link">
          <input className={inputCls} value={a.cta.to} onChange={(e) => set(['animated', 'cta', 'to'], e.target.value)} />
        </Field>
      </div>
      <ListShell
        addLabel="Add step card"
        onAdd={() => push(['animated', 'cards'], 'New step — describe it here.')}
      >
        {a.cards.map((card, i) => (
          <ItemShell key={i} index={i} total={a.cards.length} onRemove={() => removeAt(['animated', 'cards'], i)} onMove={(d) => moveItem(i, d)}>
            <Field label={`Step card ${i + 1}`}>
              <textarea className={inputCls} rows={2} value={card} onChange={(e) => set(['animated', 'cards', i], e.target.value)} />
            </Field>
          </ItemShell>
        ))}
      </ListShell>
    </Card>
  );
}

function CtaEditor() {
  const { content, set } = useContent();
  const c = content.cta;
  return (
    <Card title="CTA Banner" hint="Homepage closing banner before the contact section.">
      <Field label="First line">
        <input className={inputCls} value={c.line1} onChange={(e) => set(['cta', 'line1'], e.target.value)} />
      </Field>
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="Second-line lead">
          <input className={inputCls} value={c.lead} onChange={(e) => set(['cta', 'lead'], e.target.value)} />
        </Field>
        <Field label="Brand accent A">
          <input className={inputCls} value={c.accentA} onChange={(e) => set(['cta', 'accentA'], e.target.value)} />
        </Field>
        <Field label="Brand accent B">
          <input className={inputCls} value={c.accentB} onChange={(e) => set(['cta', 'accentB'], e.target.value)} />
        </Field>
      </div>
      <Field label="Subtext">
        <textarea className={inputCls} rows={3} value={c.sub} onChange={(e) => set(['cta', 'sub'], e.target.value)} />
      </Field>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Button label">
          <input className={inputCls} value={c.btn.label} onChange={(e) => set(['cta', 'btn', 'label'], e.target.value)} />
        </Field>
        <Field label="Button link">
          <input className={inputCls} value={c.btn.to} onChange={(e) => set(['cta', 'btn', 'to'], e.target.value)} />
        </Field>
      </div>
    </Card>
  );
}

function AboutEditor() {
  const { content, set, push, removeAt } = useContent();
  const a = content.about;
  const moveStat = (i: number, dir: -1 | 1) =>
    set(['about', 'stats'], moveInList(a.stats, i, dir));
  const moveFoundation = (i: number, dir: -1 | 1) =>
    set(['about', 'foundation'], moveInList(a.foundation, i, dir));
  const movePara = (i: number, dir: -1 | 1) =>
    set(['about', 'leadership'], moveInList(a.leadership, i, dir));
  return (
    <>
      <Card title="About — Intro" hint="About page headline, story, and statistic counters.">
        <Field label="Headline">
          <input className={inputCls} value={a.title} onChange={(e) => set(['about', 'title'], e.target.value)} />
        </Field>
        <Field label="Story">
          <textarea className={inputCls} rows={4} value={a.description} onChange={(e) => set(['about', 'description'], e.target.value)} />
        </Field>
        <ListShell
          addLabel="Add statistic"
          onAdd={() => push(['about', 'stats'], { label: 'New metric', value: '0' })}
        >
          {a.stats.map((stat, i) => (
            <ItemShell key={i} index={i} total={a.stats.length} onRemove={() => removeAt(['about', 'stats'], i)} onMove={(d) => moveStat(i, d)}>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Value">
                  <input className={inputCls} value={stat.value} onChange={(e) => set(['about', 'stats', i, 'value'], e.target.value)} />
                </Field>
                <Field label="Label">
                  <input className={inputCls} value={stat.label} onChange={(e) => set(['about', 'stats', i, 'label'], e.target.value)} />
                </Field>
              </div>
            </ItemShell>
          ))}
        </ListShell>
      </Card>
      <Card title="About — Foundation" hint="Vision / mission / values cards.">
        <Field label="Section title">
          <input className={inputCls} value={a.foundationTitle} onChange={(e) => set(['about', 'foundationTitle'], e.target.value)} />
        </Field>
        <ListShell
          addLabel="Add card"
          onAdd={() => push(['about', 'foundation'], { title: 'New heading:', description: '' })}
        >
          {a.foundation.map((item, i) => (
            <ItemShell key={i} index={i} total={a.foundation.length} onRemove={() => removeAt(['about', 'foundation'], i)} onMove={(d) => moveFoundation(i, d)}>
              <Field label="Card title">
                <input className={inputCls} value={item.title} onChange={(e) => set(['about', 'foundation', i, 'title'], e.target.value)} />
              </Field>
              <Field label="Card text">
                <textarea className={inputCls} rows={3} value={item.description} onChange={(e) => set(['about', 'foundation', i, 'description'], e.target.value)} />
              </Field>
            </ItemShell>
          ))}
        </ListShell>
      </Card>
      <Card title="About — Leadership" hint="Paragraphs under the Leadership heading.">
        <Field label="Section title">
          <input className={inputCls} value={a.leadershipTitle} onChange={(e) => set(['about', 'leadershipTitle'], e.target.value)} />
        </Field>
        <ListShell
          addLabel="Add paragraph"
          onAdd={() => push(['about', 'leadership'], 'New paragraph.')}
        >
          {a.leadership.map((para, i) => (
            <ItemShell key={i} index={i} total={a.leadership.length} onRemove={() => removeAt(['about', 'leadership'], i)} onMove={(d) => movePara(i, d)}>
              <Field label={`Paragraph ${i + 1}`}>
                <textarea className={inputCls} rows={4} value={para} onChange={(e) => set(['about', 'leadership', i], e.target.value)} />
              </Field>
            </ItemShell>
          ))}
        </ListShell>
      </Card>
    </>
  );
}

function ContactEditor() {
  const { content, set, push, removeAt } = useContent();
  const c = content.contact;
  const moveChannel = (i: number, dir: -1 | 1) =>
    set(['contact', 'channels'], moveInList(c.channels, i, dir));
  return (
    <Card title="Contact Info" hint="Drives the homepage contact section, the footer, and the contact page. Use tel: / mailto: links.">
      <Field label="Section heading">
        <input className={inputCls} value={c.heading} onChange={(e) => set(['contact', 'heading'], e.target.value)} />
      </Field>
      <Field label="Intro">
        <textarea className={inputCls} rows={3} value={c.intro} onChange={(e) => set(['contact', 'intro'], e.target.value)} />
      </Field>
      <ListShell
        addLabel="Add channel"
        onAdd={() => push(['contact', 'channels'], { title: 'New channel', icon: 'info' as const, lines: [{ label: '', href: '' }] })}
      >
        {c.channels.map((ch, i) => (
          <ItemShell key={i} index={i} total={c.channels.length} onRemove={() => removeAt(['contact', 'channels'], i)} onMove={(d) => moveChannel(i, d)}>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Channel title">
                <input className={inputCls} value={ch.title} onChange={(e) => set(['contact', 'channels', i, 'title'], e.target.value)} />
              </Field>
              <Field label="Icon">
                <select className={inputCls} value={ch.icon} onChange={(e) => set(['contact', 'channels', i, 'icon'], e.target.value)}>
                  {AVAILABLE_ICONS.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </Field>
            </div>
            {ch.lines.map((line, j) => (
              <div key={j} className="grid gap-3 sm:grid-cols-2">
                <Field label={`Line ${j + 1} label`}>
                  <input
                    className={inputCls}
                    value={line.label}
                    onChange={(e) => set(['contact', 'channels', i, 'lines', j, 'label'], e.target.value)}
                  />
                </Field>
                <Field label={`Line ${j + 1} link`}>
                  <input
                    className={inputCls}
                    value={line.href}
                    onChange={(e) => set(['contact', 'channels', i, 'lines', j, 'href'], e.target.value)}
                  />
                </Field>
              </div>
            ))}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => push(['contact', 'channels', i, 'lines'], { label: '', href: '' })}
                className="rounded-lg border border-dashed border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600"
              >
                + Add line
              </button>
              {ch.lines.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeAt(['contact', 'channels', i, 'lines'], ch.lines.length - 1)}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-red-600"
                >
                  Remove last line
                </button>
              )}
            </div>
          </ItemShell>
        ))}
      </ListShell>
    </Card>
  );
}

function FooterEditor() {
  const { content, set } = useContent();
  const f = content.footer;
  return (
    <Card title="Footer" hint="Brand name and description. Contact details come from Contact Info. Copyright year is automatic.">
      <Field label="Company name">
        <input className={inputCls} value={f.companyName} onChange={(e) => set(['footer', 'companyName'], e.target.value)} />
      </Field>
      <Field label="Description">
        <textarea className={inputCls} rows={3} value={f.description} onChange={(e) => set(['footer', 'description'], e.target.value)} />
      </Field>
    </Card>
  );
}

export default function Admin() {
  const [section, setSection] = useState<SectionKey>('hero');
  const { reset } = useContent();
  const { isAuthed, logout } = useAuth();

  if (!isAuthed) return <Navigate to="/fontadmin/login" replace />;

  return (
    <div className="flex min-h-screen bg-off-white">
      <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col bg-navy-800 text-white">
        <div className="px-5 pt-6 pb-4">
          <p className="dm-sans text-xl">
            <span className="font-semibold text-gold-500">Font</span>Wandel
          </p>
          <p className="mt-1 text-xs text-slate-400">Site Admin</p>
        </div>
        <nav className="grow space-y-1 overflow-y-auto px-3">
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setSection(s.key)}
              className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                section === s.key
                  ? 'bg-white/10 text-white ring-1 ring-inset ring-gold-500'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>
        <div className="space-y-2 p-3">
          <button
            type="button"
            onClick={logout}
            className="w-full rounded-lg border border-white/20 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-white/50 hover:text-white"
          >
            Log out
          </button>
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset all content to the defaults?')) reset();
            }}
            className="w-full rounded-lg border border-white/20 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-red-400 hover:text-red-300"
          >
            Reset to defaults
          </button>
          <Link
            to="/"
            className="block w-full rounded-lg bg-gold-500 px-3 py-2 text-center text-sm font-semibold text-black transition hover:bg-gold-600"
          >
            ← Back to site
          </Link>
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-4 py-8 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-slate-800">
              {SECTIONS.find((s) => s.key === section)?.label}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Changes save automatically in this browser and appear on the site instantly.
            </p>
          </div>
          <div className="space-y-5">
            {section === 'hero' && <HeroEditor />}
            {section === 'layout' && <LayoutEditor />}
            {section === 'showcase' && <ShowcaseEditor />}
            {section === 'grid' && <GridEditor />}
            {section === 'animated' && <AnimatedEditor />}
            {section === 'cta' && <CtaEditor />}
            {section === 'about' && <AboutEditor />}
            {section === 'contact' && <ContactEditor />}
            {section === 'footer' && <FooterEditor />}
          </div>
        </div>
      </main>
    </div>
  );
}
