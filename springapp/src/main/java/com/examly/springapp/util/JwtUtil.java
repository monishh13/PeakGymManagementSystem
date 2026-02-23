package com.examly.springapp.util;



import io.jsonwebtoken.Jwts;

import io.jsonwebtoken.SignatureAlgorithm;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.stereotype.Component;



import java.util.Date;



@Component

public class JwtUtil {



    @Value("${security.jwt.secret}")

    private String jwtSecret;



    @Value("${jwt.expiration:86400000}") // 1 day default

    private long jwtExpiration;



    public String generateToken(String username, String role) {

        return Jwts.builder()

        .setSubject(username)

        .claim("role", role)

        .setIssuedAt(new Date())

        .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))

        .signWith(SignatureAlgorithm.HS256, jwtSecret.getBytes())

        .compact();

    }

    }