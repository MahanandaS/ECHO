import { useEffect, useState } from 'react';

const AUTH_STORAGE_KEY = 'blog.auth.user';
const USERS_STORAGE_KEY = 'blog.users.v1';
const ADMIN_ID = 'admin-owner';

// Initialize with admin user
const initializeUsers = () => {
  const existing = localStorage.getItem(USERS_STORAGE_KEY);
  if (!existing) {
    const defaultUsers = [
      {
        id: ADMIN_ID,
        email: 'admin@blog.com',
        password: 'admin123',
        name: 'Admin',
        role: 'admin',
        isAdmin: true,
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(defaultUsers));
  }
};

const getUsers = () => {
  try {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeUsers();
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

  const signup = (email, password, name) => {
    if (!email || !password || !name) {
      throw new Error('All fields are required');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    if (!email.includes('@')) {
      throw new Error('Please enter a valid email');
    }

    const users = getUsers();
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      throw new Error('Email already registered');
    }

    const newUser = {
      id: `user-${Date.now()}`,
      email,
      password,
      name: name.trim(),
      role: 'user',
      isAdmin: false,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);

    const userData = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      isAdmin: newUser.isAdmin,
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const login = (email, password) => {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const users = getUsers();
    const foundUser = users.find((u) => u.email === email && u.password === password);

    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    const userData = {
      id: foundUser.id,
      email: foundUser.email,
      name: foundUser.name,
      role: foundUser.role,
      isAdmin: foundUser.isAdmin,
    };

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
    signup,
    logout,
    ADMIN_ID,
  };
}
