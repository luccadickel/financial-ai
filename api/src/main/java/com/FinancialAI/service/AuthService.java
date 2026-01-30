package com.FinancialAI.service;

import com.FinancialAI.controller.request.LoginRequest;
import com.FinancialAI.controller.response.LoginResponse;
import com.FinancialAI.domain.User;
import com.FinancialAI.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.Optional;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtEncoder jwtEncoder;

    public LoginResponse login(LoginRequest loginRequest) {
        Optional<User> optUser = userRepository.findByEmail(loginRequest.email());

        if (optUser.isEmpty() || !isLoginValid(loginRequest.password(), optUser.get().getPassword())) {
            throw new BadCredentialsException("Usuário ou senha incorretos!");
        }

        User user = optUser.get();

        long expiresIn = 600L;

        JwtClaimsSet jwt = JwtClaimsSet.builder()
                .issuer("financial-ai")
                .subject(user.getEmail())
                .expiresAt(Instant.now().plusSeconds(expiresIn))
                .issuedAt(Instant.now())
                .claim("email", user.getEmail())
                .claim("userId", user.getId())
                .build();

        String token = jwtEncoder.encode(JwtEncoderParameters.from(jwt)).getTokenValue();

        return new LoginResponse(token, expiresIn);
    }

    private String getEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !(authentication.getPrincipal() instanceof Jwt jwt)) {
            throw new ResponseStatusException(INTERNAL_SERVER_ERROR, "Usuário não autenticado");
        }

        return jwt.getClaimAsString("email");
    }

    public User getUser() {
        return userRepository.findByEmail(getEmail())
                .orElseThrow(() -> new ResponseStatusException(INTERNAL_SERVER_ERROR, "Usuario não encontrado ou email não esta autenticado"));
    }

    private boolean isLoginValid(String password, String savedPassword) {
        return passwordEncoder.matches(password, savedPassword);
    }
}
