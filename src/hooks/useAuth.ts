import { useMemo } from 'react';

export function useAuth() {
  const token = localStorage.getItem('token');

  const user = useMemo(() => {
    if (!token) return null;
    try {
      return JSON.parse(atob(token));
    } catch {
      return null;
    }
  }, [token]);

  return {
    isAuthenticated: !!user,
    role: user?.role ?? null,
    user,
  };
}
