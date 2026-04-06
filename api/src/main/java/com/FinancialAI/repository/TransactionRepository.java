package com.FinancialAI.repository;

import com.FinancialAI.domain.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    Optional<Transaction> findByIdAndUserId(Long transactionId, Long id);

    List<Transaction> findAllByUserIdOrderByTransactionDateDesc(Long userId);
}
