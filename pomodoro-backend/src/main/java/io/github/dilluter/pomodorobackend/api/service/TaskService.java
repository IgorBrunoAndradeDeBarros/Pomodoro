package io.github.dilluter.pomodorobackend.api.service;

import io.github.dilluter.pomodorobackend.api.dto.TaskRequestDTO;
import io.github.dilluter.pomodorobackend.api.dto.TaskResponseDTO;
import io.github.dilluter.pomodorobackend.api.entity.Task;
import io.github.dilluter.pomodorobackend.api.exception.BusinessException;
import io.github.dilluter.pomodorobackend.api.exception.ResourceNotFoundException;
import io.github.dilluter.pomodorobackend.api.repository.TaskRepository;
import io.github.dilluter.pomodorobackend.api.util.TaskStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    public List<TaskResponseDTO> getAllTasks() {
        return taskRepository.findAllByOrderByStartDateDesc()
                .stream()
                .map(TaskResponseDTO::from)
                .toList();
    }

    public TaskResponseDTO createTask(TaskRequestDTO taskRequestDTO) {
        String id = (taskRequestDTO.getId() != null && !taskRequestDTO.getId().isBlank())
                ? taskRequestDTO.getId() : String.valueOf(System.currentTimeMillis());

        Task task = Task.builder()
                .id(id)
                .name(taskRequestDTO.getName())
                .duration(taskRequestDTO.getDuration())
                .type(taskRequestDTO.getType())
                .startDate(taskRequestDTO.getStartDate())
                .build();

        return TaskResponseDTO.from(taskRepository.save(task));
    }

    public TaskResponseDTO completeTask(String id, Long completeDate) throws ResourceNotFoundException, BusinessException {
        Task task = findOrThrow(id);
        assertInProgress(task);
        task.setStatus(TaskStatus.COMPLETED);
        task.setCompleteDate(completeDate);
        return TaskResponseDTO.from(taskRepository.save(task));
    }

    public TaskResponseDTO interruptTask(String id, Long interruptDate) throws ResourceNotFoundException, BusinessException {
        Task task = findOrThrow(id);
        assertInProgress(task);
        task.setStatus(TaskStatus.INTERRUPTED);
        task.setInterruptDate(interruptDate);
        return TaskResponseDTO.from(taskRepository.save(task));
    }

    public void deleteAllTasks() {
        taskRepository.deleteAll();
    }

    private Task findOrThrow(String id) throws ResourceNotFoundException {
        return taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task não encontrada: " + id));
    }

    private void assertInProgress(Task task) throws BusinessException {
        if (task.getStatus() != TaskStatus.IN_PROGRESS) {
            throw new BusinessException(
                    "Task já finalizada. Status atual: " + task.getStatus()
            );
        }
    }
}