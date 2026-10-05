import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { ApiError, apiGet, apiSend } from '../api';

// ---------------------------------------------------------------------------
// Demo fallback (no backend reachable): local mocked credentials.
//   username: admin
//   password: fontwandel123
// With the API up, real cookie sessions are used instead.
// ---------------------------------------------------------------------------
const DEMO_USER = 'admin';
const DEMO_PASS = 'fontwandel123';

const SESSION_KEY = 'fontwandel-admin-session';

export type AuthMode = 'checking' | 'api' | 'demo';

interface AuthStore {
  isAuthed: boolean;
  mode: AuthMode;
  ready: boolean;
  username: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const Ctx = createContext<AuthStore | null>(null);

function demoAuthed(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

function setDemoAuthed(value: boolean) {
  try {
    if (value) sessionStorage.setItem(SESSION_KEY, '1');
    else sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* storage unavailable */
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [mode, setMode] = useState<AuthMode>('checking');
  const [ready, setReady] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const me = await apiGet<{ authenticated: boolean; username?: string }>('/auth/me');
        if (!cancelled) {
          setIsAuthed(true);
          setUsername(me.username ?? null);
          setMode('api');
        }
      } catch (err) {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 401) {
          setMode('api'); // backend reachable, just not logged in
        } else {
          setMode('demo'); // no backend — local demo mode
          if (demoAuthed()) {
            setIsAuthed(true);
            setUsername(DEMO_USER);
          }
        }
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    try {
      const res = await apiSend<{ authenticated: boolean; username?: string }>('POST', '/auth/login', {
        username,
        password,
      });
      setMode('api');
      setIsAuthed(true);
      setUsername(res.username ?? username.trim());
      return true;
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setMode('api');
        return false; // backend says no
      }
      // No backend — fall back to mocked demo credentials.
      const ok = username.trim() === DEMO_USER && password === DEMO_PASS;
      setMode('demo');
      setDemoAuthed(ok);
      setIsAuthed(ok);
      setUsername(ok ? DEMO_USER : null);
      return ok;
    }
  }, []);

  const logout = useCallback(() => {
    apiSend<{ authenticated: boolean }>('POST', '/auth/logout').catch(() => {
      /* backend may be absent — local logout still applies */
    });
    setDemoAuthed(false);
    setIsAuthed(false);
    setUsername(null);
  }, []);

  const value = useMemo(
    () => ({ isAuthed, mode, ready, username, login, logout }),
    [isAuthed, mode, ready, username, login, logout],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth(): AuthStore {
  const store = useContext(Ctx);
  if (!store) throw new Error('useAuth must be used inside AuthProvider');
  return store;
}
