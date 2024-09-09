package com.app.backend.service.interfaces;

import com.app.backend.Enums.ProductType;
import com.app.backend.entities.Product;

import java.util.List;

public interface IProductService {
    List<Product> getFiveProducts();
    Product getProductBySessionId(String sessionId);

    List<Product> getAllProducts();

    void save(Product product);

    void delete(Product product);

    List<Product> getProductByProductTypeAsc(ProductType productType);

    List<Product> getProductByProductTypeDesc(ProductType productType);
}
