package com.app.backend.service.interfaces;

import com.app.backend.entities.Cart;
import com.app.backend.entities.CartItem;

import java.util.List;

public interface ICartItemService {
    List<CartItem> getCartItemByCart(Cart cart, int page);
    void createNewItemCart(CartItem cartItem);

    void deleteItemCart(CartItem cartItem);

    CartItem getCartItemBySessionId(String sessionId);

    List<CartItem> getAllCartItems(Cart cart);

    int countCartItemByCart(Cart cart);

    void deleteAllByCart(Cart cart);
}
