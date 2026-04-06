package com.FinancialAI.mapper;

import com.FinancialAI.controller.request.CategoryRequest;
import com.FinancialAI.controller.response.CategoryResponse;
import com.FinancialAI.domain.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    Category toEntity(CategoryRequest categoryRequest);

    CategoryResponse toResponse(Category category);
}
