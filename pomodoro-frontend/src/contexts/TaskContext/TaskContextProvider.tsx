import { useEffect, useReducer, useRef } from 'react';
import { initialTaskState } from './initialTaskState';
import { taskReducer } from './taskReducer';
import { TaskContext } from './TaskContext';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';
import { TaskActionTypes } from './taskActions';
import { loadBeep } from '../../utils/loadBeep';
import type { TaskStateModel } from '../../models/TaskStateModel';
import { getSettings } from '../../service/settingsAdapter';
import { getTasks, postTask, patchTaskComplete, patchTaskInterrupt, deleteAllTasks } from '../../service/tasksAdapter';

type TaskContextProviderProps = { children: React.ReactNode };

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
        getSettings()
            .then(settings => {
                dispatch({
                    type: TaskActionTypes.CHANGE_SETTINGS,
                    payload: {
                        workTime: settings.workTime,
                        shortBreakTime: settings.shortBreakTime,
                        longBreakTime: settings.longBreakTime,
                    },
                });
            })
            .catch(console.error);

        getTasks()
            .then(tasks => {
                dispatch({ type: TaskActionTypes.LOAD_TASKS, payload: tasks });
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        localStorage.setItem('state', JSON.stringify(state));
        document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;
    }, [state]);

    useEffect(() => {
        if (!state.activeTask) return;

        const worker = TimerWorkerManager.getInstance();

        postTask({
            id: state.activeTask.id,
            name: state.activeTask.name,
            duration: state.activeTask.duration,
            type: state.activeTask.type,
            startDate: state.activeTask.startDate,
            completeDate: null,
            interruptDate: null,
        }).catch(console.error);

        worker.onmessage(e => {
            const countDownSeconds = e.data;

            if (countDownSeconds <= 0) {
                if (playBeepRef.current) {
                    playBeepRef.current();
                    playBeepRef.current = null;
                }

                patchTaskComplete(state.activeTask!.id, Date.now()).catch(console.error);
                dispatch({ type: TaskActionTypes.COMPLETE_TASK });
                worker.terminate();
                return;
            }

            dispatch({
                type: TaskActionTypes.COUNT_DOWN,
                payload: { secondsRemaining: countDownSeconds },
            });
        });

        worker.postMessage(state);
        return () => { worker.terminate(); };
    }, [state.activeTask]);

    const prevActiveTaskRef = useRef(state.activeTask);
    useEffect(() => {
        const prev = prevActiveTaskRef.current;
        prevActiveTaskRef.current = state.activeTask;

        if (prev && !state.activeTask) {
            const interrupted = state.tasks.find(
                t => t.id === prev.id && t.interruptDate
            );
            if (interrupted) {
                patchTaskInterrupt(prev.id, interrupted.interruptDate!).catch(console.error);
            }
        }
    }, [state.activeTask, state.tasks]);

    useEffect(() => {
        if (state.activeTask && playBeepRef.current === null) {
            playBeepRef.current = loadBeep();
            return;
        }
        if (!state.activeTask) {
            playBeepRef.current = null;
        }
    }, [state.activeTask]);

    const dispatchWithSideEffects = (action: Parameters<typeof dispatch>[0]) => {
        if (action.type === TaskActionTypes.RESET_STATE) {
            deleteAllTasks().catch(console.error);
        }
        dispatch(action);
    };

    return (
        <TaskContext.Provider value={{ state, dispatch: dispatchWithSideEffects }}>
            {children}
        </TaskContext.Provider>
    );
}
