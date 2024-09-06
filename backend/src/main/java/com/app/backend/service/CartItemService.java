package com.app.backend.service;

import com.app.backend.entities.Cart;
import com.app.backend.entities.CartItem;
import com.app.backend.entities.Product;
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

    @Override
    public List<CartItem> getCartItemByCart(Cart cart, int page) {
        PageRequest pageRequest = PageRequest.of(page, 5);
        return cartItemRepository.findCartItemsByCartId(cart, pageRequest);
    }
    @Override
    public void createNewItemCart(CartItem cartItem) {
        cartItemRepository.save(cartItem);
    }

    @Override
    public void deleteItemCart(CartItem cartItem) {
        cartItemRepository.delete(cartItem);
    }

    @Override
    public CartItem getCartItemBySessionId(String sessionId) {
        return cartItemRepository.findCartItemBySessionId(sessionId);
    }

    @Override
    public List<CartItem> getAllCartItems(Cart cart) {
        return cartItemRepository.findAllByCartId(cart);
    }

    @Override
    public int countCartItemByCart(Cart cart) {
        return cartItemRepository.countByCartId(cart);
    }

    @Override
    public void delete(CartItem cart) {
        cartItemRepository.delete(cart);
    }


    @Override
    public void deleteAllByCart(Cart cart) {
        cartItemRepository.deleteAllByCartId(cart);
    }



    @Override
    public List<CartItem> getAllCartItemsByProduct(Product product) {
        return cartItemRepository.findAllByProductId(product);
    }

}
