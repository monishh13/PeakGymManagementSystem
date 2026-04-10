package com.examly.springapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class FitnessTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(FitnessTrackerApplication.class, args);
		System.out.println(
    new BCryptPasswordEncoder().matches(
        "Admin@123",
        "$2a$10$SlVp92pUWMvxGGGfKz/t4e/F5iPoJ.V5uI7ygCDePBsmT8HKQKvEa"
    )
);
System.out.println(new BCryptPasswordEncoder().encode("Admin@123"));
	}
}
