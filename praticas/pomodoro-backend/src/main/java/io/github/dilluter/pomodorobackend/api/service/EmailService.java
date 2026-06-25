package io.github.dilluter.pomodorobackend.api.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.frontend-url:http://localhost:5173}")
    private String frontendUrl;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendPasswordResetEmail(String to, String token) {
        String resetLink = frontendUrl + "/reset-password?token=" + token;

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom(fromEmail);
        msg.setTo(to);
        msg.setSubject("Chronos — Redefinição de senha");
        msg.setText("""
                Você solicitou a redefinição de senha no Chronos.
                
                Clique no link abaixo para criar uma nova senha (válido por 1 hora):
                %s
                
                Se não foi você, ignore este e-mail.
                """.formatted(resetLink));

        mailSender.send(msg);
    }
}