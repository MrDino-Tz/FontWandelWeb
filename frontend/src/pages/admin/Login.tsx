import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../admin/auth';
import { ApiError } from '../../api';

export default function Login() {
  const { login, isAuthed } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      if (await login(username, password)) {
        setError('');
        navigate('/fontadmin', { replace: true });
      } else {
        setError('Invalid username or password.');
      }
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'Cannot reach the server. Is the backend running?',
      );
    } finally {
      setBusy(false);
    }
  };

  if (isAuthed) return <Navigate to="/fontadmin" replace />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-off-white px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl bg-navy-800 px-8 pt-8 pb-6 text-center">
          <p className="dm-sans text-2xl text-white">
            <span className="font-semibold text-gold-500">Font</span>Wandel
          </p>
          <p className="mt-1 text-xs tracking-widest text-slate-400 uppercase">Site Admin</p>
        </div>
        <form
          onSubmit={submit}
          className="-mt-2 rounded-2xl border border-slate-200 bg-white p-6 pt-8 shadow-sm"
        >
          {error && (
            <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 ring-1 ring-inset ring-red-200">
              {error}
            </p>
          )}
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-slate-600">Username</span>
            <input
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </label>
          <label className="mt-3 block">
            <span className="mb-1 block text-xs font-medium text-slate-600">Password</span>
            <span className="relative block">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full rounded-lg border border-slate-200 bg-white py-2 pr-11 pl-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
                className="absolute inset-y-0 right-0 flex w-10 items-center justify-center rounded-r-lg text-slate-400 transition hover:text-teal-700 focus:outline-none"
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
                    <path d="M3 3l18 18" />
                    <path d="M10.6 5.1A9.8 9.8 0 0 1 12 5c7 0 10 7 10 7a17.6 17.6 0 0 1-2.9 3.9" />
                    <path d="M6.6 6.6C3.8 8.2 2 12 2 12s3 7 10 7a9.6 9.6 0 0 0 4.4-1.1" />
                    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </span>
          </label>
          <button
            type="submit"
            disabled={busy}
            className="mt-5 w-full rounded-lg bg-gold-500 px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-gold-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? 'Logging in…' : 'Log in'}
          </button>
          <p className="mt-4 text-center text-sm">
            <Link to="/" className="text-slate-500 underline-offset-4 hover:text-teal-700 hover:underline">
              ← Back to site
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
