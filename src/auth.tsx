import React, { createContext, useContext, useState, useEffect } from 'react';

export type Role = 'Supervisor' | 'Gestora' | 'Diretor';

export interface User {
  name: string;
  email: string;
  role: Role;
}

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>(null!);

const fakeUsers: Record<string, User & { password: string }> = {
  'supervisor@example.com': {
    name: 'Supervisor',
    email: 'supervisor@example.com',
    role: 'Supervisor',
    password: '1234'
  },
  'gestora@example.com': {
    name: 'Gestora',
    email: 'gestora@example.com',
    role: 'Gestora',
    password: '1234'
  },
  'diretor@example.com': {
    name: 'Diretor',
    email: 'diretor@example.com',
    role: 'Diretor',
    password: '1234'
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('audit360_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = async (email: string, password: string) => {
    const u = fakeUsers[email];
    if (u && u.password === password) {
      const { password: _, ...info } = u;
      setUser(info);
      localStorage.setItem('audit360_user', JSON.stringify(info));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('audit360_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
