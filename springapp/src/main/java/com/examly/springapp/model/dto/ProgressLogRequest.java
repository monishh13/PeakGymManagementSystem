package com.examly.springapp.model.dto;



import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;
import lombok.Data;


@Data
public class ProgressLogRequest {

    @NotNull private Long userId;

    @NotNull private Long exerciseId;

    @NotNull private Long workoutPlanId;

    @NotNull private LocalDate date;

    @NotNull private Integer weightLifted;

    @NotNull private Integer repsCompleted;

    private Integer setsCompleted;

    // getters & setters

}