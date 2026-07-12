import React, { createContext, useContext, useState } from 'react';
import { ROLES } from './config/permissions.js';

const AUTH_STORAGE_KEY = "cyberinsight_auth_user";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Tenta carregar usuário do localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    // userData deve conter { name, email, role }
    setUser(userData);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);