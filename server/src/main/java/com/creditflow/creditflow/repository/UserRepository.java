package com.creditflow.creditflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.creditflow.creditflow.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}