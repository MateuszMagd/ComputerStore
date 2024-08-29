package com.app.backend.entities;

import com.app.backend.Enums.StatusType;
import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(unique = true)
    private String sessionId;


    @Nonnull
    private String name;
    @Nonnull
    private StatusType status;
    @ManyToOne
    private User userId;
    public Order() {
        this.sessionId = UUID.randomUUID().toString();
    }

    public Order(@Nonnull String name, @Nonnull StatusType status, User userId) {
        this.name = name;
        this.status = status;
        this.userId = userId;
        this.sessionId = UUID.randomUUID().toString();
    }

    @Nonnull
    public String getName() {
        return name;
    }

    public void setName(@Nonnull String name) {
        this.name = name;
    }

    @Nonnull
    public StatusType getStatus() {
        return status;
    }

    public void setStatus(@Nonnull StatusType status) {
        this.status = status;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }
}
