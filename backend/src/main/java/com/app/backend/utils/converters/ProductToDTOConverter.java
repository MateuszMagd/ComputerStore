package com.app.backend.utils.converters;

import com.app.backend.dto.ProductDto;
import com.app.backend.entities.Product;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

public class ProductToDTOConverter {
    public static ProductDto ConvertToDTO(Product product) {
        ProductDto dto = new ProductDto();
        dto.setSessionId(product.getSessionId());
        dto.setName(product.getName());
        dto.setSpecs(product.getSpecs());
        if (product.getPhoto() != null) {
            String base64Photo = Base64.getEncoder().encodeToString(product.getPhoto());
            dto.setPhoto(base64Photo);
        }
        dto.setType(product.getType());
        dto.setPrice(product.getPrice());
        dto.setAmount(product.getAmount());
        return dto;
    }

    public static List<ProductDto> ConvertListToDTO(List<Product> products) {
        return products.stream()
                .map(ProductToDTOConverter::ConvertToDTO)
                .collect(Collectors.toList());
    }
}
