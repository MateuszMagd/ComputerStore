package com.app.backend.controlers;

import com.app.backend.authenticate.TokenUtill.AuthRequest;
import com.app.backend.authenticate.TokenUtill.JwtTokenUtill;
import com.app.backend.dto.UserInfoDto;
import com.app.backend.dto.UserNewDto;
import com.app.backend.entities.User;
import com.app.backend.exceptions.UserExistException;
import com.app.backend.service.interfaces.ICartService;
import com.app.backend.service.interfaces.IUserService;
import com.app.backend.utils.PasswordHasher;
import com.app.backend.utils.converters.UserToDTOConverter;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.Instant;
import java.util.List;


/*
 *   VALIDATION:
 *   VALIDATION SHOULD BE MORE PRECISE AND SHOULD PREVENT FOR EXAMPLE SQL INJECTION
 *   FOR THIS PROJECT I JUST DID SIMPLE VALIDATION BECAUSE IT'S COLLAGE PROJECT ->
 *   THIS IS NOT FOR PRODUCTION
 * */


@RestController
@RequestMapping("/api/user")
public class UserController {
    private IUserService userService;
    private ICartService cartService;

    @Autowired
    public UserController(IUserService userService, ICartService cartService) {
        this.userService = userService;
        this.cartService = cartService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody AuthRequest authRequest) {
        try {
            userService.isUserExist(authRequest.getEmail());

            String salt = PasswordHasher.generateSalt();
            User user = new User(authRequest.getEmail(), PasswordHasher.hashPasswordWithSalt(authRequest.getPassword(), salt), salt, "Joe", "Doe",null, null, null, null, false, new Date(Instant.now().toEpochMilli()));

            userService.saveUser(user);
            cartService.createNewCartForUser(user);

            return ResponseEntity.ok("Ok");
        } catch(UserExistException e) {
            return ResponseEntity.ok(e.getMessage());
        }
        catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Something went wrong . . .");
        }
    }
    @PostMapping("/save")
    public ResponseEntity<?> saveNewUser(@RequestHeader("Authorization") String token,
                                         @RequestBody UserNewDto userNewDto) {
        try {
            Claims claims = JwtTokenUtill.verifyToken(token);
            User user = userService.getUserByEmail(claims.get("email", String.class));
            if(!user.getAdmin()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }

            userService.isUserExist(userNewDto.getEmail());

            String salt = PasswordHasher.generateSalt();
            User newUser = new User(userNewDto.getEmail(), PasswordHasher.hashPasswordWithSalt(userNewDto.getPassword(), salt), salt, userNewDto.getName(), userNewDto.getLastName(), userNewDto.getPhoneNumber(), userNewDto.getAddress(), userNewDto.getCity(), userNewDto.getCountry(),  false, new Date(Instant.now().toEpochMilli()));

            userService.saveUser(newUser);
            cartService.createNewCartForUser(newUser);

            return ResponseEntity.ok("Ok");
        } catch(UserExistException e) {
            return ResponseEntity.ok(e.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Something went wrong . . .");
        }
    }


    @GetMapping("/get/user/info")
    public ResponseEntity<?> getUserInfo(@RequestHeader("Authorization") String token) {
        try {
            Claims claims = JwtTokenUtill.verifyToken(token);

            return ResponseEntity.ok(UserToDTOConverter.ConvertToDTO(userService.getUserByEmail(claims.get("email", String.class))));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Couldn't find/authorize user!");
        }
    }

    @PostMapping("/post/user/update/personal")
    public ResponseEntity<?> updateUserPersonalInfo(@RequestHeader("Authorization") String token,
                                                    @RequestParam("FirstName") String firstName,
                                                    @RequestParam("LastName") String lastName,
                                                    @RequestParam("Email") String email,
                                                    @RequestParam("PhoneNumber") String phoneNumber) {
        try {
            Claims claims = JwtTokenUtill.verifyToken(token);
            User user = userService.getUserByEmail(claims.get("email", String.class));
            user.setFirstName(firstName);
            user.setLastName(lastName);
            // Check if contains only numbers and lenght is 9 (phone number without +42 or else at first)
            if (phoneNumber.matches("[0-9]+") && phoneNumber.length() == 9) {
                user.setPhoneNumber(phoneNumber);
            }
            // This validation is very simple -> have to contain @ and have at least 3 letter
            if(email.contains("@") && email.length() > 3) {
                user.setEmail(email);
            }
            userService.updateUser(user);
            return ResponseEntity.ok("Ok");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Couldn't update personal info");
        }
    }
    @PostMapping("/post/user/update/address")
    public ResponseEntity<?> updateUserAddressInfo(@RequestHeader("Authorization") String token,
                                                   @RequestParam("Address") String address,
                                                   @RequestParam("Country") String country,
                                                   @RequestParam("City") String city) {
        try {
            Claims claims = JwtTokenUtill.verifyToken(token);
            User user = userService.getUserByEmail(claims.get("email", String.class));
            // There could be something like looking if city exist or country exist, but I will just make it simple
            user.setAddress(address);
            user.setCountry(country);
            user.setCity(city);
            userService.updateUser(user);
            return ResponseEntity.ok("Ok");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Couldn't update personal info");
        }
    }

    @GetMapping("/get/user/isAdmin")
    public ResponseEntity<Boolean> isUserAdmin(@RequestHeader("Authorization") String token) {
        try {
            Claims claims = JwtTokenUtill.verifyToken(token);
            User user = userService.getUserByEmail(claims.get("email", String.class));
            return ResponseEntity.ok(user.getAdmin());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
        }
    }

    @GetMapping("/get/users/all")
    public ResponseEntity<List<UserInfoDto>> getAllUsers(@RequestHeader("Authorization") String token) {
        try {
            Claims claims = JwtTokenUtill.verifyToken(token);
            User user = userService.getUserByEmail(claims.get("email", String.class));
            if(!user.getAdmin()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
            List<User> allUsers = userService.getAllUsers();
            List<UserInfoDto> allUsersDTO = UserToDTOConverter.ConvertListToDTO(allUsers);
            return ResponseEntity.ok(allUsersDTO);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }


}
