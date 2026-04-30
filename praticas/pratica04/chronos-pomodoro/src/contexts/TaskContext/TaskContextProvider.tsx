import { useEffect, useReducer, useRef } from 'react';
import { initialTaskState } from './initialTaskState';
import { taskReducer } from './taskReducer';
import { TaskContext } from './TaskContext';
import { TaskActionTypes } from './taskActions';
import { loadBeep } from '../../utils/loadBeep';
import type { TaskStateModel } from '../../models/TaskStateModel';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';

type TaskContextProviderProps = {
    children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
    const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
        const storageState = localStorage.getItem('state');

        if (!storageState) return initialTaskState;

        try {
            const parsedStorageState = JSON.parse(storageState) as TaskStateModel;

            return {
                ...parsedStorageState,
                activeTask: null,
                secondsRemaining: 0,
                formattedSecondsRemaining: '00:00',
            };
        } catch {
            return initialTaskState;
        }
    });

    const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);

    const worker = TimerWorkerManager.getInstance();

    useEffect(() => {
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
            } else {
                dispatch({
                    type: TaskActionTypes.COUNT_DOWN,
                    payload: { secondsRemaining: countDownSeconds },
                });
            }
        });
    }, [worker]);

    useEffect(() => {
        localStorage.setItem('state', JSON.stringify(state));

        document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;

        if (!state.activeTask) {
            worker.terminate();
            return;
        }

        worker.postMessage(state);
    }, [worker, state]);

    useEffect(() => {
        if (!state.activeTask) {
            playBeepRef.current = null;
            return;
        }

        if (playBeepRef.current === null) {
            const play = loadBeep();
            playBeepRef.current = play;
            play();
        }
    }, [state.activeTask]);

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
}
