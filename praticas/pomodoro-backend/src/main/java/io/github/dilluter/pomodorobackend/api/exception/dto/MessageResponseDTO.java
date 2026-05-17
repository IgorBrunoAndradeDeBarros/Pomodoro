package io.github.dilluter.pomodorobackend.api.exception.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MessageResponseDTO {

    private int status;
    private String message;
}