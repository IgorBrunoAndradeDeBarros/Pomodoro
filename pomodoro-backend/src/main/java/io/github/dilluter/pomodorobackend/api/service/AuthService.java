package io.github.dilluter.pomodorobackend.api.service;

import io.github.dilluter.pomodorobackend.api.dto.LoginRequestDTO;
import io.github.dilluter.pomodorobackend.api.dto.RegisterRequestDTO;
import io.github.dilluter.pomodorobackend.api.dto.request.AuthResponseDTO;
import io.github.dilluter.pomodorobackend.api.entity.PasswordResetToken;
import io.github.dilluter.pomodorobackend.api.entity.User;
import io.github.dilluter.pomodorobackend.api.exception.BusinessException;
import io.github.dilluter.pomodorobackend.api.repository.PasswordResetTokenRepository;
import io.github.dilluter.pomodorobackend.api.repository.UserRepository;
import io.github.dilluter.pomodorobackend.api.security.JwtService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository resetTokenRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EmailService emailService;

    public AuthService(
            UserRepository userRepository,
            PasswordResetTokenRepository resetTokenRepository,
            JwtService jwtService,
            EmailService emailService) {

        this.userRepository = userRepository;
        this.resetTokenRepository = resetTokenRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.jwtService = jwtService;
        this.emailService = emailService;
    }

    public AuthResponseDTO register(RegisterRequestDTO dto) throws BusinessException {

        if (userRepository.existsByUsername(dto.getUsername())) {
            throw new BusinessException(
                    "Usuário '" + dto.getUsername() + "' já está em uso."
            );
        }

        if (dto.getEmail() != null && userRepository.existsByEmail(dto.getEmail())) {
            throw new BusinessException("E-mail já cadastrado.");
        }

        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setEmail(dto.getEmail());

        userRepository.save(user);

        String token = jwtService.generateToken(user.getUsername());

        return new AuthResponseDTO(
                "Cadastro realizado com sucesso.",
                user.getUsername(),
                token
        );
    }

    public AuthResponseDTO login(LoginRequestDTO dto) throws BusinessException {

        User user = userRepository.findByUsername(dto.getUsername())
                .orElseThrow(() -> new BusinessException("Usuário ou senha inválidos."));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new BusinessException("Usuário ou senha inválidos.");
        }

        String token = jwtService.generateToken(user.getUsername());

        return new AuthResponseDTO(
                "Login realizado com sucesso.",
                user.getUsername(),
                token
        );
    }

    @Transactional
    public void requestPasswordReset(String email) throws BusinessException {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException("E-mail não encontrado."));

        resetTokenRepository.deleteByUser(user);

        String rawToken = UUID.randomUUID().toString();

        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(rawToken);
        resetToken.setUser(user);
        resetToken.setExpiresAt(Instant.now().plus(1, ChronoUnit.HOURS));

        resetTokenRepository.save(resetToken);

        emailService.sendPasswordResetEmail(email, rawToken);
    }

    @Transactional
    public void resetPassword(String token, String newPassword) throws BusinessException {

        PasswordResetToken resetToken = resetTokenRepository.findByToken(token)
                .orElseThrow(() -> new BusinessException("Token inválido ou expirado."));

        if (resetToken.isUsed() || resetToken.getExpiresAt().isBefore(Instant.now())) {
            throw new BusinessException("Token inválido ou expirado.");
        }

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        resetToken.setUsed(true);
        resetTokenRepository.save(resetToken);
    }
}