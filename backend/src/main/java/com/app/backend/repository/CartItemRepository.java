package com.app.backend.repository;

import com.app.backend.entities.Cart;
import com.app.backend.entities.CartItem;
import com.app.backend.entities.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findCartItemsByCartId(Cart cart, Pageable pageable);

    CartItem findCartItemBySessionId(String sessionId);

    @Query("SELECT count(cartItem) FROM CartItem cartItem WHERE cartItem.cartId = :cartId")
    int countByCartId(Cart cartId);

    List<CartItem> findAllByCartId(Cart cartId);

    void deleteAllByCartId(Cart cart);

    List<CartItem> findAllByProductId(Product product);
}
