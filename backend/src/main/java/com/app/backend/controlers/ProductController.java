package com.app.backend.controlers;

import com.app.backend.dto.ProductDto;
import com.app.backend.service.interfaces.IProductService;
import com.app.backend.utils.ProductToDTOConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {
    private final IProductService productService;

    @Autowired
    public ProductController(IProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/get/fiveproducts")
    public ResponseEntity<List<ProductDto>> getFiveItems() {
        List<ProductDto> products;
        try {
            products = ProductToDTOConverter.ConvertListToDTO(productService.getFiveProducts());
        } catch (IllegalArgumentException e) {
            System.err.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(products);
    }

    @GetMapping("/get/{sessionId}")
    public ResponseEntity<ProductDto> getProduct(@PathVariable String sessionId){
        ProductDto productDto;
        try{
            productDto =  ProductToDTOConverter.ConvertToDTO(productService.getProductBySessionId(sessionId));
        } catch (IllegalArgumentException e) {
            System.err.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(productDto);
    }
}
