package io.github.dilluter.pomodorobackend.api.controller;

import io.github.dilluter.pomodorobackend.api.dto.request.ForgotPasswordRequestDTO;
import io.github.dilluter.pomodorobackend.api.dto.LoginRequestDTO;
import io.github.dilluter.pomodorobackend.api.dto.RegisterRequestDTO;
import io.github.dilluter.pomodorobackend.api.dto.ResetPasswordRequestDTO;
import io.github.dilluter.pomodorobackend.api.dto.request.AuthResponseDTO;
import io.github.dilluter.pomodorobackend.api.exception.BusinessException;
import io.github.dilluter.pomodorobackend.api.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(
            @Valid @RequestBody RegisterRequestDTO dto) throws BusinessException {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(authService.register(dto));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(
            @Valid @RequestBody LoginRequestDTO dto) throws BusinessException {
        return ResponseEntity.ok(authService.login(dto));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Void> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequestDTO dto) throws BusinessException {
        authService.requestPasswordReset(dto.getEmail());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(
            @Valid @RequestBody ResetPasswordRequestDTO dto) throws BusinessException {
        authService.resetPassword(
                dto.getToken(),
                dto.getNewPassword()
        );
        return ResponseEntity.noContent().build();
    }
}