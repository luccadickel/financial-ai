package com.FinancialAI.controller.response;

import com.FinancialAI.domain.enums.TransactionType;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record TransactionResponse(Long id,
                                  Long categoryID,
                                  String categoryName,
                                  BigDecimal amount,
                                  LocalDate transactionDate,
                                  String description,
                                  TransactionType transactionType,
                                  LocalDateTime createdAt,
                                  LocalDateTime updatedAt) {
}
