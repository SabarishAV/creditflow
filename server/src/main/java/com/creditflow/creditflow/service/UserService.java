package com.creditflow.creditflow.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.creditflow.creditflow.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public boolean doesUserExists(Long id){
        return userRepository.existsById(id);
    }
    
}
