package com.app.backend.repository;

import com.app.backend.entities.Cart;
import com.app.backend.entities.CartItem;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findCartItemsByCartId(Cart cart, Pageable pageable);
}
