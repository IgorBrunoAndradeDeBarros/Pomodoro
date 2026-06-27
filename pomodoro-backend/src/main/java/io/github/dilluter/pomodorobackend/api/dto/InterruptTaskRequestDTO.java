package io.github.dilluter.pomodorobackend.api.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class InterruptTaskRequestDTO {

    @NotNull(message = "interruptDate é obrigatório")
    private Long interruptDate;
}