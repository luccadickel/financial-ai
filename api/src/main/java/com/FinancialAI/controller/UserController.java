package com.FinancialAI.controller;

import com.FinancialAI.controller.request.UserRegisterRequest;
import com.FinancialAI.controller.response.UserResponse;
import com.FinancialAI.domain.User;
import com.FinancialAI.mapper.UserMapper;
import com.FinancialAI.service.AuthService;
import com.FinancialAI.service.UserRegistrationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRegistrationService userRegistrationService;
    private final AuthService authService;
    private final UserMapper userMapper;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse register(@RequestBody @Valid UserRegisterRequest request) {
        return userRegistrationService.register(request);
    }

    @GetMapping("/me")
    public UserResponse getUser() {
        User user = authService.getUser();
        return userMapper.toResponse(user);
    }
}
