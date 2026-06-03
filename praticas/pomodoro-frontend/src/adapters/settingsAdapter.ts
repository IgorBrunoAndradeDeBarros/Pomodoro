import { BASE_URL } from './apiConfig';

export type SettingsPayload = {
    workTime: number;
    shortBreakTime: number;
    longBreakTime: number;
};

export async function getSettings(): Promise<SettingsPayload> {
    const res = await fetch(`${BASE_URL}/settings`);
    if (!res.ok) throw new Error('Erro ao buscar configurações');
    return res.json();
}

export async function putSettings(payload: SettingsPayload): Promise<SettingsPayload> {
    const res = await fetch(`${BASE_URL}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Erro ao salvar configurações');
    return res.json();
}
