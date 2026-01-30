package com.FinancialAI.controller.response;

public record LoginResponse(String token,
                            long expiresIn) {
}
