package com.FinancialAI.mapper;

import com.FinancialAI.controller.request.TransactionRequest;
import com.FinancialAI.controller.response.TransactionResponse;
import com.FinancialAI.domain.Transaction;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TransactionMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "category", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Transaction toEntity(TransactionRequest transactionRequest);

    @Mapping(target = "categoryID", source = "category.id")
    @Mapping(target = "categoryName", source = "category.name")
    TransactionResponse toResponse(Transaction transaction);
}
