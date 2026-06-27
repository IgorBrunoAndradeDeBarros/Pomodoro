package io.github.dilluter.pomodorobackend.api.repository;

import io.github.dilluter.pomodorobackend.api.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, String> {
    List<Task> findAllByOrderByStartDateDesc();
}