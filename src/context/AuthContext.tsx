"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "farmer" | "proxy";

export interface UserProfile {
  name: string;
  emailOrPhone: string;
  role: UserRole;
  province: string;
  avatarUrl?: string;
  coopName?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  loginWithGoogle: (role?: UserRole) => void;
  loginWithCredentials: (emailOrPhone: string, role?: UserRole, name?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("cropwise_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch {
      // Ignore localStorage errors
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginWithGoogle = (role: UserRole = "farmer") => {
    const newUser: UserProfile = {
      name: role === "proxy" ? "Seng Sopheak (Proxy Agent)" : "Sokha Chan (Farmer)",
      emailOrPhone: role === "proxy" ? "sopheak.seng@gmail.com" : "sokha.chan.agri@gmail.com",
      role,
      province: role === "proxy" ? "Takeo" : "Battambang",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      coopName: role === "proxy" ? "Bati Agricultural Cooperative" : undefined,
    };
    setUser(newUser);
    try {
      localStorage.setItem("cropwise_user", JSON.stringify(newUser));
    } catch {}
  };

  const loginWithCredentials = (
    emailOrPhone: string,
    role: UserRole = "farmer",
    name?: string
  ) => {
    const newUser: UserProfile = {
      name: name || (role === "proxy" ? "Vannak Chem (Proxy)" : "Lok Ta Seng (Farmer)"),
      emailOrPhone,
      role,
      province: "Battambang",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    };
    setUser(newUser);
    try {
      localStorage.setItem("cropwise_user", JSON.stringify(newUser));
    } catch {}
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("cropwise_user");
    } catch {}
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        loginWithGoogle,
        loginWithCredentials,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
