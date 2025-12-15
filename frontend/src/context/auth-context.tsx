import { createContext, useEffect, useState, type ReactNode } from "react";
import { setAccessTokenMemory } from "../utils/auth-memory";

type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (newToken: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("u_token");
    if (storedToken) {
      setToken(storedToken);
      setAccessTokenMemory(storedToken);
    }
    setIsLoading(false);
  }, []);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("u_token", newToken);
    setAccessTokenMemory(newToken);
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("u_token");
    setAccessTokenMemory(null);
  };

  useEffect(() => {
    setAccessTokenMemory(token);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated: !!token, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};