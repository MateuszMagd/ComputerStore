package com.app.backend.utils.converters;

import com.app.backend.dto.CartItemDto;
import com.app.backend.dto.UserInfoDto;
import com.app.backend.entities.CartItem;
import com.app.backend.entities.Product;
import com.app.backend.entities.User;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

public class UserToDTOConverter {
    public static UserInfoDto ConvertToDTO(User user) {
        UserInfoDto dto = new UserInfoDto();
        dto.setAddress(user.getAddress());
        dto.setName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setCountry(user.getCountry());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setCity(user.getCity());
        dto.setEmail(user.getEmail());
        return dto;
    }

    public static List<UserInfoDto> ConvertListToDTO(List<User> products) {
        return products.stream()
                .map(UserToDTOConverter::ConvertToDTO)
                .collect(Collectors.toList());
    }
}
