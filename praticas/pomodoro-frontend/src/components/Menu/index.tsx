import {
    HistoryIcon,
    HouseIcon, LogOutIcon,
    MoonIcon,
    SettingsIcon,
    SunIcon,
} from 'lucide-react';
import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { RouterLink } from '../RouterLink';
import {useNavigate} from "react-router";
import {useAuthContext} from "../../contexts/AuthContext";

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
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <nav className={styles.menu}>
            <RouterLink
                className={styles.menuLink}
                href='/'
                aria-label='Ir para a Home'
                title='Ir para a Home'
            >
                <HouseIcon />
            </RouterLink>

            <RouterLink
                className={styles.menuLink}
                href='/history/'
                aria-label='Ver Histórico'
                title='Ver Histórico'
            >
                <HistoryIcon />
            </RouterLink>

            <RouterLink
                className={styles.menuLink}
                href='/settings/'
                aria-label='Configurações'
                title='Configurações'
            >
                <SettingsIcon />
            </RouterLink>

            <a
                className={styles.menuLink}
                href='#'
                aria-label='Mudar Tema'
                title='Mudar Tema'
                onClick={handleThemeChange}
            >
                {nextThemeIcon[theme]}
            </a>
            <RouterLink
                className={styles.menuLink}
                href='#'
                aria-label='Sair'
                title='Sair'
                onClick={handleLogout}
            >
                <LogOutIcon />
            </RouterLink>
        </nav>
    );
}
