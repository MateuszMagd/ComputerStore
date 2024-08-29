package com.app.backend.controlers;

import com.app.backend.Enums.StatusType;
import com.app.backend.authenticate.TokenUtill.JwtTokenUtill;
import com.app.backend.entities.CartItem;
import com.app.backend.entities.Order;
import com.app.backend.entities.OrderItem;
import com.app.backend.entities.User;
import com.app.backend.service.interfaces.*;
import com.app.backend.utils.converters.CartItemToOrderItemConverter;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    private IOrderService orderService;
    private IOrderItemService orderItemService;
    private IUserService userService;
    private ICartItemService cartItemService;
    private ICartService cartService;
    @Autowired
    public OrderController(IOrderService orderService, IUserService userService, ICartService cartService, ICartItemService cartItemService, IOrderItemService orderItemService) {
        this.orderService = orderService;
        this.userService = userService;
        this.cartService = cartService;
        this.cartItemService = cartItemService;
        this.orderItemService = orderItemService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> makeOrder(@RequestHeader("Authorization") String token) {
        try {
            Claims claims = JwtTokenUtill.verifyToken(token);

            User user =  userService.getUserByEmail(claims.get("email", String.class));

            // Getting/Creating order
            Order order = orderService.getOrderByUser(user);
            if(order == null) {
                Order newOrder = new Order("Order", StatusType.NOT_PAID, user);
                orderService.saveOrder(newOrder);
            }

            order = orderService.getOrderByUser(user);
            if(order == null) {
                return ResponseEntity.badRequest().body("Not ok");
            }

            // Get all CartItems
            List<CartItem> cartItemList = cartItemService.getAllCartItems(cartService.getCartByUserEmail(claims.get("email", String.class)));

            // CartItem to OrderItem and delete cartItems after that.
            List<OrderItem> orderItemList =  CartItemToOrderItemConverter.ConvertListToOrderItem(cartItemList, order);
            cartItemService.deleteAllByCart(cartService.getCartByUserEmail(claims.get("email", String.class)));

            // Add OrderItem list to database
            orderItemService.addOrderItems(orderItemList);

            // TODO: Add something to change a amount of product in database
            //      If someone bought then, the amount should be less

            return ResponseEntity.ok("Ok");
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body("Not ok");
        }
    }

    // Logic these 2 methods should be more complicated and based admin token and more complicated verification.

    @PostMapping("/update/paid")
    public ResponseEntity<?> updateOrderToPaid(@RequestHeader("Authorization") String token) {
        try {
            Claims claims = JwtTokenUtill.verifyToken(token);

            orderService.changeOrderStatus(userService.getUserByEmail(claims.get("email", String.class)), StatusType.READY);

            return ResponseEntity.ok("Ok");
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body("Not ok");
        }
    }

    @PostMapping("/update/delivered")
    public ResponseEntity<?> updateOrderToDelivered(@RequestHeader("Authorization") String token) {
        try {
            Claims claims = JwtTokenUtill.verifyToken(token);

            orderService.changeOrderStatus(userService.getUserByEmail(claims.get("email", String.class)), StatusType.DELIVERED);

            return ResponseEntity.ok("Ok");
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body("Not ok");
        }
    }
}
