package io.github.dilluter.pomodorobackend.api.exception;

import io.github.dilluter.pomodorobackend.api.exception.dto.MessageResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();ex.getBindingResult().getFieldErrors().
                forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<MessageResponseDTO> handleResourceNotFound(ResourceNotFoundException ex) {HttpStatus status = HttpStatus.NOT_FOUND;
        return ResponseEntity.status(status).body(new MessageResponseDTO(status.value(), ex.getMessage()));
    }

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<MessageResponseDTO> handleBusinessException(BusinessException ex) {HttpStatus status = HttpStatus.BAD_REQUEST;
        return ResponseEntity.status(status).body(new MessageResponseDTO(status.value(), ex.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<MessageResponseDTO> handleInternalError(Exception ex) {HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        return ResponseEntity.status(status).body(new MessageResponseDTO(status.value(), "Erro interno no servidor"));
    }
}