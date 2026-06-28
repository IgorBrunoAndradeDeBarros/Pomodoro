import { BASE_URL } from './apiConfig';

export type SettingsPayload = {
    workTime: number;
    shortBreakTime: number;
    longBreakTime: number;
};

async function safeFetch(url: string, options?: RequestInit): Promise<Response> {
    try {
        return await fetch(url, options);
    } catch {
        throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão.');
    }
}

export async function getSettings(): Promise<SettingsPayload> {
    const token = sessionStorage.getItem('chronos-token');
    const res = await safeFetch(`${BASE_URL}/settings`, {
        headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Erro ao buscar configurações no servidor');
    return res.json();
}

export async function putSettings(payload: SettingsPayload): Promise<SettingsPayload> {
    const token = sessionStorage.getItem('chronos-token');
    const res = await safeFetch(`${BASE_URL}/settings`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Erro ao salvar configurações no servidor');
    return res.json();
}