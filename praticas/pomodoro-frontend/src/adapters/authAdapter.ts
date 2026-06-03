import { BASE_URL } from './apiConfig';

export type AuthPayload = {
    username: string;
    password: string;
};

export type AuthResponse = {
    message: string;
    username: string;
};

async function handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message ?? 'Erro inesperado. Tente novamente.');
    }

    return data as T;
}

export async function registerUser(payload: AuthPayload): Promise<AuthResponse> {
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
