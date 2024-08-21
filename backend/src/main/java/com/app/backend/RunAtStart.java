package com.app.backend;

import com.app.backend.Enums.ProductType;
import com.app.backend.Enums.StatusType;
import com.app.backend.entities.*;
import com.app.backend.repository.*;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Date;

@Component
public class RunAtStart {
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    @Autowired
    public RunAtStart(UserRepository userRepository, ProductRepository productRepository, OrderRepository orderRepository, OrderItemRepository orderItemRepository, CartRepository cartRepository, CartItemRepository cartItemRepository) {
        super();
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
    }

    public byte[] loadPhoto(String fileName) throws IOException {
        ClassPathResource resource = new ClassPathResource("photo/" + fileName);
        Path path = Paths.get(resource.getURI());
        return Files.readAllBytes(path);
    }

    @Bean
    public CommandLineRunner runner() {
        return args -> {
            // ********** Users **********
            User user1 = new User("mateuszmag7@gmail.com", "test", "Mateusz", "Magdzinski", null, null, null, null, true, Date.valueOf("2024-08-15"));
            User user2 = new User("imagination@gmail.com", "test2", "Anna", "Nowak", "111222333", "someplace", "somecity", "somecoutry", false, Date.valueOf("2024-08-19"));
            User user3 = new User("imaginationlol@gmail.com", "test3", "Wojtek", "Kowalski", "333222111", "someplace", "somecity", "somecoutry", false, Date.valueOf("2024-08-18"));

            userRepository.save(user1);
            userRepository.save(user2);
            userRepository.save(user3);
            // ********** Products **********
            byte[] photo1 = loadPhoto("Karta-graficzna-GIGABYTE-GeForce-RTX-4070-Windforce-OC-12GB-front-skos-box.jpg");
            Product product1 = new Product("Grapic Card", "Description of example product", "GDDR 6X/12288/192/PCI Express 4.0 x16/Aktywne/4", photo1, ProductType.GPU, 1099.99f, 10, true);
            productRepository.save(product1);

            byte[] photo2 = loadPhoto("Plyta-glowna-MSI-B760-01-front.jpg");
            Product product2 = new Product("Motherboard", "Description of example product", "ATX/Socket 1700/Intel B760/256/DDR 5/4 x DIMM", photo2, ProductType.Motherboard, 599.99f, 5, true);
            productRepository.save(product2);

            byte[] photo3 = loadPhoto("Procesor-AMD-Ryzen-5-9600X-front.jpg");
            Product product3 = new Product("Processor Unit", "Description of example product", "AMD Ryzen 5/5/12/3,9/38/Socket AM5", photo3, ProductType.CPU, 699.99f, 2, true);
            productRepository.save(product3);

            // ********** Order **********
            Order order1 = new Order("Test order", StatusType.NOT_PAID, user2);
            Order order2 = new Order("Test order2", StatusType.DELIVERED, user2);

            Order order3 = new Order("Test order3", StatusType.READY, user1);

            orderRepository.save(order1);
            orderRepository.save(order2);
            orderRepository.save(order3);
            // ********** Cart **********
            Cart cart = new Cart(user2);
            cartRepository.save(cart);
            // ********** Order Item **********
            OrderItem orderItem = new OrderItem(product1, order1, 1);
            orderItemRepository.save(orderItem);

            OrderItem orderItem1 = new OrderItem(product1, order2, 2);
            OrderItem orderItem2 = new OrderItem(product2, order2, 1);
            orderItemRepository.save(orderItem1);
            orderItemRepository.save(orderItem2);

            OrderItem orderItem3 = new OrderItem(product3, order3, 1);
            OrderItem orderItem4 = new OrderItem(product2, order3, 1);
            OrderItem orderItem5 = new OrderItem(product1, order3, 1);

            orderItemRepository.save(orderItem3);
            orderItemRepository.save(orderItem4);
            orderItemRepository.save(orderItem5);
            // ********** Cart Item **********
            CartItem cartItem = new CartItem(product1, cart, 1);
            CartItem cartItem1 = new CartItem(product2, cart, 1);
            CartItem cartItem2 = new CartItem(product3, cart, 1);

            cartItemRepository.save(cartItem);
            cartItemRepository.save(cartItem1);
            cartItemRepository.save(cartItem2);
        };
    }
}
