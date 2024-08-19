package com.app.backend.entities;

import com.app.backend.Enums.StatusType;

public class Order {
    private Long id;
    private Long sessionId;
    private String name;
    private StatusType status;
    private User userId;

}
