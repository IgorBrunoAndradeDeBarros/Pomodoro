import type { TaskModel } from '../../models/TaskModel';

export const TaskActionTypes = {
    START_TASK: 'START_TASK',
    INTERRUPT_TASK: 'INTERRUPT_TASK',
    RESET_STATE: 'RESET_STATE',
} as const;

export type TaskActionTypes =
    (typeof TaskActionTypes)[keyof typeof TaskActionTypes];

export type TaskActionModel =
    | {
    type: typeof TaskActionTypes.START_TASK;
    payload: TaskModel;
}
    | {
    type: typeof TaskActionTypes.INTERRUPT_TASK;
}
    | {
    type: typeof TaskActionTypes.RESET_STATE;
};
