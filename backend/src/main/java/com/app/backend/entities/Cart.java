package com.app.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(unique = true)
    private String sessionId;
    @ManyToOne
    private User userId;

    public Cart() {
        this.sessionId = UUID.randomUUID().toString();
    }

    public Cart(User userId) {
        this.sessionId = UUID.randomUUID().toString();
        this.userId = userId;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }
}
