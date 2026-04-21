import type { TaskStateModel } from './TaskStateModel';

export type TaskModel = {
    id: string;
    name: string;
    duration: number;
    startDate: number;
    completeDate?: number;
    interruptDate?: number;

    type: keyof TaskStateModel['config'];
};
