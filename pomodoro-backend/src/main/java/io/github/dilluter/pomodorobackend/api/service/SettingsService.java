package io.github.dilluter.pomodorobackend.api.service;

import io.github.dilluter.pomodorobackend.api.dto.SettingsRequestDTO;
import io.github.dilluter.pomodorobackend.api.dto.SettingsResponseDTO;
import io.github.dilluter.pomodorobackend.api.entity.Settings;
import io.github.dilluter.pomodorobackend.api.repository.SettingsRepository;
import io.github.dilluter.pomodorobackend.api.util.SettingsConstants;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class SettingsService {

    private final SettingsRepository settingsRepository;

    public SettingsResponseDTO getSettings() {
        return SettingsResponseDTO.from(settingsRepository.findById(SettingsConstants.SETTINGS_ID).orElse(buildDefaults())
        );
    }

    public SettingsResponseDTO updateSettings(SettingsRequestDTO dto) {
        Settings settings = settingsRepository.findById(SettingsConstants.SETTINGS_ID).orElse(buildDefaults());

        settings.setId(SettingsConstants.SETTINGS_ID);
        settings.setWorkTime(dto.getWorkTime());
        settings.setShortBreakTime(dto.getShortBreakTime());
        settings.setLongBreakTime(dto.getLongBreakTime());
        settings.setUpdatedAt(LocalDateTime.now());

        return SettingsResponseDTO.from(settingsRepository.save(settings));
    }

    private Settings buildDefaults() {
        return Settings.builder()
                .workTime(SettingsConstants.DEFAULT_WORK_DURATION)
                .shortBreakTime(SettingsConstants.DEFAULT_SHORT_BREAK)
                .longBreakTime(SettingsConstants.DEFAULT_LONG_BREAK)
                .updatedAt(LocalDateTime.now())
                .build();
    }
}