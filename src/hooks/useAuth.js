import { useEffect, useState } from 'react';

const AUTH_STORAGE_KEY = 'blog.auth.user';
const ADMIN_ID = 'admin-owner';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    let userData;
    
    if (email === 'admin@blog.com' && password === 'admin123') {
      userData = {
        id: ADMIN_ID,
        email: email,
        name: 'Admin',
        role: 'admin',
        isAdmin: true,
      };
    } else {
      userData = {
        id: `user-${Date.now()}`,
        email: email,
        name: email.split('@')[0],
        role: 'user',
        isAdmin: false,
      };
    }

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  };

  const isAuthenticated = Boolean(user);
  const isAdmin = user?.isAdmin || false;

  return {
    user,
    isLoading,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    ADMIN_ID,
  };
}
