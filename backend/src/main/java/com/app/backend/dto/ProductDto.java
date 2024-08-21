package com.app.backend.dto;

import com.app.backend.Enums.ProductType;
import jakarta.annotation.Nonnull;
import jakarta.persistence.*;

public class ProductDto {
    private String sessionId;
    private String name;
    private String specs;
    private String photo;
    private ProductType type;
    private Float price;
    private int amount;


    public ProductDto() {
    }

    public ProductDto(String sessionId, String name, String description, String specs, String photo, ProductType type, Float price, int amount, Boolean isAvailable) {
        this.sessionId = sessionId;
        this.name = name;
        this.specs = specs;
        this.photo = photo;
        this.type = type;
        this.price = price;
        this.amount = amount;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecs() {
        return specs;
    }

    public void setSpecs(String specs) {
        this.specs = specs;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public ProductType getType() {
        return type;
    }

    public void setType(ProductType type) {
        this.type = type;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }
}
