package com.examly.springapp.dto;

import java.time.LocalDate;
import com.examly.springapp.model.enums.Difficulty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkoutPlanResponseDTO {
    private Long planId;
    private String title;
    private String description;
    private Difficulty difficulty;
    private UserResponseDTO createdBy;
    private LocalDate creationDate;
}
