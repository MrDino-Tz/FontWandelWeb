import { Link, useParams } from 'react-router-dom';
import { articles, references } from '../../data/content';
import whitepaperFiles from '../../data/whitepapers.json';

function Hero({ title, description }: { title: string; description: string }) {
  return (
    <section className="mx-auto max-w-[85rem] px-4 pt-48 pb-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl text-balance text-slate-800 sm:text-5xl md:text-6xl">{title}</h1>
      <p className="mt-6 max-w-2xl text-lg text-pretty text-slate-700">{description}</p>
    </section>
  );
}

function Card({ to, title, description, meta }: { to: string; title: string; description: string; meta?: string }) {
  return (
    <Link to={to} className="block rounded-2xl border border-dashed border-slate-300 bg-white p-6 hover:border-teal-600 transition">
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
      {meta && <p className="mt-3 text-xs text-slate-400">{meta}</p>}
    </Link>
  );
}

export function ArticlesIndex() {
  return (
    <>
      <Hero title="Training Guides" description="Practical guides and staff training material." />
      <section className="mx-auto max-w-[85rem] px-4 pb-24 sm:px-6 lg:px-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <Card key={a.slug} to={`/support/articles/${a.slug}`} title={a.title} description={a.description} meta={a.date} />
        ))}
      </section>
    </>
  );
}

export function ArticleDetail() {
  const { id } = useParams();
  const article = articles.find((a) => a.slug === id);
  if (!article) return <Hero title="Not found" description="Article not found." />;
  return (
    <>
      <Hero title={article.title} description={article.description} />
      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <p className="text-sm text-slate-400 mb-6">Published: {article.date}</p>
        {article.body.map((para, i) => (
          <p key={i} className="mb-5 text-slate-700 leading-8">
            {para}
          </p>
        ))}
        <div className="mt-10">
          <Link to="/support/articles" className="text-teal-700 underline underline-offset-4">← Back to guides</Link>
        </div>
      </section>
    </>
  );
}

export function ReferenceIndex() {
  return (
    <>
      <Hero title="Documentation" description="Find technical documentation and reference materials." />
      <section className="mx-auto max-w-[85rem] px-4 pb-24 sm:px-6 lg:px-8 grid gap-4 md:grid-cols-3">
        {references.map((r) => (
          <Card key={r.slug} to={`/support/reference/${r.slug}`} title={r.title} description={r.description} meta={r.date} />
        ))}
      </section>
    </>
  );
}

export function ReferenceDetail() {
  const { id } = useParams();
  const ref = references.find((r) => r.slug === id);
  if (!ref) return <Hero title="Not found" description="Reference not found." />;
  return (
    <>
      <Hero title={ref.title} description={ref.description} />
      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <p className="text-sm text-slate-400 mb-6">Published: {ref.date}</p>
        {ref.body.map((para, i) => (
          <p key={i} className="mb-5 text-slate-700 leading-8">
            {para}
          </p>
        ))}
        <div className="mt-10">
          <Link to="/support/reference" className="text-teal-700 underline underline-offset-4">← Back to documentation</Link>
        </div>
      </section>
    </>
  );
}

export function KnowledgeBase() {
  const all = [...articles, ...references];
  return (
    <>
      <Hero title="Support Center" description="Raise a case, reach our helpdesk, or browse guides and documentation." />
      <section className="mx-auto max-w-[85rem] px-4 pb-24 sm:px-6 lg:px-8 grid gap-4 md:grid-cols-2">
        {all.map((a) => (
          <Card key={a.slug} to={a.slug.includes('fontwandel') && references.includes(a as never) ? `/support/reference/${a.slug}` : `/support/articles/${a.slug}`} title={a.title} description={a.description} meta={a.date} />
        ))}
      </section>
    </>
  );
}

export function Whitepapers() {
  const items = whitepaperFiles as { title: string; description: string; readLink?: string }[];
  return (
    <>
      <Hero title="Whitepapers" description="In-depth reads on digital transformation for busy teams." />
      <section className="mx-auto max-w-[85rem] px-4 pb-24 sm:px-6 lg:px-8 grid gap-4 md:grid-cols-3">
        {items.map((w) => (
          <Card key={w.title} to={w.readLink ?? '#'} title={w.title} description={w.description} />
        ))}
      </section>
    </>
  );
}

export function NotFound() {
  return (
    <section className="mx-auto max-w-[85rem] px-4 pt-48 pb-32 text-center sm:px-6 lg:px-8">
      <h1 className="text-6xl font-bold text-slate-800">404</h1>
      <p className="mt-4 text-slate-600">Page not found.</p>
      <div className="mt-8">
        <Link to="/" className="rounded-lg bg-gold-500 px-6 py-2.5 text-black">Go home</Link>
      </div>
    </section>
  );
}
