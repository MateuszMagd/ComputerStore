package com.app.backend.controlers;

import com.app.backend.Enums.ProductType;
import com.app.backend.authenticate.TokenUtill.JwtTokenUtill;
import com.app.backend.dto.ProductDto;
import com.app.backend.dto.UserNewDto;
import com.app.backend.entities.*;
import com.app.backend.service.interfaces.ICartItemService;
import com.app.backend.service.interfaces.IOrderItemService;
import com.app.backend.service.interfaces.IProductService;
import com.app.backend.service.interfaces.IUserService;
import com.app.backend.utils.converters.ProductToDTOConverter;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;

/*
 *   VALIDATION:
 *   VALIDATION SHOULD BE MORE PRECISE AND SHOULD PREVENT FOR EXAMPLE SQL INJECTION
 *   FOR THIS PROJECT I JUST DID SIMPLE VALIDATION BECAUSE IT'S COLLAGE PROJECT ->
 *   THIS IS NOT FOR PRODUCTION
 * */


@RestController
@RequestMapping("/product")
public class ProductController {
    private final IProductService productService;
    private final IUserService userService;

    private final ICartItemService cartItemService;
    private final IOrderItemService orderItemService;

    @Autowired
    public ProductController(IProductService productService, IUserService userService, ICartItemService cartItemService, IOrderItemService orderItemService) {
        this.productService = productService;
        this.userService = userService;
        this.cartItemService = cartItemService;
        this.orderItemService = orderItemService;
    }

    @GetMapping("/get/fiveproducts")
    public ResponseEntity<List<ProductDto>> getFiveItems() {
        List<ProductDto> products;
        try {
            products = ProductToDTOConverter.ConvertListToDTO(productService.getFiveProducts());
        } catch (IllegalArgumentException e) {
            System.err.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(products);
    }

    @GetMapping("/get/{sessionId}")
    public ResponseEntity<ProductDto> getProduct(@PathVariable String sessionId){
        ProductDto productDto;
        try{
            productDto =  ProductToDTOConverter.ConvertToDTO(productService.getProductBySessionId(sessionId));
        } catch (IllegalArgumentException e) {
            System.err.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(productDto);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ProductDto>> getAllProducts(@RequestHeader("Authorization") String token) {

        try {
            Claims claims = JwtTokenUtill.verifyToken(token);
            User user = userService.getUserByEmail(claims.get("email", String.class));
            if (!user.getAdmin()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
            List<Product> products = productService.getAllProducts();
            List<ProductDto> productDtos = ProductToDTOConverter.ConvertListToDTO(products);

            return  ResponseEntity.ok(productDtos);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

    }

    @PostMapping("/save")
    public ResponseEntity<?> saveNewProduct(@RequestHeader("Authorization") String token,
                                            @RequestBody ProductDto productDto) {
        try {
            Claims claims = JwtTokenUtill.verifyToken(token);

            User user = userService.getUserByEmail(claims.get("email", String.class));
            if(!user.getAdmin()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }


            byte[] photoBytes = Base64.getDecoder().decode(productDto.getPhoto());
            Product product = new Product(
                    productDto.getName(),
                    "",
                    productDto.getSpecs(),
                    photoBytes,
                    productDto.getType(),
                    productDto.getPrice(),
                    productDto.getAmount(),
                    true
            );
            productService.save(product);

            return ResponseEntity.ok("Ok");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Something went wrong . . .");
        }
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateProduct(@RequestHeader("Authorization") String token,
                                           @RequestBody ProductDto productDto) {
        try {
            Claims claims = JwtTokenUtill.verifyToken(token);

            User user = userService.getUserByEmail(claims.get("email", String.class));
            if(!user.getAdmin()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }

            Product product = productService.getProductBySessionId(productDto.getSessionId());
            if(product == null) {
                return ResponseEntity.ok("Couldn't find item");
            }

            product.setName(productDto.getName());
            product.setSpecs(productDto.getSpecs());
            product.setPrice(productDto.getPrice());
            product.setAmount(productDto.getAmount());
            product.setType(product.getType());

            productService.save(product);

            return ResponseEntity.ok("Ok");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Something went wrong . . .");
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<?> deleteProduct(@RequestHeader("Authorization") String token,
                                           @RequestBody String sessionId) {
        try {
            Claims claims = JwtTokenUtill.verifyToken(token);
            User user = userService.getUserByEmail(claims.get("email", String.class));
            if(!user.getAdmin()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }

            Product product = productService.getProductBySessionId(sessionId);
            if(product == null) {
                return ResponseEntity.badRequest().body("Couldn't find item");
            }

            List<OrderItem> orderItemList = orderItemService.findAllOrderItemByProduct(product);
            for(OrderItem orderItem: orderItemList) {
                orderItemService.deleteOrderItem(orderItem);
            }

            List<CartItem> cartItemsList = cartItemService.getAllCartItemsByProduct(product);
            for(CartItem cartItem: cartItemsList) {
                cartItemService.delete(cartItem);
            }
            productService.delete(product);

            return ResponseEntity.ok("Ok");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Something went wrong . . .");
        }
    }

    @GetMapping("/all/desc/{productType}")
    public ResponseEntity<?> getAllProductAsc(@PathVariable ProductType productType) {
        try{
            List<Product> productsList = productService.getProductByProductTypeDesc(productType);
            List<ProductDto> productDtoList = ProductToDTOConverter.ConvertListToDTO(productsList);

            return ResponseEntity.ok(productDtoList);
         } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/all/asc/{productType}")
    public ResponseEntity<?> getAllProductDesc(@PathVariable ProductType productType) {
        try{
            List<Product> productsList = productService.getProductByProductTypeAsc(productType);
            List<ProductDto> productDtoList = ProductToDTOConverter.ConvertListToDTO(productsList);

            return ResponseEntity.ok(productDtoList);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }
}
