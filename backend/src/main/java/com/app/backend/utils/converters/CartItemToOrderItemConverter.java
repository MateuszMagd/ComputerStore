package com.app.backend.utils.converters;

import com.app.backend.entities.CartItem;
import com.app.backend.entities.Order;
import com.app.backend.entities.OrderItem;

import java.util.List;
import java.util.stream.Collectors;

public class CartItemToOrderItemConverter {
    public static OrderItem ConvertToOrder(CartItem cartItem, Order order) {
        OrderItem orderItem = new OrderItem();

        orderItem.setQuantity(cartItem.getQuantity());
        orderItem.setProductId(cartItem.getProductId());
        orderItem.setOrderId(order);
        return orderItem;
    }

    public static List<OrderItem> ConvertListToOrderItem(List<CartItem> cartItems, Order order) {
        return cartItems.stream()
                .map(cartItem -> ConvertToOrder(cartItem, order))
                .collect(Collectors.toList());
    }
}
