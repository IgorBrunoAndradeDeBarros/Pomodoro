package io.github.dilluter.pomodorobackend.api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "settings")
public class Settings {

    @Id
    private Long id;

    @Column(name = "work_time", nullable = false)
    private Integer workTime;

    @Column(name = "short_break_time", nullable = false)
    private Integer shortBreakTime;

    @Column(name = "long_break_time", nullable = false)
    private Integer longBreakTime;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}