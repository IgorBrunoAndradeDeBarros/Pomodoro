import {BASE_URL} from "../services/apiConfig.ts";

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

async function safeFetch(url: string, options: RequestInit): Promise<Response> {
    try {
        return await fetch(url, options);
    } catch {
        throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.');
    }
}

async function parseErrorMessage(response: Response, fallback: string): Promise<string> {
    try {
        const data = await response.json();
        return data?.message ?? fallback;
    } catch {
        return fallback;
    }
}

async function handleResponse<T>(response: Response, fallback = 'Erro inesperado. Tente novamente.'): Promise<T> {
    if (!response.ok) {
        throw new Error(await parseErrorMessage(response, fallback));
    }

    try {
        return (await response.json()) as T;
    } catch {
        throw new Error('Resposta inválida do servidor.');
    }
}

export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
    const response = await safeFetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    return handleResponse<AuthResponse>(response, 'Erro ao criar conta.');
}

export async function loginUser(payload: AuthPayload): Promise<AuthResponse> {
    const response = await safeFetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    return handleResponse<AuthResponse>(response, 'Erro ao fazer login.');
}

export async function forgotPassword(email: string): Promise<void> {
    const response = await safeFetch(`${BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });
    if (!response.ok) {
        throw new Error(await parseErrorMessage(response, 'Erro ao solicitar recuperação.'));
    }
}

export async function resetPassword(token: string, newPassword: string): Promise<void> {
    const response = await safeFetch(`${BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
    });
    if (!response.ok) {
        throw new Error(await parseErrorMessage(response, 'Erro ao redefinir senha.'));
    }
}