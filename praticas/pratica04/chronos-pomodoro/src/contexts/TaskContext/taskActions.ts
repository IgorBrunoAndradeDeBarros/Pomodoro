import type { TaskModel } from '../../models/TaskModel';

export const TaskActionTypes = {
    START_TASK: 'START_TASK',
    INTERRUPT_TASK: 'INTERRUPT_TASK',
    COMPLETE_TASK: 'COMPLETE_TASK',
    COUNT_DOWN: 'COUNT_DOWN',
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
    type: typeof TaskActionTypes.COMPLETE_TASK;
}
    | {
    type: typeof TaskActionTypes.COUNT_DOWN;
    payload: {
        secondsRemaining: number;
    };
}
    | {
    type: typeof TaskActionTypes.RESET_STATE;
};
