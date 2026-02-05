package com.FinancialAI.domain;

import com.FinancialAI.domain.enums.TransactionType;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    private BigDecimal amount;
    private LocalDate transactionDate;
    private String description;

    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
