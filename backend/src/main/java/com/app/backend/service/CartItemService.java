package com.app.backend.service;

import com.app.backend.entities.Cart;
import com.app.backend.entities.CartItem;
import com.app.backend.repository.CartItemRepository;
import com.app.backend.service.interfaces.ICartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartItemService implements ICartItemService {
    private CartItemRepository cartItemRepository;

    @Autowired
    public CartItemService(CartItemRepository cartItemRepository) {
        this.cartItemRepository = cartItemRepository;
    }

    public List<CartItem> getCartItemByCart(Cart cart, int limit) {
        PageRequest pageRequest = PageRequest.of(limit-3, limit);
        List<CartItem> cartItem = cartItemRepository.findCartItemsByCartId(cart, pageRequest);
        if(cartItem != null) {
            return cartItem;
        }

        return null;
    }
}
