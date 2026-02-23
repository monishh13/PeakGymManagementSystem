package com.examly.springapp.controller;



import com.examly.springapp.model.User;

import com.examly.springapp.service.UserService;

import com.examly.springapp.util.JwtUtil;

import lombok.Data;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.Authentication;

import org.springframework.security.core.AuthenticationException;

import org.springframework.web.bind.annotation.*;



import jakarta.validation.Valid;



@RestController

@RequestMapping("/auth")

public class AuthController {



    @Autowired

    private AuthenticationManager authenticationManager;



    @Autowired

    private JwtUtil jwtUtil;



    @Autowired

    private UserService userService;



    @PostMapping("/login")

    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest loginRequest) {

        try {

            // Authenticate using email (our UserDetailsService uses email as username)

            Authentication authentication = authenticationManager.authenticate(

                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())

            );



            // fetch user entity

            User user = userService.findByEmail(loginRequest.getEmail())

            .orElseThrow(() -> new RuntimeException("User not found"));



            // Use email as token subject for consistency (or change both to username)

            String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());



            return ResponseEntity.ok(new LoginResponse(token, user.getUsername(), user.getRole().name()));



            } catch (AuthenticationException ex) {

                // Bad credentials or disabled/locked

                return ResponseEntity.status(401).body("Invalid email or password");

                }

                }



                @Data

                private static class LoginRequest {

                    private String email;

                    private String password;

                    }



                    @Data

                    private static class LoginResponse {

                        private final String token;

                        private final String username;

                        private final String role;

                    }

                    }