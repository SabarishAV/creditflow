package com.creditflow.creditflow.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.creditflow.creditflow.models.User;
import com.creditflow.creditflow.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register/")
    public ResponseEntity<String> registerUser( @RequestBody User user){
        try {
            if(user.getEmail()==null || user.getUsername()==null || user.getPassword()==null){
                throw new IllegalArgumentException("All fields are mandatory");
            }
            userService.registerUser(user);
            return new ResponseEntity<>("User Registered Successfully!!", HttpStatus.CREATED);
        } catch(IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        catch(Exception e) {
            return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login/")
    public ResponseEntity<String> login(@RequestBody User user){
        try {
            if(user.getUsername()==null || user.getPassword()==null){
                return new ResponseEntity<>("All fields are mandatory", HttpStatus.NO_CONTENT);
            }

            String jwtToken = userService.verify(user);
            return new ResponseEntity<>(jwtToken, HttpStatus.OK);
            
        } catch (Exception e) {
            return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    }