package com.app.backend.dto;

public class CartItemDto {
    private String sessionId;
    private String name;
    private String photo;
    private Float price;
    private int quantity;

    public CartItemDto(String sessionId, String name, String photo, Float price, int quantity) {
        this.sessionId = sessionId;
        this.name = name;
        this.photo = photo;
        this.price = price;
        this.quantity = quantity;
    }

    public CartItemDto() {
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

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
