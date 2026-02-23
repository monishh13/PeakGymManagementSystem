package com.examly.springapp.model.dto;

import java.util.List;

import com.examly.springapp.model.WorkoutPlan;

import lombok.Data;
@Data
public class EnhancedPlan {

    private WorkoutPlan plan; // basic details

    private List<Long> clientIds; // IDs for multi-client assignment

    private List<ExerciseDetails> exerciseDetails; // includes rest time for each



    @Data
    public static class ExerciseDetails {

        private Long exerciseId;

        private Integer sets;

        private Integer reps;

        private Integer restTimeSeconds; // new field



    }

    }