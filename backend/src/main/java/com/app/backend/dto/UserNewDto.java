package com.app.backend.dto;

public class UserNewDto extends UserInfoDto{
    private String password;

    public UserNewDto() {

    }
    public UserNewDto(String name, String lastName, String email, String phoneNumber, String address, String city, String country, String password) {
        super(name, lastName, email, phoneNumber, address, city, country);
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
