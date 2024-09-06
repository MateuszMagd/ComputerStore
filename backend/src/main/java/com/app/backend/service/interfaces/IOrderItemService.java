package com.app.backend.service.interfaces;

import com.app.backend.Enums.StatusType;
import com.app.backend.entities.OrderItem;
import com.app.backend.entities.Product;
import com.app.backend.entities.User;

import java.util.List;

public interface IOrderItemService {
    void addOrderItems(List<OrderItem> orderItemList);
    void deleteOrderItem(OrderItem item);

    List<OrderItem> findAllOrderItemByProduct(Product product);
}
