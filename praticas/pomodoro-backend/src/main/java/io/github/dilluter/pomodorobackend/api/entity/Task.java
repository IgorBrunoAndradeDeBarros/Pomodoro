package io.github.dilluter.pomodorobackend.api.entity;

import io.github.dilluter.pomodorobackend.api.util.TaskStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tasks")
public class Task {

    @Id
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer duration;

    @Column(nullable = false)
    private String type;

    @Column(name = "start_date", nullable = false)
    private Long startDate;

    @Column(name = "complete_date")
    private Long completeDate;

    @Column(name = "interrupt_date")
    private Long interruptDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private TaskStatus status = TaskStatus.IN_PROGRESS;
}