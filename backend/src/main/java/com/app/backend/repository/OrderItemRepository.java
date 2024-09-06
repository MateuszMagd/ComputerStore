package com.app.backend.repository;

import com.app.backend.entities.OrderItem;
import com.app.backend.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    void deleteAllByProductId(Product productId);
    List<OrderItem> findAllByProductId(Product product);
}
