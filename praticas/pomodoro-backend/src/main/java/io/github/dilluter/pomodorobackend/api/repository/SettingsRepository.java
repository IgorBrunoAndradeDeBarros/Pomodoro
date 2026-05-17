package io.github.dilluter.pomodorobackend.api.repository;

import io.github.dilluter.pomodorobackend.api.entity.Settings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SettingsRepository extends JpaRepository<Settings, Long> {
}