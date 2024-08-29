package com.app.backend.service;

import com.app.backend.Enums.StatusType;
import com.app.backend.entities.OrderItem;
import com.app.backend.entities.User;
import com.app.backend.repository.OrderItemRepository;
import com.app.backend.service.interfaces.IOrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderItemService implements IOrderItemService {
    private OrderItemRepository orderItemRepository;

    @Autowired
    public OrderItemService(OrderItemRepository orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }

    @Override
    public void addOrderItems(List<OrderItem> orderItemList) {
        for(OrderItem orderItem : orderItemList) {
            orderItemRepository.save(orderItem);
        }
    }


}
