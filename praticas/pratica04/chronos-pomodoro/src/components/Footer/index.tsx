import styles from './styles.module.css';
import { RouterLink } from '../RouterLink';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <p className={styles.description}>
                    Organize seu tempo, mantenha o foco e acompanhe sua produtividade.
                </p>

                <nav className={styles.links}>
                    <RouterLink href='/about-pomodoro/'>
                        Entenda a técnica Pomodoro
                    </RouterLink>

                    <RouterLink href='/'>
                        Chronos Pomodoro
                    </RouterLink>
                </nav>

                <p className={styles.copy}>
                    &copy; {new Date().getFullYear()} Chronos Pomodoro. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
}
