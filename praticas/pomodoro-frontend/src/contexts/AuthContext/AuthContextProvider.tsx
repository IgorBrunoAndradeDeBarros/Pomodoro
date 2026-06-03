import { useCallback, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext';
import {loginUser, registerUser} from "../../adapters/authAdapter.ts";

const STORAGE_KEY = 'chronos-auth';

type AuthContextProviderProps = {
    children: React.ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return sessionStorage.getItem(STORAGE_KEY) === '1';
    });

    const login = useCallback(async (username: string, password: string): Promise<void> => {
        await loginUser({ username, password });
        sessionStorage.setItem(STORAGE_KEY, '1');
        setIsAuthenticated(true);
    }, []);

    const register = useCallback(async (username: string, password: string): Promise<void> => {
        await registerUser({ username, password });
        sessionStorage.setItem(STORAGE_KEY, '1');
        setIsAuthenticated(true);
    }, []);

    const logout = useCallback(() => {
        sessionStorage.removeItem(STORAGE_KEY);
        setIsAuthenticated(false);
    }, []);

    const value = useMemo(
        () => ({
            isAuthenticated,
            login,
            register,
            logout,
        }),
        [isAuthenticated, login, register, logout],
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
