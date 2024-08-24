package com.app.backend.utils;

import com.app.backend.dto.CartItemDto;
import com.app.backend.entities.CartItem;
import com.app.backend.entities.Product;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

public class CartToDTOConverter {
    public static CartItemDto ConvertToDTO(CartItem cartItem) {
        CartItemDto dto = new CartItemDto();
        Product product = cartItem.getProductId();

        dto.setName(product.getName());
        if (product.getPhoto() != null) {
            String base64Photo = Base64.getEncoder().encodeToString(product.getPhoto());
            dto.setPhoto(base64Photo);
        }
        dto.setSessionId(product.getSessionId());
        dto.setPrice(product.getPrice());
        dto.setQuantity(cartItem.getQuantity());

        return dto;
    }

    public static List<CartItemDto> ConvertListToDTO(List<CartItem> products) {
        return products.stream()
                .map(CartToDTOConverter::ConvertToDTO)
                .collect(Collectors.toList());
    }
}
