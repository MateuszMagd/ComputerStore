package com.app.backend.repository;

import com.app.backend.entities.Cart;
import com.app.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findCartsByUserId(User user);
}
