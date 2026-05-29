    package io.github.dilluter.pomodorobackend.api.controller;
    
    import io.github.dilluter.pomodorobackend.api.dto.CompleteTaskRequestDTO;
    import io.github.dilluter.pomodorobackend.api.dto.InterruptTaskRequestDTO;
    import io.github.dilluter.pomodorobackend.api.dto.TaskRequestDTO;
    import io.github.dilluter.pomodorobackend.api.dto.TaskResponseDTO;
    import io.github.dilluter.pomodorobackend.api.exception.BusinessException;
    import io.github.dilluter.pomodorobackend.api.exception.ResourceNotFoundException;
    import io.github.dilluter.pomodorobackend.api.service.TaskService;
    import jakarta.validation.Valid;
    import lombok.RequiredArgsConstructor;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;
    
    import java.util.List;
    
    @RestController
    @RequestMapping("/tasks")
    @RequiredArgsConstructor
    public class TaskController {
    
        private final TaskService taskService;
    
        @GetMapping
        public ResponseEntity<List<TaskResponseDTO>> getAllTasks() {
            return ResponseEntity.ok(taskService.getAllTasks());
        }
    
        @PostMapping
        public ResponseEntity<TaskResponseDTO> createTask(@Valid @RequestBody TaskRequestDTO taskRequestDTO) {
            return ResponseEntity.status(HttpStatus.CREATED).body(taskService.createTask(taskRequestDTO));
        }
    
        @PatchMapping("/{id}/complete")
        public ResponseEntity<TaskResponseDTO> completeTask(@PathVariable String id, @Valid @RequestBody CompleteTaskRequestDTO completeTaskRequestDTO) throws ResourceNotFoundException, BusinessException {
            return ResponseEntity.ok(taskService.completeTask(id, completeTaskRequestDTO.getCompleteDate()));
        }
    
        @PatchMapping("/{id}/interrupt")
        public ResponseEntity<TaskResponseDTO> interruptTask(@PathVariable String id, @Valid @RequestBody InterruptTaskRequestDTO interruptTaskRequestDTO) throws ResourceNotFoundException, BusinessException {
            return ResponseEntity.ok(taskService.interruptTask(id, interruptTaskRequestDTO.getInterruptDate()));
        }
    
        @DeleteMapping
        public ResponseEntity<Void> deleteAllTasks() {taskService.deleteAllTasks();
            return ResponseEntity.noContent().build();
        }
    }