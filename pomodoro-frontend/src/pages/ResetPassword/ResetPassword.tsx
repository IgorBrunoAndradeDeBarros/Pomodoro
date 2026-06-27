import { FormEvent, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { resetPassword } from '../../adapters/authAdapter';
import styles from '../Login/styles.module.css';

export function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token') ?? '';

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'error' | 'success'>('error');
    const [isLoading, setIsLoading] = useState(false);

    function showError(msg: string) { setMessageType('error'); setMessage(msg); }
    function showSuccess(msg: string) { setMessageType('success'); setMessage(msg); }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!newPassword) { showError('Informe a nova senha.'); return; }
        if (newPassword.length < 6) { showError('Senha deve ter no mínimo 6 caracteres.'); return; }
        if (newPassword !== confirmPassword) { showError('As senhas não coincidem.'); return; }
        if (!token) { showError('Link inválido. Solicite um novo.'); return; }

        setIsLoading(true);
        try {
            await resetPassword(token, newPassword);
            showSuccess('Senha redefinida! Redirecionando...');
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            showError(err instanceof Error ? err.message : 'Token inválido ou expirado.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className={styles.container}>
            <section className={styles.card}>
                <div className={styles.header}>
                    <strong className={styles.logo}>Chronos</strong>
                    <h1>Nova senha</h1>
                    <p>Crie uma nova senha para sua conta.</p>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <label htmlFor="new-password">Nova senha</label>
                        <input
                            id="new-password"
                            type="password"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            placeholder="Mínimo 6 caracteres"
                            autoComplete="new-password"
                            disabled={isLoading}
                            autoFocus
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="confirm-password">Confirmar senha</label>
                        <input
                            id="confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            placeholder="Repita a nova senha"
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

                    <button className={styles.submitButton} type="submit" disabled={isLoading}>
                        {isLoading ? 'Salvando...' : 'Redefinir senha'}
                    </button>

                    <div className={styles.actions}>
                        <button type="button" onClick={() => navigate('/')} disabled={isLoading}>
                            Voltar para login
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}
