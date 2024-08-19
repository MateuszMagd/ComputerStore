package com.app.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.sql.Date;

@Entity
public class User {
    @Id
    private long id;
    private long sessionId;
    private String email;
    private String passwordHash;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String address;
    private String city;
    private String country;
    private Boolean isAdmin;
    private Date lastLogin;
}
