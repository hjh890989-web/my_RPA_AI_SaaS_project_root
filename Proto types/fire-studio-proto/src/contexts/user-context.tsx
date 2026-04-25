"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { User, UserRole } from '@/lib/types';
import { users } from '@/lib/mock-data';

interface UserContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole) => {
    // For demo purposes, find the first user with the selected role
    const demoUser = users.find(u => u.role === role);
    if (demoUser) {
      setUser(demoUser);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
