import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { User } from '../types';

type AuthContextData = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  login: (data: any) => Promise<void>;
  signUp: (user: User) => Promise<boolean>;
  logout: () => void;
  error: string | undefined | null;
  fetching: boolean;
  user: User | null;
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

type Props = {
  children: React.ReactNode;
};
export const AuthContextProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>(null);
  const { request, error, fetching } = useFetch<any>();
  const [user, setUser] = useState<User | null>(null);

  const login = async (data: any) => {
    const json = await request('/api/v1/sign-in', 'POST', data);
    if (json.token) {
      localStorage.setItem('token', json.token);
      setToken(json.token);
    }
  };

  const signUp = async (user: User) => {
    const json = await request('/api/v1/sign-up', 'POST', user);
    if (json.user.id) {
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const getUser = useCallback(async () => {
    if (user) return;
    const json = await request('/api/v1/user/me');
    if (json.user) {
      setUser(json.user);
    }
  }, [request, user]);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    getUser();
  }, [getUser]);

  const value = {
    token,
    setToken,
    login,
    signUp,
    logout,
    error,
    fetching,
    user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};
