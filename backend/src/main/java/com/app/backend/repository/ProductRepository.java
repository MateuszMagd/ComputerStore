package com.app.backend.repository;

import com.app.backend.entities.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p")
    List<Product> getFiveProducts(Pageable pageable);
    Product getProductsBySessionId(String sessionId);
}
