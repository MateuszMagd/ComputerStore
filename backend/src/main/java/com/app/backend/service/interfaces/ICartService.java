package com.app.backend.service.interfaces;

import com.app.backend.entities.Cart;
import com.app.backend.entities.User;

public interface ICartService {
    Cart getCartByUserEmail(String email);
    void createNewCartForUser(User user);

    void createNewCartWithEmail(String email);

}
