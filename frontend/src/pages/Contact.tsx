import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/ui/Icon';
import { useContent } from '../admin/store';
import { ApiError, apiSend } from '../api';

type SendStatus = 'idle' | 'sending' | 'sent' | 'error';

export default function Contact() {
  const { content } = useContent();
  const lines = content.contact.channels.flatMap((c) => c.lines);
  const phones = lines.filter((l) => l.href.startsWith('tel:'));
  const emails = lines.filter((l) => l.href.startsWith('mailto:'));
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<SendStatus>('idle');
  const [feedback, setFeedback] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setFeedback('');
    try {
      const res = await apiSend<{ ok: boolean; detail: string }>('POST', '/contact', {
        name,
        email,
        message,
      });
      setStatus('sent');
      setFeedback(res.detail || 'Message received — our team will get back to you.');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      setFeedback(
        err instanceof ApiError
          ? err.message
          : 'Could not send right now. Please email us directly.',
      );
    }
  };
  return (
    <div className="mx-auto max-w-[85rem] px-4 pt-48 pb-28 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl lg:mb-14">
        <h2 className="text-4xl text-balance text-slate-800 sm:text-5xl md:text-6xl lg:text-7xl">
          Contact us
        </h2>
        <p className="mt-1 ml-1 text-slate-600">Questions, Comments or Feedback.</p>
      </div>
      <div className="grid grid-cols-1 gap-x-10 md:grid-cols-2 lg:gap-x-16">
        <div className="mb-10 h-fit rounded-xl bg-teal-400 p-8 md:order-2 md:mb-0">
          {status === 'sent' ? (
            <div className="rounded-xl bg-white p-6 text-center">
              <p className="text-lg font-semibold text-slate-800">Message sent</p>
              <p className="mt-2 text-sm text-slate-600">{feedback}</p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-5 rounded-lg bg-gold-500 px-6 py-2.5 text-sm font-medium text-black hover:bg-gold-600"
              >
                Send another
              </button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={submit}>
              <input
                required
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-white/40 bg-white px-3 py-2.5 text-sm"
              />
              <input
                required
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-white/40 bg-white px-3 py-2.5 text-sm"
              />
              <textarea
                id="input-message"
                required
                placeholder="Message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-lg border border-white/40 bg-white px-3 py-2.5 text-sm"
              />
              {status === 'error' && (
                <p className="rounded-lg bg-white/90 px-3 py-2 text-sm font-medium text-red-600">
                  {feedback}
                </p>
              )}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full rounded-lg bg-gold-500 px-6 py-2.5 font-medium text-black hover:bg-gold-600 disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
            </form>
          )}
        </div>
        <div className="space-y-14">
          <div className="flex gap-x-5">
            <Icon name="mapPin" />
            <div className="grow">
              <h4 className="font-semibold text-slate-600">Our address:</h4>
              <address className="mt-1 text-sm text-slate-500 not-italic">
                Arusha
                <br />
                Tanzania
              </address>
            </div>
          </div>
          <div className="flex gap-x-5">
            <Icon name="mobile" className="size-6 shrink-0 text-slate-600" />
            <div className="grow">
              <h4 className="font-semibold text-slate-600">Call us:</h4>
              {phones.map((phone) => (
                <p key={phone.label}>
                  <a className="mt-1 text-sm text-slate-500 transition-colors duration-300 hover:text-slate-400 focus:text-slate-400 focus:outline-hidden" href={phone.href}>
                    {phone.label}
                  </a>
                </p>
              ))}
            </div>
          </div>
          <div className="flex gap-x-5">
            <Icon name="email" className="size-6 shrink-0 text-slate-600" />
            <div className="grow">
              <h4 className="font-semibold text-slate-600">Contact us by email:</h4>
              {emails.map((email) => (
                <p key={email.label}>
                  <a className="mt-1 text-sm text-slate-500 transition-colors duration-300 hover:text-slate-400 focus:text-slate-400 focus:outline-hidden" href={email.href}>
                    {email.label}
                  </a>
                </p>
              ))}
            </div>
          </div>
          <div className="flex gap-x-5">
            <Icon name="info" className="size-6 shrink-0 text-slate-600" />
            <div className="grow">
              <h4 className="font-semibold text-slate-600">Support center</h4>
              <p className="mt-1 text-sm text-slate-500">Raise a case, reach our helpdesk, or browse guides.</p>
              <p className="mt-2">
                <Link to="/support/knowledge-base" className="group inline-flex items-center gap-x-2 text-sm font-medium text-slate-600 hover:underline">
                  Visit the support center <Icon name="chevronRight" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
