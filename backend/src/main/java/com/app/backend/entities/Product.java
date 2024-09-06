package com.app.backend.entities;

import com.app.backend.Enums.ProductType;
import jakarta.annotation.Nonnull;
import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(unique = true)
    private String sessionId;
    @Nonnull
    private String name;
    @Nonnull
    private String description;
    @Nonnull
    private String specs;
    @Nonnull
    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(length = 16777215)
    private byte[] photo;
    @Nonnull
    private ProductType type;
    @Nonnull
    private Float price;
    private int amount;
    @Nonnull
    private Boolean isAvailable;

    public Product() {
        this.sessionId = UUID.randomUUID().toString();
    }

    public Product(@Nonnull String name, @Nonnull String description, @Nonnull String specs, @Nonnull byte[] photo, @Nonnull ProductType type, @Nonnull Float price, int amount, @Nonnull Boolean isAvailable) {
        this.name = name;
        this.description = description;
        this.specs = specs;
        this.photo = photo;
        this.type = type;
        this.price = price;
        this.amount = amount;
        this.isAvailable = isAvailable;
        this.sessionId = UUID.randomUUID().toString();
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    @Nonnull
    public String getName() {
        return name;
    }

    public void setName(@Nonnull String name) {
        this.name = name;
    }

    @Nonnull
    public String getDescription() {
        return description;
    }

    public void setDescription(@Nonnull String description) {
        this.description = description;
    }

    @Nonnull
    public String getSpecs() {
        return specs;
    }

    public void setSpecs(@Nonnull String specs) {
        this.specs = specs;
    }

    @Nonnull
    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(@Nonnull byte[] photo) {
        this.photo = photo;
    }

    @Nonnull
    public ProductType getType() {
        return type;
    }

    public void setType(@Nonnull ProductType type) {
        this.type = type;
    }

    @Nonnull
    public Float getPrice() {
        return price;
    }

    public void setPrice(@Nonnull Float price) {
        this.price = price;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    @Nonnull
    public Boolean getAvailable() {
        return isAvailable;
    }

    public void setAvailable(@Nonnull Boolean available) {
        isAvailable = available;
    }
}


