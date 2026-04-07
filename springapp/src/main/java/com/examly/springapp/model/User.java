package com.examly.springapp.model;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Tolerate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;
    
    @Column(nullable = false,unique = true,length = 50)
    @NotNull
    @Size(min = 3,max = 50,message = "Username must be between 3 and 5 characters")
    private String username;
    @Column(nullable = false,unique = true)
    @Email(message="Email should be valid")
    private String email;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private com.examly.springapp.model.enums.Role role;
    @Column(nullable = false)
    private LocalDate joinDate;

    @Column(nullable = false)
    @NotNull(message = "Password cannot be null")
    private String password;

    @Column(columnDefinition = "boolean default true")
    @Builder.Default
    private Boolean isActive = true;
    @Tolerate
    public User(Long userId) {
        this.userId=userId;
    }
    public Long getUserId() {
        return userId;
    }
    public String getPassword() {

            return password;

    }

    public void setPassword(String password) {

            this.password = password;

    }

    
    
}
