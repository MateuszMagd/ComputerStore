package com.app.backend.service.interfaces;

import com.app.backend.Enums.StatusType;
import com.app.backend.entities.Order;
import com.app.backend.entities.User;

public interface IOrderService {
    Order getOrderByUser(User user);
    void saveOrder(Order order);

    void changeOrderStatus(User user, StatusType newStatus);
}
