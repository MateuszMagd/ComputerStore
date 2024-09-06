package com.app.backend.service;

import com.app.backend.entities.Product;
import com.app.backend.repository.ProductRepository;
import com.app.backend.service.interfaces.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
        Pageable limit = PageRequest.of(0, 5); // First page, 5 items
        return productRepository.getFiveProducts(limit);
    }


    @Override
    public Product getProductBySessionId(String sessionId) {
        return productRepository.getProductsBySessionId(sessionId);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public void save(Product product) {
        productRepository.save(product);
    }

    @Override
    public void delete(Product product) {
        productRepository.delete(product);
    }


}
