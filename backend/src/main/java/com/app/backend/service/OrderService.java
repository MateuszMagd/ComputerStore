package com.app.backend.service;

import com.app.backend.Enums.StatusType;
import com.app.backend.entities.Order;
import com.app.backend.entities.User;
import com.app.backend.repository.OrderRepository;
import com.app.backend.service.interfaces.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService implements IOrderService {
    private OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public Order getOrderByUser(User user) {
        return orderRepository.findByUserIdAndStatus(user, StatusType.NOT_PAID);
    }

    @Override
    public void saveOrder(Order order) {
        orderRepository.save(order);
    }

    @Override
    public void changeOrderStatus(User user, StatusType newStatus) {
        int updatedRows = 0;
        if(newStatus == StatusType.READY)
            updatedRows = orderRepository.updateStatusByUserIdAndStatus(user, StatusType.NOT_PAID , newStatus);
        if(newStatus == StatusType.DELIVERED)
            updatedRows = orderRepository.updateStatusByUserIdAndStatus(user, StatusType.READY , newStatus);
        if (updatedRows == 0) {
            throw new RuntimeException("No orders were updated");
        }
    }
}
