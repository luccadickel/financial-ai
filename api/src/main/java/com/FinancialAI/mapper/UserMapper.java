package com.FinancialAI.mapper;

import com.FinancialAI.controller.request.UserRegisterRequest;
import com.FinancialAI.controller.response.UserResponse;
import com.FinancialAI.domain.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createTime", ignore = true)
    @Mapping(target = "active", ignore = true)
    @Mapping(target = "password", ignore = true)
    User toEntity(UserRegisterRequest userRegisterRequest);

    UserResponse toResponse(User user);
}
