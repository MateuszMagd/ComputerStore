package com.app.backend.controlers;

import com.app.backend.authenticate.TokenUtill.JwtTokenUtill;
import com.app.backend.dto.CartItemDto;
import com.app.backend.entities.Cart;
import com.app.backend.entities.CartItem;
import com.app.backend.service.interfaces.ICartItemService;
import com.app.backend.service.interfaces.ICartService;
import com.app.backend.service.interfaces.IProductService;
import com.app.backend.utils.converters.CartToDTOConverter;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
 *   VALIDATION:
 *   VALIDATION SHOULD BE MORE PRECISE AND SHOULD PREVENT FOR EXAMPLE SQL INJECTION
 *   FOR THIS PROJECT I JUST DID SIMPLE VALIDATION BECAUSE IT'S COLLAGE PROJECT ->
 *   THIS IS NOT FOR PRODUCTION
 * */


@RestController
@RequestMapping("/api/cart")
public class CartItemController {
    private final ICartService cartService;
    private final ICartItemService cartItemService;
    private final IProductService productService;

    @Autowired
    public CartItemController(ICartService cartService, ICartItemService cartItemService, IProductService productService) {
        this.cartService = cartService;
        this.cartItemService = cartItemService;
        this.productService = productService;
    }

    @GetMapping("/get/cart/item")
    public ResponseEntity<List<CartItemDto>> getCartItems(@RequestHeader("Authorization") String token,
                                         @RequestParam("page") int page) {
        try{
            Claims claims = JwtTokenUtill.verifyToken(token);

            Cart cart = cartService.getCartByUserEmail(claims.get("email", String.class));
            if(cart == null) {
                throw new Exception("Something wrong . . .");
            }

            List<CartItemDto> cartItemList = CartToDTOConverter.ConvertListToDTO(cartItemService.getCartItemByCart(cart, page));
            if(cartItemList == null) {
                throw new Exception("Something wrong . . .");
            }

            return ResponseEntity.ok(cartItemList);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/post/cart/item")
    public ResponseEntity<?> addToUserCart(@RequestHeader("Authorization") String token,
                                           @RequestParam("ProductSessionId") String productSessionId,
                                           @RequestParam("Quantity") int quantity) {
        try {
            Claims claims = JwtTokenUtill.verifyToken(token);
            Cart cart = cartService.getCartByUserEmail(claims.get("email", String.class));
            if(cart == null) {
                cartService.createNewCartWithEmail(claims.get("email", String.class));
                cart = cartService.getCartByUserEmail(claims.get("email", String.class));
                if(cart == null) {
                    return ResponseEntity.notFound().build();
                }
            }

            CartItem cartItem = new CartItem(productService.getProductBySessionId(productSessionId), cart, quantity);
            cartItemService.createNewItemCart(cartItem);

            return ResponseEntity.ok("Ok");
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }


    @PostMapping("/post/cart/delete/item")
    public ResponseEntity<?> deleteCartItemBySessionId(@RequestHeader("Authorization") String token,
                                                       @RequestParam("SessionId") String sessionId) {
        try {
            JwtTokenUtill.verifyToken(token);

            cartItemService.deleteItemCart(cartItemService.getCartItemBySessionId(sessionId));
            return ResponseEntity.ok("Ok");
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }


    @GetMapping("/get/cart/count")
    public ResponseEntity<Integer> countCartItems(@RequestHeader("Authorization") String token) {
        try {
            Claims claims = JwtTokenUtill.verifyToken(token);
            Cart cart = cartService.getCartByUserEmail(claims.get("email", String.class));

            int itemCount = cartItemService.countCartItemByCart(cart);
            int counter = (int) Math.ceil((double) itemCount / 5);
            System.out.println("\n " + counter + "\n ");

            return ResponseEntity.ok(counter);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }
}
