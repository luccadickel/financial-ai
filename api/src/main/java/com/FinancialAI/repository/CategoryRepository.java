package com.FinancialAI.repository;

import com.FinancialAI.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    boolean existsByUserIdAndNameIgnoreCase(Long userId, String name);

    Optional<Category> findByIdAndUserId(Long categoryId, Long id);

    List<Category> findAllByUserIdOrUserIdIsNull(Long userId);

    @Query("SELECT c FROM Category c WHERE c.id = :categoryId AND (c.user.id = :userId OR c.user IS NULL)")
    Optional<Category> findByIdAndUserIdOrGlobal(@Param("categoryId") Long categoryId, @Param("userId") Long userId);
}
