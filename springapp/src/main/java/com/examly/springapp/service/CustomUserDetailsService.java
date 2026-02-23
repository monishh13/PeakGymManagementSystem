package com.examly.springapp.service;



import java.util.Collection;

import java.util.Collections;



import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.GrantedAuthority;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.stereotype.Service;



import com.examly.springapp.model.User;

import com.examly.springapp.repository.UserRepository;



@Service

public class CustomUserDetailsService implements UserDetailsService {



    @Autowired

    private UserRepository userRepository;



    // We treat email as the username for authentication

    @Override

    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = userRepository.findByEmail(email)

        .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));



        Collection<GrantedAuthority> authorities = Collections.singletonList(

        new SimpleGrantedAuthority("ROLE_" + user.getRole().name())

        );



        return org.springframework.security.core.userdetails.User

        .withUsername(user.getEmail())

        .password(user.getPassword()) // hashed password

        .authorities(authorities)

        .accountExpired(false)

        .accountLocked(false)

        .credentialsExpired(false)

        .disabled(false)

        .build();

    }

}