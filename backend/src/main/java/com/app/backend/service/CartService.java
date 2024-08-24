package com.app.backend.service;

import com.app.backend.entities.Cart;
import com.app.backend.entities.User;
import com.app.backend.repository.CartRepository;
import com.app.backend.repository.UserRepository;
import com.app.backend.service.interfaces.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService implements ICartService {
    private CartRepository cartRepository;
    private UserRepository userRepository;

    @Autowired
    public CartService(CartRepository cartRepository, UserRepository userRepository) {
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
    }

    public Cart getCartByUserSessionId(String email) {
        User user = userRepository.getUserByEmail(email);
        if( user != null ) {
            return cartRepository.findCartsByUserId(user);
        }

        return null;
    }

}
