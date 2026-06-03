package io.github.dilluter.pomodorobackend.api.service;

import io.github.dilluter.pomodorobackend.api.dto.LoginRequestDTO;
import io.github.dilluter.pomodorobackend.api.dto.RegisterRequestDTO;
import io.github.dilluter.pomodorobackend.api.dto.request.AuthResponseDTO;
import io.github.dilluter.pomodorobackend.api.entity.User;
import io.github.dilluter.pomodorobackend.api.exception.BusinessException;
import io.github.dilluter.pomodorobackend.api.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public AuthResponseDTO register(RegisterRequestDTO dto) throws BusinessException {
        if (userRepository.existsByUsername(dto.getUsername())) {
            throw new BusinessException("Usuário '" + dto.getUsername() + "' já está em uso.");
        }

        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        userRepository.save(user);

        return new AuthResponseDTO("Cadastro realizado com sucesso.", user.getUsername());
    }

    public AuthResponseDTO login(LoginRequestDTO dto) throws BusinessException {
        User user = userRepository.findByUsername(dto.getUsername())
                .orElseThrow(() -> new BusinessException("Usuário ou senha inválidos."));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new BusinessException("Usuário ou senha inválidos.");
        }

        return new AuthResponseDTO("Login realizado com sucesso.", user.getUsername());
    }
}