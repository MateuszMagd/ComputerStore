package com.app.backend.service.interfaces;

import com.app.backend.entities.Cart;
import com.app.backend.entities.CartItem;

import java.util.List;

public interface ICartItemService {
    List<CartItem> getCartItemByCart(Cart cart, int limit);
}
