package com.app.backend.service.interfaces;

import com.app.backend.entities.Product;

import java.util.List;

public interface IProductService {
    List<Product> getFiveProducts();
    Product getProductBySessionId(String sessionId);

    List<Product> getAllProducts();

    void save(Product product);

    void delete(Product product);
}
