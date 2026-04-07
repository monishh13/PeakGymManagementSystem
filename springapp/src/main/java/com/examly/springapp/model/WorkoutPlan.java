package com.examly.springapp.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.examly.springapp.model.enums.Difficulty;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WorkoutPlan {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long planId;
    
    @Column(nullable = false,length=100)
    @NotNull
    private String title;
    
    @Column(length = 500)
    private String description;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;
    
    @ManyToOne
    @JoinColumn(name = "created_by",nullable = false)
    @NotNull
   // @JsonBackReference
    private User createdBy;

    @Column(nullable = false)
    @NotNull
    private LocalDate creationDate;

    @Column(columnDefinition = "boolean default true")
    @Builder.Default
    private Boolean isActive = true;
    
    public WorkoutPlan(Long planId) {
        this.planId=planId;
    }
    @OneToMany(mappedBy = "workoutPlan")
    @Builder.Default
    private List<Exercise> exercises = new ArrayList<>();

    @ManyToMany
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Builder.Default
    private Set<User> assignedMembers=new HashSet<>();

    @OneToMany(mappedBy = "workoutPlan", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Builder.Default
    private List<PlanExercise> planExercises=new ArrayList<>();

    @OneToMany(mappedBy="workoutPlan", fetch=FetchType.LAZY)
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @JsonIgnore
    @Builder.Default
    private List<ProgressLog> progressLogs = new ArrayList<>();


}
