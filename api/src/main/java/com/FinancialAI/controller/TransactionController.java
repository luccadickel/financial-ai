package com.FinancialAI.controller;

import com.FinancialAI.controller.request.TransactionRequest;
import com.FinancialAI.controller.request.TransactionUpdateRequest;
import com.FinancialAI.controller.response.TransactionResponse;
import com.FinancialAI.domain.enums.TransactionType;
import com.FinancialAI.service.TransactionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TransactionResponse includeTransaction(@RequestBody @Valid TransactionRequest transactionRequest) {
        return transactionService.includeTransaction(transactionRequest);
    }

    @PutMapping("/{transactionId}")
    public ResponseEntity<TransactionResponse> updateTransaction(@PathVariable Long transactionId,
                                                                 @RequestBody @Valid TransactionUpdateRequest request) {
        TransactionResponse response = transactionService.updateTransaction(transactionId,request);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{transactionId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTransaction(@PathVariable Long transactionId) {
        transactionService.deleteTransaction(transactionId);
    }

    @GetMapping
    public Page<TransactionResponse> listTransactions(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) TransactionType type,
            @RequestParam(required = false) Integer month,
            @RequestParam(required = false) Integer year,
            @PageableDefault(size = 10, sort = "transactionDate", direction = Sort.Direction.DESC) Pageable pageable) {

        return transactionService.listTransactions(categoryId, type, month, year, pageable);
    }
}
