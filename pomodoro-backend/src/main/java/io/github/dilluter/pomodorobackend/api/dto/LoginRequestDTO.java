package io.github.dilluter.pomodorobackend.api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequestDTO {

    @NotBlank(message = "Usuário é obrigatório.")
    private String username;

    @NotBlank(message = "Senha é obrigatória.")
    private String password;
}