package io.github.dilluter.pomodorobackend.api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDTO {

    private String message;
    private String username;
    private String token;

    public AuthResponseDTO(String message, String username) {
        this.message = message;
        this.username = username;
        this.token = null;
    }
}