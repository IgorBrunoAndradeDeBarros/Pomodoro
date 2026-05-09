import { useEffect, useState } from 'react';
import {
    HistoryIcon,
    HouseIcon,
    LogOutIcon,
    MoonIcon,
    SettingsIcon,
    SunIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import styles from './styles.module.css';

import { RouterLink } from '../RouterLink';
import { useAuthContext } from '../../contexts/AuthContext';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
    const navigate = useNavigate();
    const { logout } = useAuthContext();

    const [theme, setTheme] = useState<AvailableThemes>(() => {
        const storageTheme =
            (localStorage.getItem('theme') as AvailableThemes) || 'dark';

        return storageTheme;
    });

    const nextThemeIcon = {
        dark: <SunIcon />,
        light: <MoonIcon />,
    };

    function handleThemeChange(
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) {
        event.preventDefault();

        setTheme(currentTheme => {
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

            localStorage.setItem('theme', nextTheme);

            return nextTheme;
        });
    }

    function handleLogout(
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) {
        event.preventDefault();

        logout();
        navigate('/');
    }

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <nav className={styles.menu}>
            <RouterLink href="/home" aria-label="Ir para home" title="Home">
                <HouseIcon />
            </RouterLink>

            <RouterLink
                href="/history"
                aria-label="Ver histórico"
                title="Histórico"
            >
                <HistoryIcon />
            </RouterLink>

            <RouterLink
                href="#"
                aria-label="Alterar tema"
                title="Alterar tema"
                onClick={handleThemeChange}
            >
                {nextThemeIcon[theme]}
            </RouterLink>

            <RouterLink
                href="#"
                aria-label="Configurações"
                title="Configurações"
            >
                <SettingsIcon />
            </RouterLink>

            <RouterLink href="#" aria-label="Sair" title="Sair" onClick={handleLogout}>
                <LogOutIcon />
            </RouterLink>
        </nav>
    );
}
