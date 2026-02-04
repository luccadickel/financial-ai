package com.FinancialAI.controller;

import com.FinancialAI.controller.request.CategoryRequest;
import com.FinancialAI.controller.response.CategoryResponse;
import com.FinancialAI.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse createCategory(@RequestBody @Valid CategoryRequest categoryRequest) {
        return categoryService.createCategory(categoryRequest);
    }

    @DeleteMapping("/{categoryId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCategory(@PathVariable Long categoryId) {
        categoryService.deleteCategory(categoryId);
    }

    @GetMapping
    public List<CategoryResponse> listCategories() {
        return categoryService.listCategories();
    }
}
