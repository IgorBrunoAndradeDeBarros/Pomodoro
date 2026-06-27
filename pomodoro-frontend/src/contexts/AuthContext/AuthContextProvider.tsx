import { useCallback, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext';
import { loginUser, registerUser } from '../../adapters/authAdapter';

const TOKEN_KEY = 'chronos-token';
const USERNAME_KEY = 'chronos-username';

type AuthContextProviderProps = {
    children: React.ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [token, setToken] = useState<string | null>(
        () => sessionStorage.getItem(TOKEN_KEY)
    );
    const [username, setUsername] = useState<string | null>(
        () => sessionStorage.getItem(USERNAME_KEY)
    );

    const login = useCallback(async (user: string, password: string): Promise<void> => {
        const res = await loginUser({ username: user, password });
        sessionStorage.setItem(TOKEN_KEY, res.token);
        sessionStorage.setItem(USERNAME_KEY, res.username);
        setToken(res.token);
        setUsername(res.username);
    }, []);

    const register = useCallback(async (user: string, password: string, email?: string): Promise<void> => {
        const res = await registerUser({ username: user, password, email });
        sessionStorage.setItem(TOKEN_KEY, res.token);
        sessionStorage.setItem(USERNAME_KEY, res.username);
        setToken(res.token);
        setUsername(res.username);
    }, []);

    const logout = useCallback(() => {
        sessionStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem(USERNAME_KEY);
        setToken(null);
        setUsername(null);
    }, []);

    const value = useMemo(
        () => ({
            isAuthenticated: !!token,
            username,
            token,
            login,
            register,
            logout,
        }),
        [token, username, login, register, logout],
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
