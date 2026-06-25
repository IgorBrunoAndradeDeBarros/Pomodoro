import { BASE_URL } from './apiConfig';

export type AuthPayload = {
    username: string;
    password: string;
};

export type RegisterPayload = {
    username: string;
    password: string;
    email?: string;
};

export type AuthResponse = {
    message: string;
    username: string;
    token: string;
};

async function handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message ?? 'Erro inesperado. Tente novamente.');
    }
    return data as T;
}

export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    return handleResponse<AuthResponse>(response);
}

export async function loginUser(payload: AuthPayload): Promise<AuthResponse> {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    return handleResponse<AuthResponse>(response);
}

export async function forgotPassword(email: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });
    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message ?? 'Erro ao solicitar recuperação.');
    }
}

export async function resetPassword(token: string, newPassword: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
    });
    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message ?? 'Erro ao redefinir senha.');
    }
}
