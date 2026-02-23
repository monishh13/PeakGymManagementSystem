package com.examly.springapp.config;



import org.springframework.core.convert.converter.Converter;

import org.springframework.security.core.GrantedAuthority;

import org.springframework.security.oauth2.jwt.Jwt;

import org.springframework.security.core.authority.SimpleGrantedAuthority;



import java.util.Collection;

import java.util.List;

import java.util.Map;

import java.util.stream.Collectors;



public class KeycloakRoleConverter implements Converter<Jwt, Collection<GrantedAuthority>> {

    @Override

    public Collection<GrantedAuthority> convert(Jwt jwt) {

        Map<String,Object> realmAccess = jwt.getClaim("realm_access");

        if (realmAccess == null || realmAccess.isEmpty()) {

            return List.of();

        }

        var roles = (List<String>) realmAccess.get("roles");

        return roles.stream()

        .map(role -> new SimpleGrantedAuthority("ROLE_" + role))

        .collect(Collectors.toList());

    }

}