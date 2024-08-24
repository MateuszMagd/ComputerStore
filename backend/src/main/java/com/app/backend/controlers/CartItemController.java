package com.app.backend.controlers;

import com.app.backend.authenticate.TokenUtill.JwtTokenUtill;
import com.app.backend.dto.CartItemDto;
import com.app.backend.entities.Cart;
import com.app.backend.entities.CartItem;
import com.app.backend.service.interfaces.ICartItemService;
import com.app.backend.service.interfaces.ICartService;
import com.app.backend.utils.CartToDTOConverter;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/cart")
public class CartItemController {
    private final ICartService cartService;
    private final ICartItemService cartItemService;

    @Autowired
    public CartItemController(ICartService cartService, ICartItemService cartItemService) {
        this.cartService = cartService;
        this.cartItemService = cartItemService;
    }

    @GetMapping("/get/cart/item")
    public ResponseEntity<List<CartItemDto>> getCartItems(@RequestHeader("Authorization") String token,
                                         @RequestParam("limit") int limit) {
        try{
            Claims claims = JwtTokenUtill.verifyToken(token);
            Cart cart = cartService.getCartByUserSessionId(claims.get("email", String.class));
            if(cart == null) {
                throw new Exception("Something wrong . . .");
            }
            List<CartItemDto> cartItemList = CartToDTOConverter.ConvertListToDTO(cartItemService.getCartItemByCart(cart, limit));
            if(cart == null) {
                throw new Exception("Something wrong . . .");
            }
            return ResponseEntity.ok(cartItemList);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }
}
