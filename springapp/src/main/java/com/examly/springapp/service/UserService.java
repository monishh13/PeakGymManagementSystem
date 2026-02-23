package com.examly.springapp.service;

import java.time.LocalDate;

import java.util.List;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import com.examly.springapp.model.User;

import com.examly.springapp.model.enums.Role;

import com.examly.springapp.repository.UserRepository;

@Service

public class UserService {

    @Autowired

    private UserRepository userRepository;

    // Inject PasswordEncoder (BCrypt bean should be defined in SecurityConfig)

    @Autowired

    private PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {

        return userRepository.findAll();

    }

    /**
     * 
     * * Create (register) a new user.
     * 
     * * - checks duplicates
     * 
     * - hashes password
     * 
     * - sets defaults (joinDate, role)
     * 
     * * - clears password from returned object to avoid leaking it in responses
     * 
     */

    @Transactional

    public User createUser(User user) {

        // duplicate checks

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {

            throw new IllegalArgumentException("Email already in use");

        }

        if (userRepository.findByUsername(user.getUsername()).isPresent()) {

            throw new IllegalArgumentException("Username already in use");

        }
        System.out.println(user.getPassword());
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // defaults

        

        User saved = userRepository.save(user);


        // saved.setPassword(null);

        return saved;

    }

    public Optional<User> getUserById(Long id) {

        return userRepository.findById(id);

    }

    public Optional<User> findByUsername(String username) {

        return userRepository.findByUsername(username);

    }

    public Optional<User> findByEmail(String email) {

        return userRepository.findByEmail(email);

    }

}