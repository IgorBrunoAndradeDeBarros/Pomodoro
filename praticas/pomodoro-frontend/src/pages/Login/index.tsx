import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthContext } from '../../contexts/AuthContext';
import styles from './styles.module.css';

type ViewMode = 'login' | 'register' | 'recover';

export function Login() {
    const navigate = useNavigate();
    const { login } = useAuthContext();

    const usernameInputRef = useRef<HTMLInputElement | null>(null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [viewMode, setViewMode] = useState<ViewMode>('login');

    useEffect(() => {
        usernameInputRef.current?.focus();
    }, []);

    useEffect(() => {
        if (!message) return;

        const timeoutId = setTimeout(() => {
            setMessage('');
        }, 4000);

        return () => clearTimeout(timeoutId);
    }, [message]);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!username.trim()) {
            setMessage('Informe o usuário.');
            return;
        }

        if (!password) {
            setMessage('Informe a senha.');
            return;
        }

        const isValidLogin = login(username, password);

        if (!isValidLogin) {
            setMessage('Usuário ou senha inválidos.');
            return;
        }

        setMessage('Login realizado com sucesso.');
        navigate('/home');
    }

    function handleRegisterClick() {
        setViewMode('register');
        setMessage('Fluxo de cadastro ainda será implementado.');
    }

    function handleRecoverClick() {
        setViewMode('recover');
        setMessage('Fluxo de recuperação de senha ainda será implementado.');
    }

    function handleBackToLoginClick() {
        setViewMode('login');
        setMessage('');
    }

    return (
        <main className={styles.container}>
            <section className={styles.card}>
                <div className={styles.header}>
                    <strong className={styles.logo}>Chronos</strong>
                    <h1>Acesse sua conta</h1>
                    <p>Entre para acessar o Pomodoro.</p>
                </div>

                {viewMode === 'login' && (
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.field}>
                            <label htmlFor="login-user">Usuário</label>
                            <input
                                ref={usernameInputRef}
                                id="login-user"
                                type="text"
                                value={username}
                                onChange={event =>
                                    setUsername(event.target.value)
                                }
                                placeholder="Digite seu usuário"
                                autoComplete="username"
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="login-password">Senha</label>
                            <input
                                id="login-password"
                                type="password"
                                value={password}
                                onChange={event =>
                                    setPassword(event.target.value)
                                }
                                placeholder="Digite sua senha"
                                autoComplete="current-password"
                            />
                        </div>

                        {message && (
                            <p className={styles.message} role="alert">
                                {message}
                            </p>
                        )}

                        <button className={styles.submitButton} type="submit">
                            Entrar
                        </button>

                        <div className={styles.actions}>
                            <button
                                type="button"
                                onClick={handleRegisterClick}
                            >
                                Não tem conta? Cadastre-se
                            </button>

                            <button
                                type="button"
                                onClick={handleRecoverClick}
                            >
                                Esqueci minha senha
                            </button>
                        </div>
                    </form>
                )}

                {viewMode === 'register' && (
                    <div className={styles.fakeFlow}>
                        <h2>Cadastro</h2>
                        <p>
                            Tela de cadastro em desenvolvimento. Por enquanto,
                            este fluxo é apenas uma simulação.
                        </p>

                        {message && (
                            <p className={styles.message} role="alert">
                                {message}
                            </p>
                        )}

                        <button
                            className={styles.submitButton}
                            type="button"
                            onClick={handleBackToLoginClick}
                        >
                            Voltar para login
                        </button>
                    </div>
                )}

                {viewMode === 'recover' && (
                    <div className={styles.fakeFlow}>
                        <h2>Recuperar senha</h2>
                        <p>
                            Tela de recuperação de senha em desenvolvimento. Por
                            enquanto, este fluxo é apenas uma simulação.
                        </p>

                        {message && (
                            <p className={styles.message} role="alert">
                                {message}
                            </p>
                        )}

                        <button
                            className={styles.submitButton}
                            type="button"
                            onClick={handleBackToLoginClick}
                        >
                            Voltar para login
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
}
