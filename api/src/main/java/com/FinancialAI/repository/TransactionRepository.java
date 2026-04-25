package com.FinancialAI.repository;

import com.FinancialAI.domain.Transaction;
import com.FinancialAI.domain.enums.TransactionType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    Optional<Transaction> findByIdAndUserId(Long transactionId, Long id);

    List<Transaction> findAllByUserIdOrderByTransactionDateDesc(Long userId);

    @Query("SELECT t FROM Transaction t WHERE t.user.id = :userId " +
            "AND (:categoryId IS NULL OR t.category.id = :categoryId) " +
            "AND (:type IS NULL OR t.transactionType = :type) " +
            "AND (:month IS NULL OR EXTRACT(MONTH FROM t.transactionDate) = :month) " +
            "AND (:year IS NULL OR EXTRACT(YEAR FROM t.transactionDate) = :year)")
    Page<Transaction> findWithFilters(
            @Param("userId") Long userId,
            @Param("categoryId") Long categoryId,
            @Param("type") TransactionType type,
            @Param("month") Integer month,
            @Param("year") Integer year,
            Pageable pageable
    );
}
