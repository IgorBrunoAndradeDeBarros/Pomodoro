package io.github.dilluter.pomodorobackend.api.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SettingsRequestDTO {

    @NotNull(message = "workTime é obrigatório")
    @Min(value = 1, message = "workTime deve ser no mínimo 1")
    private Integer workTime;

    @NotNull(message = "shortBreakTime é obrigatório")
    @Min(value = 1, message = "shortBreakTime deve ser no mínimo 1")
    private Integer shortBreakTime;

    @NotNull(message = "longBreakTime é obrigatório")
    @Min(value = 1, message = "longBreakTime deve ser no mínimo 1")
    private Integer longBreakTime;
}