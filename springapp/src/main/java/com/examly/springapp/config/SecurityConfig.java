package com.examly.springapp.config;



import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.context.annotation.Bean;

import org.springframework.context.annotation.Configuration;

import org.springframework.context.annotation.Profile;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.*;

import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;

import org.springframework.security.web.SecurityFilterChain;


@Configuration

//@Profile("security")

@EnableMethodSecurity

public class SecurityConfig {



    @Value("${security.jwt.secret:mySecretKey123456789012345678901234567890}")

    private String jwtSecret;



    @Bean

    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http

        .csrf().disable()

        .authorizeHttpRequests(auth -> auth
        // Swagger

        .requestMatchers(

            "/swagger-ui.html", "/swagger-ui/**",

            "/v3/api-docs/**", "/webjars/**", "/swagger-resources/**"

            ).permitAll()



            // Public endpoints
            .requestMatchers("/auth/**").permitAll()

            // Secured v2
            .requestMatchers("/api/v2/admin/**").hasRole("ADMIN")
            .requestMatchers("/api/v2/trainer/**").hasRole("TRAINER")
            .requestMatchers("/api/v2/exercises/**").hasAnyRole("TRAINER","ADMIN")

            // All other API endpoints require authentication
            .requestMatchers("/api/**").authenticated()

            .anyRequest().denyAll()

            )

            .oauth2ResourceServer(oauth2 -> oauth2
            
            .jwt(jwtConfigurer -> jwtConfigurer
            
            .decoder(jwtDecoder())

            .jwtAuthenticationConverter(jwtAuthenticationConverter())

            )

            );

            return http.build();

    }



    @Bean

    public JwtDecoder jwtDecoder() {

        SecretKeySpec key = new SecretKeySpec(jwtSecret.getBytes(), "HmacSHA256");

        return NimbusJwtDecoder.withSecretKey(key).build();

    }



    private JwtAuthenticationConverter jwtAuthenticationConverter() {

        JwtAuthenticationConverter conv = new JwtAuthenticationConverter();

        conv.setJwtGrantedAuthoritiesConverter(new KeycloakRoleConverter());

        return conv;

    }


    @Bean

    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();

    }



    @Bean

    public AuthenticationManager authenticationManager(

        UserDetailsService userDetailsService,

        PasswordEncoder passwordEncoder) {

            DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

            authProvider.setUserDetailsService(userDetailsService);

            authProvider.setPasswordEncoder(passwordEncoder);

            return new ProviderManager(authProvider);

        }
}