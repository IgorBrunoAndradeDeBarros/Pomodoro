package io.github.dilluter.pomodorobackend.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequestDTO {

    @NotBlank(message = "Usuário é obrigatório.")
    @Size(min = 3, max = 50, message = "Usuário deve ter entre 3 e 50 caracteres.")
    private String username;

    @NotBlank(message = "Senha é obrigatória.")
    @Size(min = 6, message = "Senha deve ter no mínimo 6 caracteres.")
    private String password;

    @Email(message = "E-mail inválido.")
    private String email;
}