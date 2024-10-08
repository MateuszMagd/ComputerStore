package com.app.backend.entities;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Nonnull
    private String sessionId;
    @ManyToOne
    private Product productId;
    @ManyToOne
    private Cart cartId;
    private int quantity;

    public CartItem() {
    }

    public CartItem(Product productId, Cart cartId, int quantity) {
        this.productId = productId;
        this.cartId = cartId;
        this.quantity = quantity;
        this.sessionId = UUID.randomUUID().toString();
    }

    @Nonnull
    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(@Nonnull String sessionId) {
        this.sessionId = sessionId;
    }

    public Product getProductId() {
        return productId;
    }

    public void setProductId(Product productId) {
        this.productId = productId;
    }

    public Cart getCartId() {
        return cartId;
    }

    public void setCartId(Cart cartId) {
        this.cartId = cartId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
