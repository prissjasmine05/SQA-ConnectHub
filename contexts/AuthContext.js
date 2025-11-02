import { createContext, useContext, useEffect, useState } from 'react';

const AuthCtx = createContext({ user: null, loading: true, setUser: () => {} });

export function AuthProvider({ children }) {
  const [state, setState] = useState({ user: null, loading: true });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        setState({ user: data.authenticated ? data.user : null, loading: false });
      } catch {
        setState({ user: null, loading: false });
      }
    })();
  }, []);

  return <AuthCtx.Provider value={{ ...state, setUser: (u) => setState({ user: u, loading: false }) }}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);
