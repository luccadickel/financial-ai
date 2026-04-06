package com.FinancialAI.service;

import com.FinancialAI.controller.request.UserRegisterRequest;
import com.FinancialAI.controller.response.UserResponse;
import com.FinancialAI.domain.User;
import com.FinancialAI.mapper.UserMapper;
import com.FinancialAI.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserRegistrationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    public UserResponse register(UserRegisterRequest request) {

        if (userRepository.existsByEmail(request.email())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,"Email já cadastrado");
        }

        User user = userMapper.toEntity(request);
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setCreateTime(LocalDateTime.now());
        user.setActive(true);

        userRepository.save(user);

        return userMapper.toResponse(user);
    }
}
