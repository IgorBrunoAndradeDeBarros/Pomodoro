import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthContext } from '../../contexts/AuthContext';
import styles from './styles.module.css';

type ViewMode = 'login' | 'register' | 'recover';

export function Login() {
    const navigate = useNavigate();
    const { login, register } = useAuthContext();

    const usernameInputRef = useRef<HTMLInputElement | null>(null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'error' | 'success'>('error');
    const [isLoading, setIsLoading] = useState(false);
    const [viewMode, setViewMode] = useState<ViewMode>('login');

    useEffect(() => {
        usernameInputRef.current?.focus();
    }, [viewMode]);

    useEffect(() => {
        if (!message) return;
        const timeoutId = setTimeout(() => setMessage(''), 5000);
        return () => clearTimeout(timeoutId);
    }, [message]);

    function showError(msg: string) {
        setMessageType('error');
        setMessage(msg);
    }

    function showSuccess(msg: string) {
        setMessageType('success');
        setMessage(msg);
    }

    async function handleLoginSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!username.trim()) { showError('Informe o usuário.'); return; }
        if (!password) { showError('Informe a senha.'); return; }

        setIsLoading(true);
        try {
            await login(username.trim(), password);
            showSuccess('Login realizado com sucesso!');
            navigate('/home');
        } catch (err) {
            showError(err instanceof Error ? err.message : 'Erro ao fazer login.');
        } finally {
            setIsLoading(false);
        }
    }

    async function handleRegisterSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!username.trim()) { showError('Informe o usuário.'); return; }
        if (!password) { showError('Informe a senha.'); return; }
        if (password.length < 6) { showError('Senha deve ter no mínimo 6 caracteres.'); return; }
        if (password !== confirmPassword) { showError('As senhas não coincidem.'); return; }

        setIsLoading(true);
        try {
            await register(username.trim(), password);
            showSuccess('Conta criada com sucesso!');
            navigate('/home');
        } catch (err) {
            showError(err instanceof Error ? err.message : 'Erro ao criar conta.');
        } finally {
            setIsLoading(false);
        }
    }

    function handleSwitchToRegister() {
        setViewMode('register');
        setMessage('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
    }

    function handleSwitchToRecover() {
        setViewMode('recover');
        setMessage('');
    }

    function handleBackToLogin() {
        setViewMode('login');
        setMessage('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
    }

    return (
        <main className={styles.container}>
            <section className={styles.card}>
                <div className={styles.header}>
                    <strong className={styles.logo}>Chronos</strong>
                    <h1>
                        {viewMode === 'login' && 'Acesse sua conta'}
                        {viewMode === 'register' && 'Criar conta'}
                        {viewMode === 'recover' && 'Recuperar senha'}
                    </h1>
                    <p>
                        {viewMode === 'login' && 'Entre para acessar o Pomodoro.'}
                        {viewMode === 'register' && 'Preencha os dados para se cadastrar.'}
                        {viewMode === 'recover' && 'Informe seu e-mail para recuperar o acesso.'}
                    </p>
                </div>

                {/* ── LOGIN ── */}
                {viewMode === 'login' && (
                    <form className={styles.form} onSubmit={handleLoginSubmit}>
                        <div className={styles.field}>
                            <label htmlFor="login-user">Usuário</label>
                            <input
                                ref={usernameInputRef}
                                id="login-user"
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder="Digite seu usuário"
                                autoComplete="username"
                                disabled={isLoading}
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="login-password">Senha</label>
                            <input
                                id="login-password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Digite sua senha"
                                autoComplete="current-password"
                                disabled={isLoading}
                            />
                        </div>

                        {message && (
                            <p
                                className={`${styles.message} ${messageType === 'success' ? styles.messageSuccess : styles.messageError}`}
                                role="alert"
                            >
                                {message}
                            </p>
                        )}

                        <button
                            className={styles.submitButton}
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Entrando...' : 'Entrar'}
                        </button>

                        <div className={styles.actions}>
                            <button type="button" onClick={handleSwitchToRegister} disabled={isLoading}>
                                Não tem conta? Cadastre-se
                            </button>
                            <button type="button" onClick={handleSwitchToRecover} disabled={isLoading}>
                                Esqueci minha senha
                            </button>
                        </div>
                    </form>
                )}

                {/* ── REGISTER ── */}
                {viewMode === 'register' && (
                    <form className={styles.form} onSubmit={handleRegisterSubmit}>
                        <div className={styles.field}>
                            <label htmlFor="reg-user">Usuário</label>
                            <input
                                ref={usernameInputRef}
                                id="reg-user"
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder="Escolha um usuário"
                                autoComplete="username"
                                disabled={isLoading}
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="reg-password">Senha</label>
                            <input
                                id="reg-password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Mínimo 6 caracteres"
                                autoComplete="new-password"
                                disabled={isLoading}
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="reg-confirm">Confirmar senha</label>
                            <input
                                id="reg-confirm"
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                placeholder="Repita a senha"
                                autoComplete="new-password"
                                disabled={isLoading}
                            />
                        </div>

                        {message && (
                            <p
                                className={`${styles.message} ${messageType === 'success' ? styles.messageSuccess : styles.messageError}`}
                                role="alert"
                            >
                                {message}
                            </p>
                        )}

                        <button
                            className={styles.submitButton}
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Criando conta...' : 'Criar conta'}
                        </button>

                        <div className={styles.actions}>
                            <button type="button" onClick={handleBackToLogin} disabled={isLoading}>
                                Já tem conta? Faça login
                            </button>
                        </div>
                    </form>
                )}

                {/* ── RECOVER ── */}
                {viewMode === 'recover' && (
                    <div className={styles.fakeFlow}>
                        <h2>Recuperar senha</h2>
                        <p>
                            Tela de recuperação de senha em desenvolvimento.
                            Por enquanto, este fluxo é apenas uma simulação.
                        </p>

                        {message && (
                            <p className={styles.message} role="alert">
                                {message}
                            </p>
                        )}

                        <button
                            className={styles.submitButton}
                            type="button"
                            onClick={handleBackToLogin}
                        >
                            Voltar para login
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
}
