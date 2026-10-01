import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { apiGet, apiSend, ApiError } from '../api';

interface AuthStore {
  isAuthed: boolean;
  /** True once the session check against the backend has finished. */
  ready: boolean;
  /** Resolves false on bad credentials; throws ApiError/network errors. */
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const Ctx = createContext<AuthStore | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    apiGet<{ authenticated: boolean }>('/auth/me')
      .then(() => {
        if (!cancelled) setIsAuthed(true);
      })
      .catch(() => {
        if (!cancelled) setIsAuthed(false);
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    try {
      await apiSend<{ authenticated: boolean }>('POST', '/auth/login', {
        username,
        password,
      });
      setIsAuthed(true);
      return true;
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) return false;
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    apiSend<{ authenticated: boolean }>('POST', '/auth/logout').catch(() => {});
    setIsAuthed(false);
  }, []);

  const value = useMemo(
    () => ({ isAuthed, ready, login, logout }),
    [isAuthed, ready, login, logout],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth(): AuthStore {
  const store = useContext(Ctx);
  if (!store) throw new Error('useAuth must be used inside AuthProvider');
  return store;
}
