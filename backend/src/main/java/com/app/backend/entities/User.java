package com.app.backend.entities;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;

import java.sql.Date;
import java.util.UUID;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(unique = true)
    private String sessionId;

    @Nonnull
    private String email;
    @Nonnull
    private String passwordHash;
    @Nonnull
    private String firstName;
    @Nonnull
    private String lastName;
    private String phoneNumber;
    private String address;
    private String city;
    private String country;
    @Nonnull
    private Boolean isAdmin;
    @Nonnull
    private Date lastLogin;

    public User() {
        this.sessionId = UUID.randomUUID().toString();
    }

    public User(@Nonnull String email, @Nonnull String passwordHash, @Nonnull String firstName, @Nonnull String lastName,
                String phoneNumber, String address, String city, String country, @Nonnull Boolean isAdmin, @Nonnull Date date) {
        this.email = email;
        this.passwordHash = passwordHash;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.city = city;
        this.country = country;
        this.isAdmin = isAdmin;
        this.lastLogin = date;
        this.sessionId = UUID.randomUUID().toString();
    }

    @Nonnull
    public String getEmail() {
        return email;
    }

    public void setEmail(@Nonnull String email) {
        this.email = email;
    }

    @Nonnull
    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(@Nonnull String passwordHash) {
        this.passwordHash = passwordHash;
    }

    @Nonnull
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(@Nonnull String firstName) {
        this.firstName = firstName;
    }

    @Nonnull
    public String getLastName() {
        return lastName;
    }

    public void setLastName(@Nonnull String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    @Nonnull
    public Boolean getAdmin() {
        return isAdmin;
    }

    public void setAdmin(@Nonnull Boolean admin) {
        isAdmin = admin;
    }

    @Nonnull
    public Date getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(@Nonnull Date lastLogin) {
        this.lastLogin = lastLogin;
    }
}
