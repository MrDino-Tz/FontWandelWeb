import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

// ---------------------------------------------------------------------------
// DEMO ONLY — mocked credentials, no backend. Do not use in production.
//   username: admin
//   password: fontwandel123
// ---------------------------------------------------------------------------
const DEMO_USER = 'admin';
const DEMO_PASS = 'fontwandel123';

const SESSION_KEY = 'fontwandel-admin-session';

interface AuthStore {
  isAuthed: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const Ctx = createContext<AuthStore | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthed, setIsAuthed] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      return false;
    }
  });

  const login = useCallback((username: string, password: string) => {
    const ok =
      username.trim() === DEMO_USER && password === DEMO_PASS;
    if (ok) {
      try {
        sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        /* storage unavailable */
      }
      setIsAuthed(true);
    }
    return ok;
  }, []);

  const logout = useCallback(() => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      /* storage unavailable */
    }
    setIsAuthed(false);
  }, []);

  const value = useMemo(() => ({ isAuthed, login, logout }), [isAuthed, login, logout]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth(): AuthStore {
  const store = useContext(Ctx);
  if (!store) throw new Error('useAuth must be used inside AuthProvider');
  return store;
}
