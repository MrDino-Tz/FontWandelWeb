import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, Navigate, NavLink, useParams } from 'react-router-dom';
import { getVisits } from '../../admin/visits';
import {
  useContent,
  AVAILABLE_IMAGES,
  AVAILABLE_ICONS,
  type HomeSectionId,
} from '../../admin/store';
import { useAuth } from '../../admin/auth';
import { asset } from '../../utils/base';

const SECTION_NAMES: Record<HomeSectionId, string> = {
  hero: 'Hero',
  showcase: 'Services Showcase',
  animated: 'Process Panel',
  grid: 'Why-Us Grid',
  sectors: 'Sectors',
  partners: 'Partners',
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

function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Could not read that file.'));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('That file is not a readable image.'));
    img.src = src;
  });
}

/** Downscale raster uploads so stored content stays lean; vectors pass through. */
async function fileToImageValue(file: File): Promise<string> {
  const isSvg = file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg');
  if (!isSvg && !file.type.startsWith('image/')) {
    throw new Error('Only image files (PNG, JPG, WebP, GIF, SVG).');
  }
  const dataUrl = await readAsDataURL(file);
  if (isSvg) return dataUrl;
  const img = await loadImage(dataUrl);
  const max = 1200;
  const scale = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
  if (scale === 1 && file.size <= 500 * 1024) return dataUrl;
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
  canvas.getContext('2d')?.drawImage(img, 0, 0, canvas.width, canvas.height);
  const probe = document.createElement('canvas').toDataURL('image/webp');
  const type = probe.startsWith('data:image/webp') ? 'image/webp' : 'image/jpeg';
  return canvas.toDataURL(type, 0.82);
}

function ImageDropzone({
  value,
  onChange,
}: {
  value?: string;
  onChange: (v: string | undefined) => void;
}) {
  const [dragOver, setDragOver] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file || busy) return;
    setBusy(true);
    setError(null);
    try {
      onChange(await fileToImageValue(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not use that file.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-label="Drop an image here or click to browse"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          void handleFile(e.dataTransfer.files?.[0]);
        }}
        className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed px-3 py-2.5 transition ${
          dragOver ? 'border-teal-600 bg-teal-50' : 'border-slate-300 bg-slate-50 hover:border-slate-400'
        }`}
      >
        {value ? (
          <img src={asset(value)} alt="Current image preview" className="h-16 w-24 shrink-0 rounded-lg object-cover ring-1 ring-slate-200" />
        ) : (
          <span className="flex h-16 w-24 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-xl text-slate-400">
            +
          </span>
        )}
        <span className="text-xs text-slate-500">
          {busy ? 'Processing…' : value ? 'Drop a new image to replace, or click to browse.' : 'Drop an image here, or click to browse.'}
        </span>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,.svg"
          className="hidden"
          onChange={(e) => {
            void handleFile(e.target.files?.[0]);
            e.target.value = '';
          }}
        />
      </div>
      {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </div>
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
              <ImageDropzone
                value={item.image}
                onChange={(v) => set(['showcase', 'items', i, 'image'], v)}
              />
            </Field>
            <Field label="…or pick a bundled image">
              <select className={inputCls} value={item.image && AVAILABLE_IMAGES.includes(item.image) ? item.image : ''} onChange={(e) => set(['showcase', 'items', i, 'image'], e.target.value || undefined)}>
                <option value="">No image (bulleted block)</option>
                {item.image && !AVAILABLE_IMAGES.includes(item.image) && (
                  <option value={item.image}>Custom upload</option>
                )}
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

function SectorsEditor() {
  const { content, set, push, removeAt } = useContent();
  const s = content.sectors;
  const moveItem = (i: number, dir: -1 | 1) =>
    set(['sectors', 'items'], moveInList(s.items, i, dir));
  return (
    <Card title="Sectors" hint="Who-we-serve cards. The first three loop left, the rest loop right.">
      <Field label="Heading">
        <input className={inputCls} value={s.heading} onChange={(e) => set(['sectors', 'heading'], e.target.value)} />
      </Field>
      <Field label="Subheading">
        <textarea className={inputCls} rows={2} value={s.sub} onChange={(e) => set(['sectors', 'sub'], e.target.value)} />
      </Field>
      <ListShell
        addLabel="Add sector"
        onAdd={() => push(['sectors', 'items'], { name: 'New sector', icon: 'info' as const })}
      >
        {s.items.map((item, i) => (
          <ItemShell key={i} index={i} total={s.items.length} onRemove={() => removeAt(['sectors', 'items'], i)} onMove={(d) => moveItem(i, d)}>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label={`Sector ${i + 1}`}>
                <input className={inputCls} value={item.name} onChange={(e) => set(['sectors', 'items', i, 'name'], e.target.value)} />
              </Field>
              <Field label="Icon">
                <select className={inputCls} value={item.icon} onChange={(e) => set(['sectors', 'items', i, 'icon'], e.target.value)}>
                  {AVAILABLE_ICONS.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </Field>
            </div>
          </ItemShell>
        ))}
      </ListShell>
    </Card>
  );
}

function PartnersEditor() {
  const { content, set, push, removeAt } = useContent();
  const p = content.partners;
  const moveItem = (i: number, dir: -1 | 1) =>
    set(['partners', 'items'], moveInList(p.items, i, dir));
  return (
    <Card title="Partners" hint="Trusted-partner cards on the homepage.">
      <Field label="Heading">
        <input className={inputCls} value={p.heading} onChange={(e) => set(['partners', 'heading'], e.target.value)} />
      </Field>
      <Field label="Subheading">
        <textarea className={inputCls} rows={2} value={p.sub} onChange={(e) => set(['partners', 'sub'], e.target.value)} />
      </Field>
      <ListShell
        addLabel="Add partner"
        onAdd={() => push(['partners', 'items'], { name: 'New partner', work: '' })}
      >
        {p.items.map((item, i) => (
          <ItemShell key={i} index={i} total={p.items.length} onRemove={() => removeAt(['partners', 'items'], i)} onMove={(d) => moveItem(i, d)}>
            <Field label="Partner name">
              <input className={inputCls} value={item.name} onChange={(e) => set(['partners', 'items', i, 'name'], e.target.value)} />
            </Field>
            <Field label="Logo (optional — upload the real logo, never a placeholder)">
              <ImageDropzone
                value={item.logo}
                onChange={(v) => set(['partners', 'items', i, 'logo'], v)}
              />
            </Field>
            <Field label="Work delivered">
              <textarea className={inputCls} rows={2} value={item.work} onChange={(e) => set(['partners', 'items', i, 'work'], e.target.value)} />
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
    <Card title="CTA Banner" hint="Homepage closing banner.">
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
        <Field label="Name story (shows under the story — empty hides it)">
          <textarea className={inputCls} rows={3} value={a.nameStory} onChange={(e) => set(['about', 'nameStory'], e.target.value)} />
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

type SectionCardKey =
  | 'hero'
  | 'layout'
  | 'showcase'
  | 'grid'
  | 'sectors'
  | 'partners'
  | 'animated'
  | 'cta'
  | 'contact'
  | 'about'
  | 'footer';

const SECTION_CARDS: { key: SectionCardKey; title: string; hint: string }[] = [
  { key: 'hero', title: 'Hero', hint: 'Banner pill, headline, subtext, buttons.' },
  { key: 'layout', title: 'Homepage Layout', hint: 'Reorder sections, or hide any without deleting content.' },
  { key: 'showcase', title: 'Services Showcase', hint: 'Services grid, images, and bulleted block.' },
  { key: 'grid', title: 'Why-Us Grid', hint: 'Trust cards with icons.' },
  { key: 'sectors', title: 'Sectors', hint: 'Who we serve chips.' },
  { key: 'partners', title: 'Partners', hint: 'Trusted partners and their work.' },
  { key: 'animated', title: 'Process Panel', hint: 'Process steps and button.' },
  { key: 'contact', title: 'Contact Info', hint: 'Channels driving home, footer, and contact page.' },
  { key: 'cta', title: 'CTA Banner', hint: 'Closing banner text and button.' },
  { key: 'about', title: 'About Page', hint: 'Headline, story, stats, foundation, leadership.' },
  { key: 'footer', title: 'Footer', hint: 'Brand name and description.' },
];

function HomepageCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {SECTION_CARDS.map((card) => (
        <Link
          key={card.key}
          to={`/fontadmin/${card.key}`}
          className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-gold-500 hover:shadow"
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-semibold text-slate-800">{card.title}</h3>
            <span className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-gold-600">→</span>
          </div>
          <p className="mt-1 text-xs text-slate-500">{card.hint}</p>
        </Link>
      ))}
    </div>
  );
}

function SectionDetail({ cardKey }: { cardKey: SectionCardKey }) {
  const card = SECTION_CARDS.find((c) => c.key === cardKey);
  if (!card) return <Navigate to="/fontadmin" replace />;
  return (
    <div className="space-y-5">
      <Link
        to="/fontadmin"
        className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-teal-700"
      >
        ← All sections
      </Link>
      {cardKey === 'hero' && <HeroEditor />}
      {cardKey === 'layout' && <LayoutEditor />}
      {cardKey === 'showcase' && <ShowcaseEditor />}
      {cardKey === 'grid' && <GridEditor />}
      {cardKey === 'sectors' && <SectorsEditor />}
      {cardKey === 'partners' && <PartnersEditor />}
      {cardKey === 'animated' && <AnimatedEditor />}
      {cardKey === 'cta' && <CtaEditor />}
      {cardKey === 'contact' && <ContactEditor />}
      {cardKey === 'about' && <AboutEditor />}
      {cardKey === 'footer' && <FooterEditor />}
    </div>
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

function SessionCard() {
  const { username, mode, logout } = useAuth();
  return (
    <Card title="Session" hint="Who is signed in and how.">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-800">{username ?? 'Unknown user'}</p>
          <p className="mt-1 text-xs text-slate-500">
            {mode === 'api'
              ? 'Connected to the live API — edits publish to the server.'
              : 'Local demo mode — no backend reachable, edits stay in this browser.'}
          </p>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${mode === 'api' ? 'bg-teal-600 text-white' : 'bg-gold-500 text-black'}`}>
          {mode === 'api' ? 'Live API' : 'Local demo'}
        </span>
      </div>
      <div>
        <button
          type="button"
          onClick={logout}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400"
        >
          Log out
        </button>
      </div>
    </Card>
  );
}

function BackupCard() {
  const { content, replace } = useContent();
  const [notice, setNotice] = useState<string | null>(null);

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'site-content.json';
    a.click();
    URL.revokeObjectURL(url);
    setNotice('Downloaded site-content.json.');
  };

  const importJson = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (!parsed || typeof parsed.hero !== 'object' || !Array.isArray(parsed.homeLayout)) {
          setNotice('That file is not valid site content (needs hero + homeLayout).');
          return;
        }
        replace(parsed);
        setNotice(`Imported ${file.name} — applied everywhere instantly.`);
      } catch {
        setNotice('Could not read that file — is it valid JSON?');
      }
    };
    reader.readAsText(file);
  };

  return (
    <Card title="Backup & restore" hint="Download the whole site content as JSON, or restore from a file.">
      {notice && (
        <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-200">
          {notice}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={exportJson}
          className="rounded-lg bg-navy-800 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Export JSON
        </button>
        <label className="cursor-pointer rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400">
          Import JSON…
          <input
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) importJson(file);
              e.target.value = '';
            }}
          />
        </label>
      </div>
    </Card>
  );
}

function DangerCard() {
  const { reset } = useContent();
  return (
    <Card title="Danger zone" hint="Irreversible. Export a backup first if unsure.">
      <div>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Reset all content to the defaults?')) reset();
          }}
          className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          Reset to defaults
        </button>
      </div>
    </Card>
  );
}

function StatTile({ value, label, to }: { value: number | string; label: string; to?: string }) {
  const body = (
    <>
      <p className="text-3xl font-bold text-navy-800">{value}</p>
      <p className="mt-1 text-sm text-slate-600">{label}</p>
    </>
  );
  if (!to) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        {body}
      </div>
    );
  }
  return (
    <Link
      to={to}
      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-gold-500 hover:shadow"
    >
      {body}
      <p className="mt-2 text-xs font-medium text-slate-400 transition group-hover:text-gold-600">
        Manage →
      </p>
    </Link>
  );
}

function Dashboard() {
  const { content, sync } = useContent();
  const { username, mode } = useAuth();
  const [visits, setVisits] = useState({ total: 0, today: 0 });
  useEffect(() => {
    const v = getVisits();
    setVisits({ total: v.total, today: v.today });
  }, []);
  const visible = content.homeLayout.filter((item) => item.visible).length;
  const total = content.homeLayout.length;
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatTile value={visits.total} label={`Visitors (this device · ${visits.today} today)`} />
        <StatTile value={content.showcase.items.length} label="Services in showcase" to="/fontadmin/showcase" />
        <StatTile value={content.grid.cards.length} label="Why-us trust cards" to="/fontadmin/grid" />
        <StatTile value={content.animated.cards.length} label="Process steps" to="/fontadmin/animated" />
        <StatTile value={content.contact.channels.length} label="Contact channels" to="/fontadmin/contact" />
        <StatTile value={`${visible}/${total}`} label="Homepage sections visible" to="/fontadmin/layout" />
      </div>
      <Card title="Homepage order" hint="Top to bottom as visitors see it. Arrange in Homepage Layout.">
        <div className="flex flex-wrap items-center gap-2">
          {content.homeLayout.map((item) => (
            <span
              key={item.id}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${
                item.visible
                  ? 'bg-white text-slate-700 ring-slate-200'
                  : 'bg-slate-100 text-slate-400 ring-slate-200 line-through'
              }`}
            >
              <span className={`size-1.5 rounded-full ${item.visible ? 'bg-teal-600' : 'bg-slate-300'}`} />
              {SECTION_NAMES[item.id]}
            </span>
          ))}
        </div>
      </Card>
      <Card title="Status" hint="Session, connection, and save state.">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
          <p>
            Signed in as <span className="font-semibold text-slate-800">{username ?? 'Unknown user'}</span>
          </p>
          <p>
            Connection:{' '}
            <span className={`font-semibold ${mode === 'api' ? 'text-teal-700' : 'text-gold-600'}`}>
              {mode === 'api' ? 'Live API' : 'Local demo'}
            </span>
          </p>
          <p>
            Sync:{' '}
            <span className={sync === 'error' ? 'font-semibold text-red-600' : 'font-medium text-slate-700'}>
              {sync === 'saving' ? 'Saving…' : sync === 'saved' ? 'All changes saved.' : sync === 'error' ? 'Could not save to the server.' : 'Up to date.'}
            </span>
          </p>
        </div>
      </Card>
    </div>
  );
}

export type AdminView = 'dashboard' | 'homepage' | 'settings' | 'section';

const TABS: { view: Exclude<AdminView, 'section'>; label: string; to: string }[] = [
  { view: 'dashboard', label: 'Dashboard', to: '/fontadmin/dashboard' },
  { view: 'homepage', label: 'Homepage', to: '/fontadmin/homepage' },
  { view: 'settings', label: 'Settings', to: '/fontadmin/settings' },
];

export default function Admin({ view }: { view: AdminView }) {
  const { sync } = useContent();
  const { isAuthed, ready, logout } = useAuth();
  const { section } = useParams();
  const cardKey =
    view === 'section' ? (SECTION_CARDS.find((c) => c.key === section)?.key ?? null) : null;

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-off-white text-sm text-slate-500">
        Checking session…
      </div>
    );
  }

  if (!isAuthed) return <Navigate to="/fontadmin/login" replace />;

  const syncLabel =
    sync === 'saving'
      ? 'Saving…'
      : sync === 'saved'
        ? 'All changes saved.'
        : sync === 'error'
          ? 'Could not save to the server.'
          : '';

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
          {TABS.map((t) => (
            <NavLink
              key={t.view}
              to={t.to}
              className={({ isActive }) =>
                `flex w-full items-center rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                  isActive
                    ? 'bg-white/10 text-white ring-1 ring-inset ring-gold-500'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {t.label}
            </NavLink>
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
              {view === 'dashboard'
                ? 'Dashboard'
                : view === 'homepage'
                  ? 'Homepage'
                  : view === 'settings'
                    ? 'Settings'
                    : (cardKey && SECTION_CARDS.find((c) => c.key === cardKey)?.title) || 'Homepage'}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {view === 'dashboard'
                ? 'General stats across the whole site.'
                : view === 'homepage' && !cardKey
                  ? 'Everything on this page as cards — pick one to edit.'
                  : view === 'homepage'
                    ? 'Changes save automatically.'
                    : view === 'settings'
                      ? 'Session, backups, and destructive actions.'
                      : 'Changes save automatically.'}{' '}
              {syncLabel && (
                <span
                  className={
                    sync === 'error' ? 'font-medium text-red-600' : 'text-teal-700'
                  }
                >
                  {syncLabel}
                </span>
              )}
            </p>
          </div>
          <div className="space-y-5">
            {view === 'dashboard' ? (
              <Dashboard />
            ) : view === 'homepage' ? (
              <HomepageCards />
            ) : view === 'settings' ? (
              <>
                <SessionCard />
                <BackupCard />
                <DangerCard />
              </>
            ) : section && !cardKey ? (
              <Navigate to="/fontadmin/homepage" replace />
            ) : cardKey ? (
              <SectionDetail cardKey={cardKey} />
            ) : (
              <Navigate to="/fontadmin/homepage" replace />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
