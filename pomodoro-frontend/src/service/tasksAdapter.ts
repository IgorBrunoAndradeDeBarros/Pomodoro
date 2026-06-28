import { BASE_URL } from './apiConfig';
import type { TaskModel } from '../models/TaskModel';

async function safeFetch(url: string, options?: RequestInit): Promise<Response> {
    try {
        return await fetch(url, options);
    } catch {
        throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão.');
    }
}

export async function getTasks(): Promise<TaskModel[]> {
    const token = sessionStorage.getItem('chronos-token');
    const res = await safeFetch(`${BASE_URL}/tasks`, {
        headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Erro ao buscar tarefas no servidor');
    return res.json();
}

export async function postTask(task: TaskModel): Promise<TaskModel> {
    const token = sessionStorage.getItem('chronos-token');
    const res = await safeFetch(`${BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error('Erro ao criar tarefa no servidor');
    return res.json();
}

export async function patchTaskComplete(id: string, completeDate: number): Promise<void> {
    const token = sessionStorage.getItem('chronos-token');
    const res = await safeFetch(`${BASE_URL}/tasks/${id}/complete`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ completeDate }),
    });
    if (!res.ok) throw new Error('Erro ao completar tarefa no servidor');
}

export async function patchTaskInterrupt(id: string, interruptDate: number): Promise<void> {
    const token = sessionStorage.getItem('chronos-token');
    const res = await safeFetch(`${BASE_URL}/tasks/${id}/interrupt`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ interruptDate }),
    });
    if (!res.ok) throw new Error('Erro ao interromper tarefa no servidor');
}

export async function deleteAllTasks(): Promise<void> {
    const token = sessionStorage.getItem('chronos-token');
    const res = await safeFetch(`${BASE_URL}/tasks`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Erro ao apagar histórico no servidor');
}