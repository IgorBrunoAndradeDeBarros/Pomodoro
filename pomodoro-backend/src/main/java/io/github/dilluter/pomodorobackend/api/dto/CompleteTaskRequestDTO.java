package io.github.dilluter.pomodorobackend.api.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CompleteTaskRequestDTO {

    @NotNull(message = "completeDate é obrigatório")
    private Long completeDate;
}