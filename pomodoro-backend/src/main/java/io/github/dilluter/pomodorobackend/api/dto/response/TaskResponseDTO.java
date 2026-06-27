package io.github.dilluter.pomodorobackend.api.dto.response;

import io.github.dilluter.pomodorobackend.api.entity.Task;
import io.github.dilluter.pomodorobackend.api.util.TaskStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TaskResponseDTO {

    private String id;
    private String name;
    private Integer duration;
    private String type;
    private Long startDate;
    private Long completeDate;
    private Long interruptDate;
    private TaskStatus status;

    public static TaskResponseDTO from(Task task) {
        return TaskResponseDTO.builder()
                .id(task.getId())
                .name(task.getName())
                .duration(task.getDuration())
                .type(task.getType())
                .startDate(task.getStartDate())
                .completeDate(task.getCompleteDate())
                .interruptDate(task.getInterruptDate())
                .status(task.getStatus())
                .build();
    }
}