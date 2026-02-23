package com.examly.springapp.model;



import java.time.LocalDate;

import jakarta.persistence.*;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import com.fasterxml.jackson.annotation.JsonInclude;



@Entity
@Table(name = "progress_logs")
@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class ProgressLog {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long logId;



    @NotNull

    @ManyToOne

    @JoinColumn(name = "user_id")

    private User user;



    @NotNull

    @ManyToOne

    @JoinColumn(name = "exercise_id")

    private Exercise exercise;



    @NotNull

    @ManyToOne

    @JoinColumn(name = "workout_plan_id")

    private WorkoutPlan workoutPlan;



    @NotNull private LocalDate date;

    @NotNull private Integer weightLifted;

    @NotNull private Integer repsCompleted;

    private Integer setsCompleted;



    // getters & setters

    }