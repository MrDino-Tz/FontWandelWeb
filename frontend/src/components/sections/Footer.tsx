import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../../admin/store';
import { asset } from '../../utils/base';
import { ApiError, apiSend } from '../../api';

const copyrightYear = new Date().getFullYear();

export default function Footer() {
  const { content } = useContent();
  const { companyName, description } = content.footer;
  const lines = content.contact.channels.flatMap((c) => c.lines);
  const phones = lines.filter((l) => l.href.startsWith('tel:'));
  const emails = lines.filter((l) => l.href.startsWith('mailto:'));
  const [subEmail, setSubEmail] = useState('');
  const [subState, setSubState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [subNote, setSubNote] = useState('');

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (subState === 'sending') return;
    setSubState('sending');
    setSubNote('');
    try {
      await apiSend<{ ok: boolean }>('POST', '/contact', {
        name: 'Newsletter signup',
        email: subEmail,
        subject: 'More information request',
        message: 'Please send me more information about FontWandel.',
      });
      setSubState('sent');
      setSubEmail('');
    } catch (err) {
      setSubState('error');
      setSubNote(
        err instanceof ApiError
          ? err.message
          : 'Could not send right now. Please email us directly.',
      );
    }
  };

  return (
    <footer className="mt-auto w-full bg-linear-to-t from-teal-200 via-transparent to-white pb-10">
      <div className="mx-auto mt-auto w-full max-w-[85rem] px-4 pb-10 sm:px-6 lg:px-8">
        <hr className="mb-10 border-slate-200" />
        <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
          <div className="col-span-full self-center xl:col-span-2">
            <Link to="/" className="flex-none" aria-label="FontWandel home">
              <img
                src={asset('/FontwandelLogo.png')}
                alt={companyName}
                className="h-16 w-auto rounded-xl"
                width={96}
                height={64}
              />
            </Link>
            <p className="mt-5 text-pretty text-slate-600 lg:w-5/12 xl:w-10/12">
              {description}
            </p>
          </div>
          <div className="col-span-1 md:col-span-2 xl:col-span-1 xl:col-start-3 text-sm text-slate-600">
            <p className="font-semibold text-slate-700 mb-2">Contact</p>
            <p>Arusha, Tanzania</p>
            {phones.map((phone) => (
              <p key={phone.label}>
                <a href={phone.href} className="transition hover:text-teal-700">
                  {phone.label}
                </a>
              </p>
            ))}
            {emails.map((email) => (
              <p key={email.label}>
                <a href={email.href} className="transition hover:text-teal-700">
                  {email.label}
                </a>
              </p>
            ))}
          </div>
          <div id="subscribe" className="col-span-2 md:col-span-3 xl:col-span-2 scroll-mt-32">
            <h3 className="font-semibold text-slate-700">More information?</h3>
            {subState === 'sent' ? (
              <p className="mt-3 rounded-lg bg-teal-50 px-3 py-2.5 text-sm font-medium text-teal-700">
                Thanks — we&apos;ll be in touch shortly.
              </p>
            ) : (
              <form
                className="mt-3 flex gap-2"
                onSubmit={subscribe}
              >
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  value={subEmail}
                  onChange={(e) => setSubEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
                <button
                  type="submit"
                  disabled={subState === 'sending'}
                  className="rounded-lg bg-gold-500 px-4 py-2 text-sm font-medium text-black hover:bg-gold-600 disabled:opacity-60"
                >
                  {subState === 'sending' ? 'Sending…' : 'Subscribe'}
                </button>
              </form>
            )}
            {subState === 'error' && (
              <p className="mt-2 text-xs font-medium text-red-600">{subNote}</p>
            )}
          </div>
        </div>
        <hr className="mt-10 mb-5 border-slate-200" />
        <div className="grid gap-y-2 sm:flex sm:items-center sm:justify-between sm:gap-y-0">
          <p className="text-sm font-medium text-slate-600">
            &copy; {copyrightYear} {companyName} All rights reserved.
          </p>
          <p className="text-sm text-slate-500">
            <Link to="/fontadmin/login" className="underline-offset-4 transition hover:text-teal-700 hover:underline">
              Admin
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
