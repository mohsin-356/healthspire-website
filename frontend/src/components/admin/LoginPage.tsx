import React, { useState } from 'react';
import { useAuth } from '../../auth/auth-context';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Eye, EyeOff } from 'lucide-react';

export function LoginPage() {
  const { login, loginDemo } = useAuth();
  const ADMIN_EMAIL = 'mohsinsaeed356@gmail.com';
  const ADMIN_PASSWORD = 'mindspire32!@';
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState(ADMIN_PASSWORD);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Force the configured admin credentials regardless of input
      const ok = await login(ADMIN_EMAIL, ADMIN_PASSWORD);
      if (!ok) setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-start justify-center p-6 pt-24 md:pt-28">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-sm p-6">
        <div className="mb-4 text-center">
          <div className="text-2xl font-semibold">Admin Login</div>
          <div className="text-sm text-muted-foreground">Sign in to manage your content</div>
        </div>
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          {error && <div className="text-sm text-destructive">{error}</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
            <Button type="submit" disabled={loading} className="bg-primary text-primary-foreground">{loading ? 'Signing in...' : 'Sign In'}</Button>
            <Button type="button" variant="outline" onClick={loginDemo}>Live Demo</Button>
          </div>
          <div className="text-xs text-muted-foreground pt-1 text-center">Demo mode lets you explore. Editing is disabled.</div>
        </form>
      </div>
    </div>
  );
}
