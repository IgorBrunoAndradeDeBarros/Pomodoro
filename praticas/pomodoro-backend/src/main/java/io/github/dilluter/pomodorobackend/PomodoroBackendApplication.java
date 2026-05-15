package com.pomodoro.api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "settings")
public class Settings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "workDuration é obrigatório")
    @Min(value = 1, message = "workDuration deve ser no mínimo 1")
    @Column(name = "work_duration", nullable = false)
    private Integer workDuration;

    @NotNull(message = "shortBreakDuration é obrigatório")
    @Min(value = 1, message = "shortBreakDuration deve ser no mínimo 1")
    @Column(name = "short_break_duration", nullable = false)
    private Integer shortBreakDuration;

    @NotNull(message = "longBreakDuration é obrigatório")
    @Min(value = 1, message = "longBreakDuration deve ser no mínimo 1")
    @Column(name = "long_break_duration", nullable = false)
    private Integer longBreakDuration;

    @NotNull(message = "cyclesBeforeLongBreak é obrigatório")
    @Min(value = 1, message = "cyclesBeforeLongBreak deve ser no mínimo 1")
    @Column(name = "cycles_before_long_break", nullable = false)
    private Integer cyclesBeforeLongBreak;

    // Valores default usados pelo service quando não há registro no banco
    public static io.github.dilluter.pomodorobackend.api.entity.Settings defaultSettings() {
        return io.github.dilluter.pomodorobackend.api.entity.Settings.builder()
                .workDuration(25)
                .shortBreakDuration(5)
                .longBreakDuration(15)
                .cyclesBeforeLongBreak(4)
                .build();
    }
}