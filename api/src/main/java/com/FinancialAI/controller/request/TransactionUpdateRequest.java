package com.FinancialAI.controller.request;

import com.FinancialAI.domain.enums.TransactionType;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;

public record TransactionUpdateRequest(BigDecimal amount,
                                       LocalDate transactionDate,
                                       Long categoryId,
                                       @Size(max = 255) String description,
                                       TransactionType transactionType) {
}
