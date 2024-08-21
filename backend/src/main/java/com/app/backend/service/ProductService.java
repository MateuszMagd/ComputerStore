package com.app.backend.service;

import com.app.backend.entities.Product;
import com.app.backend.repository.ProductRepository;
import com.app.backend.service.interfaces.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService implements IProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository)
    {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> getFiveProducts() {
        return null;
    }


    @Override
    public Product getProductBySessionId(String sessionId) {
        return null;
    }
}
