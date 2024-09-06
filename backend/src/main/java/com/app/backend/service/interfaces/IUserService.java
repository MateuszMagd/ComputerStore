package com.app.backend.service.interfaces;

import com.app.backend.entities.User;
import com.app.backend.exceptions.UserExistException;

import java.util.List;

public interface IUserService {

    boolean isUserExist(String email) throws UserExistException;
    void saveUser(User user);

    User getUserByEmail(String email);

    void updateUser(User user);

    List<User> getAllUsers();

    void delete(User user);
}
