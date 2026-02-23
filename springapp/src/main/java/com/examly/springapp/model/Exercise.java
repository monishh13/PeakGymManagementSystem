package com.examly.springapp.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long exerciseId;

    @Column(nullable = false)
    @NotNull
    private String name;
    @Column(length = 500)
    private String description;
    @Column(nullable = false)
    @Min(value = 1)
    @NotNull
    private Integer sets;
    @Column(nullable = false)
    @Min(value = 1)
    @NotNull
    private Integer reps;
    @Column(length = 255)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String targetMuscles;
    
    @ManyToOne
    @JoinColumn(name="plan_id")
    @JsonBackReference
    private WorkoutPlan workoutPlan;

    @OneToMany(mappedBy="exercise", fetch=FetchType.LAZY)
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @JsonIgnore
    private List<ProgressLog> exerciseLogs;



}
