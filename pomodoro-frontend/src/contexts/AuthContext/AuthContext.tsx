import { createContext } from 'react';

export type AuthContextValue = {
    isAuthenticated: boolean;
    username: string | null;
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, password: string, email?: string) => Promise<void>;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
