import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Role = 'guest' | 'demo' | 'admin';

interface AuthContextType {
  role: Role;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginDemo: () => void;
  logout: () => void;
}

const AUTH_KEY = 'healthspire_auth_v1';
const TOKEN_KEY = 'healthspire_token_v1';
const API_BASE = (import.meta as any).env?.VITE_API_URL || 'http://localhost:4000/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children?: React.ReactNode }) {
  const [role, setRole] = useState<Role>('guest');
  const [token, setToken] = useState<string | null>(() => {
    try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
  });

  // Persist role for demo mode compatibility (non-authoritative)
  useEffect(() => { try { localStorage.setItem(AUTH_KEY, role); } catch {} }, [role]);

  // On load, if token exists, fetch /me to restore role
  useEffect(() => {
    let alive = true;
    async function restore() {
      if (!token) { setRole('guest'); return; }
      try {
        const res = await fetch(`${API_BASE}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) throw new Error('me failed');
        const me = await res.json();
        if (alive) setRole((me.role as Role) || 'guest');
      } catch {
        if (alive) { setRole('guest'); setToken(null); try { localStorage.removeItem(TOKEN_KEY); } catch {} }
      }
    }
    restore();
    return () => { alive = false; };
  }, [token]);

  const api = useMemo<AuthContextType>(() => ({
    role,
    token,
    login: async (email, password) => {
      try {
        const res = await fetch(`${API_BASE}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        if (!res.ok) return false;
        const data = await res.json();
        const tok = data.token as string;
        const r = (data.user?.role as Role) || 'guest';
        setToken(tok);
        setRole(r);
        try { localStorage.setItem(TOKEN_KEY, tok); } catch {}
        return true;
      } catch {
        return false;
      }
    },
    loginDemo: () => { setRole('demo'); setToken(null); try { localStorage.removeItem(TOKEN_KEY); } catch {} },
    logout: () => { setRole('guest'); setToken(null); try { localStorage.removeItem(TOKEN_KEY); } catch {} },
  }), [role, token]);

  return React.createElement(AuthContext.Provider, { value: api }, children);
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

