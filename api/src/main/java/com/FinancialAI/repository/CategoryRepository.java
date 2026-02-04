package com.FinancialAI.repository;

import com.FinancialAI.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    boolean existsByUserIdAndNameIgnoreCase(Long userId, String name);

    Optional<Category> findByIdAndUserId(Long categoryId, Long id);

    List<Category> findAllByUserId(Long userId);
}
