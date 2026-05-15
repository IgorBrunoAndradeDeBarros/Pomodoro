import { useCallback, useMemo, useState } from 'react';
import { validateMockLogin } from '../../utils/validateMockLogin';
import { AuthContext } from './AuthContext';

const STORAGE_KEY = 'chronos-auth';

type AuthContextProviderProps = {
    children: React.ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return sessionStorage.getItem(STORAGE_KEY) === '1';
    });

    const login = useCallback((username: string, password: string) => {
        const isValid = validateMockLogin(username, password);

        if (isValid) {
            sessionStorage.setItem(STORAGE_KEY, '1');
            setIsAuthenticated(true);
        }

        return isValid;
    }, []);

    const logout = useCallback(() => {
        sessionStorage.removeItem(STORAGE_KEY);
        setIsAuthenticated(false);
    }, []);

    const value = useMemo(
        () => ({
            isAuthenticated,
            login,
            logout,
        }),
        [isAuthenticated, login, logout],
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
