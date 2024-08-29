package com.app.backend.service;

import com.app.backend.entities.User;
import com.app.backend.exceptions.UserExistException;
import com.app.backend.repository.UserRepository;
import com.app.backend.service.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements IUserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean isUserExist(String email) throws UserExistException {
        int numberOfUsers = userRepository.countUsersByEmail(email);
        if(numberOfUsers != 0) {
            throw new UserExistException("This email is already in use");
        }
        return false;
    }

    @Override
    public void saveUser(User user) {
        userRepository.save(user);
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.getUserByEmail(email);
    }

    @Override
    public void updateUser(User user) {
        userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
