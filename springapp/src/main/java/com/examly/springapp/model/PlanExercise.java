package com.examly.springapp.model;



import jakarta.persistence.*;

import lombok.*;



@Entity

@Data

@Builder

@NoArgsConstructor

@AllArgsConstructor
public class PlanExercise {

    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;



    @ManyToOne(fetch = FetchType.LAZY)

    @JoinColumn(name = "workout_plan_id")

    private WorkoutPlan workoutPlan;



    @ManyToOne(fetch = FetchType.LAZY)

    @JoinColumn(name = "exercise_id")

    private Exercise exercise;



    private Integer sets;



    private Integer reps;



    // NEW FIELD: Optional with default, as per plan

    private Integer restTimeSeconds = 60; // Default 60 seconds

}