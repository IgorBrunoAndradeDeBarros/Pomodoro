import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { useRef } from 'react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import type { TaskModel } from '../../models/TaskModel';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { showMessage } from '../../adapters/showMessage';

export function MainForm() {
    const { state, dispatch } = useTaskContext();
    const taskNameInput = useRef<HTMLInputElement>(null);
    const lastTaskName = state.tasks[state.tasks.length - 1]?.name || '';

    const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleType = getNextCycleType(nextCycle);

    function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        showMessage.dismiss();

        if (taskNameInput.current === null) return;

        const taskName = taskNameInput.current.value.trim();

        if (!taskName) {
            showMessage.warn('Digite o nome da tarefa');
            return;
        }

        const newTask: TaskModel = {
            id: Date.now().toString(),
            name: taskName,
            startDate: Date.now(),
            completeDate: null,
            interruptDate: null,
            duration: state.config[nextCycleType],
            type: nextCycleType,
        };

        dispatch({
            type: TaskActionTypes.START_TASK,
            payload: newTask,
        });

        showMessage.success('Tarefa iniciada');
    }

    function handleInterruptTask() {
        showMessage.dismiss();
        showMessage.error('Tarefa interrompida!');

        dispatch({
            type: TaskActionTypes.INTERRUPT_TASK,
        });
    }

    return (
        <form onSubmit={handleCreateNewTask} className='form'>
            <div className='formRow'>
                <DefaultInput
                    labelText='Tarefa'
                    id='task'
                    type='text'
                    placeholder='Digite o nome da tarefa'
                    ref={taskNameInput}
                    disabled={!!state.activeTask}
                    defaultValue={lastTaskName}
                />
            </div>

            <div className='formRow'>
                <p>Próximo intervalo é de {state.config[nextCycleType]}min</p>
            </div>

            {state.currentCycle > 0 && (
                <div className='formRow'>
                    <Cycles />
                </div>
            )}

            <div className='formRow'>
                {!state.activeTask && (
                    <DefaultButton
                        aria-label='Iniciar nova tarefa'
                        title='Iniciar nova tarefa'
                        type='submit'
                        icon={<PlayCircleIcon />}
                    />
                )}

                {!!state.activeTask && (
                    <DefaultButton
                        aria-label='Interromper tarefa atual'
                        title='Interromper tarefa atual'
                        type='button'
                        color='red'
                        icon={<StopCircleIcon />}
                        onClick={handleInterruptTask}
                        key='button-interrupt-task'
                    />
                )}
            </div>
        </form>
    );
}
