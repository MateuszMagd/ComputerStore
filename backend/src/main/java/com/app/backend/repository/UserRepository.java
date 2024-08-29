package com.app.backend.repository;

import com.app.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {


    User getUserByEmail(String email);
    User getUserByEmailAndPasswordHash(String email, String password);
    int countUsersByEmail(String email);
}
