package io.github.dilluter.pomodorobackend.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TaskRequestDTO {

    private String id;

    @NotBlank(message = "O nome da tarefa é obrigatório")
    private String name;

    @NotNull(message = "duration é obrigatório")
    private Integer duration;

    @NotBlank(message = "type é obrigatório")
    private String type;

    @NotNull(message = "startDate é obrigatório")
    private Long startDate;
}