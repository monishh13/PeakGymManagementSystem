package com.examly.springapp.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.User;
import com.examly.springapp.service.UserService;
import com.examly.springapp.dto.UserResponseDTO;
import com.examly.springapp.dto.Mappers;
import java.util.stream.Collectors;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public Page<UserResponseDTO> getAllUsers(Pageable pageable){
        return userService.getAllUsers(pageable)
                .map(Mappers::mapToUserResponseDTO);
    }
    
    // Registration moved to AuthController. Keeping for backward compatibility if needed, but commented.
    /*
    @PostMapping
    public User saveUser(@Valid @org.springframework.web.bind.annotation.RequestBody User user){
        return userService.createUser(user);
    }
    */
    
    @GetMapping("/{id}")
    public Optional<UserResponseDTO> getUserById(@PathVariable Long id){
        return userService.getUserById(id).map(Mappers::mapToUserResponseDTO);
    }
    
}
