package com.app.backend.authenticate;

import com.app.backend.authenticate.TokenUtill.JwtTokenUtill;
import com.app.backend.entities.User;
import com.app.backend.repository.UserRepository;
import com.app.backend.utils.PasswordHasher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;

    @Autowired
    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String authenticate(String email, String password) throws Exception {
        User user = userRepository.getUserByEmail(email);


        if(user != null && user.getEmail().equals(email) && user.getPasswordHash().equals(PasswordHasher.hashPasswordWithSalt(password, user.getSalt()))){
            return JwtTokenUtill.generateToken(email, user.getSessionId());
        }
        else {
            throw new Exception("Invalid email or password");
        }
    }
}
