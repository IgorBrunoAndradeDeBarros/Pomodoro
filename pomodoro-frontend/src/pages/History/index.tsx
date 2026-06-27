import { TrashIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { Container } from '../../components/container';
import { DefaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/heading';
import { MainTemplate } from '../../tampletes/maintampletes';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { sortTasks, type SortTasksOptions } from '../../utils/sortTasks';
import { showMessage } from '../../service/showMessage';

import styles from './styles.module.css';

type SortState = Omit<SortTasksOptions, 'tasks'>;

export function History() {
    const { state, dispatch } = useTaskContext();

    const [sortTasksOptions, setSortTaskOptions] = useState<SortState>(() => {
        return {
            field: 'startDate',
            direction: 'desc',
        };
    });

    const hasTasks = state.tasks.length > 0;

    const sortedTasks = useMemo(() => {
        return sortTasks({
            tasks: state.tasks,
            field: sortTasksOptions.field,
            direction: sortTasksOptions.direction,
        });
    }, [state.tasks, sortTasksOptions.field, sortTasksOptions.direction]);

    useEffect(() => {
        document.title = 'Histórico - Chronos Pomodoro';
    }, []);

    useEffect(() => {
        return () => {
            showMessage.dismiss();
        };
    }, []);

    function handleSortTasks({ field }: Pick<SortTasksOptions, 'field'>) {
        setSortTaskOptions(prevState => {
            const isSameField = prevState.field === field;

            return {
                field,
                direction: isSameField && prevState.direction === 'desc' ? 'asc' : 'desc',
            };
        });
    }

    function handleResetHistory() {
        showMessage.dismiss();

        showMessage.confirm('Tem certeza?', confirmation => {
            if (!confirmation) return;

            dispatch({ type: TaskActionTypes.RESET_STATE });
        });
    }

    const taskTypeDictionary = {
        workTime: 'Foco',
        shortBreakTime: 'Descanso curto',
        longBreakTime: 'Descanso longo',
    };

    return (
        <MainTemplate>
            <Container>
                <Heading>
                    <span>History</span>

                    {hasTasks && (
                        <span className={styles.buttonContainer}>
              <DefaultButton
                  icon={<TrashIcon />}
                  color='red'
                  aria-label='Apagar todo o histórico'
                  title='Apagar histórico'
                  onClick={handleResetHistory}
              />
            </span>
                    )}
                </Heading>
            </Container>

            <Container>
                {hasTasks && (
                    <div className={styles.responsiveTable}>
                        <table>
                            <thead>
                            <tr>
                                <th
                                    onClick={() => handleSortTasks({ field: 'name' })}
                                    className={styles.thSort}
                                >
                                    Tarefa ↕
                                </th>

                                <th
                                    onClick={() => handleSortTasks({ field: 'duration' })}
                                    className={styles.thSort}
                                >
                                    Duração ↕
                                </th>

                                <th
                                    onClick={() => handleSortTasks({ field: 'startDate' })}
                                    className={styles.thSort}
                                >
                                    Data ↕
                                </th>

                                <th>Status</th>
                                <th>Tipo</th>
                            </tr>
                            </thead>

                            <tbody>
                            {sortedTasks.map(task => {
                                return (
                                    <tr key={task.id}>
                                        <td>{task.name}</td>
                                        <td>{task.duration}min</td>
                                        <td>{formatDate(task.startDate)}</td>
                                        <td>{getTaskStatus(task, state.activeTask)}</td>
                                        <td>{taskTypeDictionary[task.type]}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                )}

                {!hasTasks && (
                    <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
                        Ainda não existem tarefas criadas.
                    </p>
                )}
            </Container>
        </MainTemplate>
    );
}
