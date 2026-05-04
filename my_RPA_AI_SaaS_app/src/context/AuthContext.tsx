import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'ADMIN' | 'OPERATOR' | 'AUDITOR' | 'VIEWER' | 'CISO' | null;

interface AuthContextType {
  userRole: UserRole;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>(null);

  useEffect(() => {
    // Load from local storage on mount
    const storedRole = localStorage.getItem('userRole') as UserRole;
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  const login = (role: UserRole) => {
    localStorage.setItem('userRole', role as string);
    setUserRole(role);
  };

  const logout = () => {
    localStorage.removeItem('userRole');
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
