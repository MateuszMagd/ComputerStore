package com.app.backend.entities;

import com.app.backend.Enums.ProductType;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    private Long id;
    private Long sessionId;
    private String name;
    private String description;
    private String specs;
    @Lob
    private byte[] photo;
    private ProductType type;
    private Float price;
    private int amount;
    private Boolean isAvailable;


}


