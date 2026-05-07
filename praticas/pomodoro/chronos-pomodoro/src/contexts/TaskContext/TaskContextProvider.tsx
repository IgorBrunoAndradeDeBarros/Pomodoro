import { useEffect, useReducer, useRef } from 'react';
import { initialTaskState } from './initialTaskState';
import { taskReducer } from './taskReducer';
import { TaskContext } from './TaskContext';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';
import { TaskActionTypes } from './taskActions';
import { loadBeep } from '../../utils/loadBeep';
import type { TaskStateModel } from '../../models/TaskStateModel';

type TaskContextProviderProps = {
    children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
    const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
        const storageState = localStorage.getItem('state');

        if (storageState === null) return initialTaskState;

        const parsedStorageState = JSON.parse(storageState) as TaskStateModel;

        return {
            ...parsedStorageState,
            activeTask: null,
            secondsRemaining: 0,
            formattedSecondsRemaining: '00:00',
        };
    });

    const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);

    useEffect(() => {
        localStorage.setItem('state', JSON.stringify(state));

        document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;
    }, [state]);

    useEffect(() => {
        if (!state.activeTask) {
            return;
        }

        const worker = TimerWorkerManager.getInstance();

        worker.onmessage(e => {
            const countDownSeconds = e.data;

            if (countDownSeconds <= 0) {
                if (playBeepRef.current) {
                    playBeepRef.current();
                    playBeepRef.current = null;
                }

                dispatch({
                    type: TaskActionTypes.COMPLETE_TASK,
                });

                worker.terminate();
                return;
            }

            dispatch({
                type: TaskActionTypes.COUNT_DOWN,
                payload: {
                    secondsRemaining: countDownSeconds,
                },
            });
        });

        worker.postMessage(state);

        return () => {
            worker.terminate();
        };
    }, [state.activeTask]);

    useEffect(() => {
        if (state.activeTask && playBeepRef.current === null) {
            playBeepRef.current = loadBeep();
            return;
        }

        if (!state.activeTask) {
            playBeepRef.current = null;
        }
    }, [state.activeTask]);

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
}
