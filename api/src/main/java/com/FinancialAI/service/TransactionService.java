package com.FinancialAI.service;

import com.FinancialAI.controller.request.TransactionRequest;
import com.FinancialAI.controller.request.TransactionUpdateRequest;
import com.FinancialAI.controller.response.TransactionResponse;
import com.FinancialAI.domain.Category;
import com.FinancialAI.domain.Transaction;
import com.FinancialAI.domain.User;
import com.FinancialAI.domain.enums.TransactionType;
import com.FinancialAI.mapper.TransactionMapper;
import com.FinancialAI.repository.CategoryRepository;
import com.FinancialAI.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final TransactionMapper transactionMapper;
    private final AuthService authService;
    private final CategoryRepository categoryRepository;

    public TransactionResponse includeTransaction(TransactionRequest transactionRequest) {
        User userLogged = authService.getUser();

        Category category = categoryRepository
                .findByIdAndUserIdOrGlobal(transactionRequest.categoryId(), userLogged.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Categoria não encontrada"));

        Transaction transaction = transactionMapper.toEntity(transactionRequest);

        transaction.setUser(userLogged);
        transaction.setCategory(category);

        transaction.setCreatedAt(LocalDateTime.now());
        transaction.setUpdatedAt(LocalDateTime.now());

        Transaction saved = transactionRepository.save(transaction);

        return transactionMapper.toResponse(saved);
    }

    public TransactionResponse updateTransaction(Long transactionId, TransactionUpdateRequest request) {
        User userLogged = authService.getUser();

        Transaction transaction = transactionRepository
                .findByIdAndUserId(transactionId, userLogged.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Transação não encontrada"));

        if (request.amount() != null) {
            transaction.setAmount(request.amount());
        }

        if (request.transactionDate() != null) {
            transaction.setTransactionDate(request.transactionDate());
        }

        if (request.description() != null) {
            transaction.setDescription(request.description());
        }

        if (request.transactionType() != null) {
            transaction.setTransactionType(request.transactionType());
        }

        if (request.categoryId() != null) {

            Category category = categoryRepository
                    .findByIdAndUserIdOrGlobal(request.categoryId(), userLogged.getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Categoria não encontrada"));

            transaction.setCategory(category);
        }

        transaction.setUpdatedAt(LocalDateTime.now());

        Transaction saved = transactionRepository.save(transaction);

        return transactionMapper.toResponse(saved);
    }

    public void deleteTransaction(Long transactionId) {
        User userLogged = authService.getUser();

        Transaction transaction = transactionRepository
                .findByIdAndUserId(transactionId, userLogged.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Transação não encontrada"));

        transactionRepository.delete(transaction);
    }

    public Page<TransactionResponse> listTransactions(Long categoryId, TransactionType type, Integer month, Integer year, Pageable pageable) {
        User userLogged = authService.getUser();

        Page<Transaction> transactions = transactionRepository.findWithFilters(
                userLogged.getId(), categoryId, type, month, year, pageable
        );

        return transactions.map(transactionMapper::toResponse);
    }
}
