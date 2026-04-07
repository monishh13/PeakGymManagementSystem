package com.examly.springapp.dto;

import com.examly.springapp.model.User;
import com.examly.springapp.model.WorkoutPlan;

public class Mappers {

    public static UserResponseDTO mapToUserResponseDTO(User user) {
        if (user == null) return null;
        return UserResponseDTO.builder()
                .userId(user.getUserId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .joinDate(user.getJoinDate())
                .build();
    }

    public static WorkoutPlanResponseDTO mapToWorkoutPlanResponseDTO(WorkoutPlan plan) {
        if (plan == null) return null;
        return WorkoutPlanResponseDTO.builder()
                .planId(plan.getPlanId())
                .title(plan.getTitle())
                .description(plan.getDescription())
                .difficulty(plan.getDifficulty())
                .creationDate(plan.getCreationDate())
                .createdBy(mapToUserResponseDTO(plan.getCreatedBy()))
                .build();
    }
}
