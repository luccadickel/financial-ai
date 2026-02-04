package com.FinancialAI.controller.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record CategoryRequest(@NotBlank String name) {
}
