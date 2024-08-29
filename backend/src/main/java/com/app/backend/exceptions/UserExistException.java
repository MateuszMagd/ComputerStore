package com.app.backend.exceptions;

public class UserExistException extends Exception {
    public UserExistException() {

    }

    public UserExistException(String msg) {
        super(msg);
    }

}
