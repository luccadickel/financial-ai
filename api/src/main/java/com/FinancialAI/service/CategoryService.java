package com.FinancialAI.service;

import com.FinancialAI.controller.request.CategoryRequest;
import com.FinancialAI.controller.response.CategoryResponse;
import com.FinancialAI.domain.Category;
import com.FinancialAI.domain.User;
import com.FinancialAI.mapper.CategoryMapper;
import com.FinancialAI.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final AuthService authService;

    public CategoryResponse createCategory(CategoryRequest categoryRequest) {
        User userLogged = authService.getUser();

        if (categoryRepository.existsByUserIdAndNameIgnoreCase(userLogged.getId(), categoryRequest.name())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Categoria já cadastrada");
        }

        Category category = categoryMapper.toEntity(categoryRequest);
        category.setUser(userLogged);

        Category saved = categoryRepository.save(category);

        return categoryMapper.toResponse(saved);
    }

    public void deleteCategory(Long categoryId) {
        User userLogged = authService.getUser();

        Category category = categoryRepository
                .findByIdAndUserId(categoryId, userLogged.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Categoria não encontrada"));

        categoryRepository.delete(category);
    }

    public List<CategoryResponse> listCategories() {
        User userLogged = authService.getUser();

        List<Category> categories = categoryRepository.findAllByUserId(userLogged.getId());

        return categories.stream()
                .map(categoryMapper::toResponse)
                .toList();
    }
}
