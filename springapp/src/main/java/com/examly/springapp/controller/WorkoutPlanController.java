package com.examly.springapp.controller;



import com.examly.springapp.model.WorkoutPlan;
import com.examly.springapp.model.dto.EnhancedPlan;
import com.examly.springapp.service.WorkoutPlanService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;



import java.util.List;



@RestController

@RequestMapping("/api/workout-plans")

public class WorkoutPlanController {

    @Autowired

    private WorkoutPlanService workoutPlanService;

    @GetMapping

    public ResponseEntity<List<WorkoutPlan>> getAllWorkoutPlans() {

        return new ResponseEntity<>(workoutPlanService.getAllWorkoutPlans(), HttpStatus.OK);

    }



    @GetMapping("/{planId}")

    public ResponseEntity<WorkoutPlan> getWorkoutPlanById(@PathVariable Long planId) {

        WorkoutPlan plan = workoutPlanService.getWorkoutPlanById(planId);

        return plan != null ? new ResponseEntity<>(plan, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @PostMapping

    public ResponseEntity<WorkoutPlan> createWorkoutPlan(@Valid @RequestBody WorkoutPlan plan) {


        WorkoutPlan savedPlan = workoutPlanService.createWorkoutPlan(plan);

        return new ResponseEntity<>(savedPlan, HttpStatus.CREATED);

    }
    // @PostMapping

    // public ResponseEntity<WorkoutPlan> createWorkoutPlan(@Valid @RequestBody WorkoutPlan workoutPlan) {
    //     User user=userRepository.findById(workoutPlan.getCreatedBy().getUserId()).orElseThrow(()-> new ResourceNotFoundException("User not found"));
    //     workoutPlan.setCreatedBy(user);
    //     WorkoutPlan savedPlan = workoutPlanService.createWorkoutPlan(workoutPlan);

    //     return ResponseEntity.status(HttpStatus.CREATED).body(savedPlan);

    // }

    @PostMapping("/apiv2/workout-plans")

    @PreAuthorize("hasAnyRole('TRAINER','ADMIN')")

    public ResponseEntity<WorkoutPlan> createEnhancedPlan(@RequestBody EnhancedPlan request) {

        WorkoutPlan plan = request.getPlan();

        List<Long> clientIds = request.getClientIds();

        List<EnhancedPlan.ExerciseDetails> details = request.getExerciseDetails();



        WorkoutPlan createdPlan = workoutPlanService.createPlanWithClients(plan, clientIds, details);

        return new ResponseEntity<>(createdPlan, HttpStatus.CREATED);

    }
}