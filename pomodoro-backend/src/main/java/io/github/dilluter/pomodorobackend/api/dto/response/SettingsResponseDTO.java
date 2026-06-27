package io.github.dilluter.pomodorobackend.api.dto.response;

import io.github.dilluter.pomodorobackend.api.entity.Settings;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class SettingsResponseDTO {

    Integer workTime;
    Integer shortBreakTime;
    Integer longBreakTime;

    public static SettingsResponseDTO from(Settings settings) {
        return SettingsResponseDTO.builder()
                .workTime(settings.getWorkTime())
                .shortBreakTime(settings.getShortBreakTime())
                .longBreakTime(settings.getLongBreakTime())
                .build();
    }
}