package com.app.backend.controlers;

import com.app.backend.authenticate.TokenUtill.JwtTokenUtill;
import com.app.backend.dto.ProductDto;
import com.app.backend.dto.UserNewDto;
import com.app.backend.entities.Product;
import com.app.backend.entities.User;
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

    @Autowired
    public ProductController(IProductService productService, IUserService userService) {
        this.productService = productService;
        this.userService = userService;
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
}
