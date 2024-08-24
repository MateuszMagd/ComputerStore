package com.app.backend.service.interfaces;

import com.app.backend.entities.Cart;

public interface ICartService {
    Cart getCartByUserSessionId(String email);
}
