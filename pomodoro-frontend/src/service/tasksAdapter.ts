    import { BASE_URL } from './apiConfig';
    import type { TaskModel } from '../models/TaskModel';

    export async function getTasks(): Promise<TaskModel[]> {
        const res = await fetch(`${BASE_URL}/tasks`);
        if (!res.ok) throw new Error('Erro ao buscar tarefas');
        return res.json();
    }

    export async function postTask(task: TaskModel): Promise<TaskModel> {
        const res = await fetch(`${BASE_URL}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
        });
        if (!res.ok) throw new Error('Erro ao criar tarefa');
        return res.json();
    }

    export async function patchTaskComplete(id: string, completeDate: number): Promise<void> {
        const res = await fetch(`${BASE_URL}/tasks/${id}/complete`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completeDate }),
        });
        if (!res.ok) throw new Error('Erro ao completar tarefa');
    }

    export async function patchTaskInterrupt(id: string, interruptDate: number): Promise<void> {
        const res = await fetch(`${BASE_URL}/tasks/${id}/interrupt`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ interruptDate }),
        });
        if (!res.ok) throw new Error('Erro ao interromper tarefa');
    }

    export async function deleteAllTasks(): Promise<void> {
        const res = await fetch(`${BASE_URL}/tasks`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Erro ao apagar histórico');
    }
