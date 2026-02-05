package com.FinancialAI.controller.request;

import com.FinancialAI.domain.enums.TransactionType;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;

public record TransactionRequest(@NotNull @Positive @Digits(integer = 10, fraction = 2) BigDecimal amount,
                                 @NotNull LocalDate transactionDate,
                                 @NotNull Long categoryId,
                                 @Size(max = 255) String description,
                                 @NotNull TransactionType transactionType) {
}
