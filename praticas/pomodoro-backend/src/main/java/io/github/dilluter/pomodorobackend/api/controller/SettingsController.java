package io.github.dilluter.pomodorobackend.api.controller;

import io.github.dilluter.pomodorobackend.api.dto.SettingsRequestDTO;
import io.github.dilluter.pomodorobackend.api.dto.SettingsResponseDTO;
import io.github.dilluter.pomodorobackend.api.service.SettingsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/settings")
@RequiredArgsConstructor
public class SettingsController {

    private final SettingsService settingsService;

    @GetMapping
    public ResponseEntity<SettingsResponseDTO> getSettings() {
        return ResponseEntity.ok(settingsService.getSettings());
    }

    @PutMapping
    public ResponseEntity<SettingsResponseDTO> updateSettings(@Valid @RequestBody SettingsRequestDTO settingsRequestDTO) {
        return ResponseEntity.ok(settingsService.updateSettings(settingsRequestDTO));
    }
}