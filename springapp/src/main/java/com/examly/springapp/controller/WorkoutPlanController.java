package com.examly.springapp.controller;



import com.examly.springapp.model.WorkoutPlan;
import com.examly.springapp.model.dto.EnhancedPlan;
import com.examly.springapp.service.WorkoutPlanService;
import com.examly.springapp.dto.WorkoutPlanResponseDTO;
import com.examly.springapp.dto.Mappers;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

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
    public ResponseEntity<Page<WorkoutPlanResponseDTO>> getAllWorkoutPlans(Pageable pageable) {
        Page<WorkoutPlanResponseDTO> page = workoutPlanService.getPaginatedWorkoutPlans(pageable)
                .map(Mappers::mapToWorkoutPlanResponseDTO);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping("/{planId}")
    public ResponseEntity<WorkoutPlanResponseDTO> getWorkoutPlanById(@PathVariable Long planId) {
        WorkoutPlan plan = workoutPlanService.getWorkoutPlanById(planId);
        return plan != null ? new ResponseEntity<>(Mappers.mapToWorkoutPlanResponseDTO(plan), HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('TRAINER', 'ADMIN')")
    public ResponseEntity<WorkoutPlanResponseDTO> createWorkoutPlan(@Valid @RequestBody WorkoutPlan plan) {
        WorkoutPlan savedPlan = workoutPlanService.createWorkoutPlan(plan);
        return new ResponseEntity<>(Mappers.mapToWorkoutPlanResponseDTO(savedPlan), HttpStatus.CREATED);
    }

    @PutMapping("/{planId}")
    @PreAuthorize("hasAnyRole('TRAINER', 'ADMIN')")
    public ResponseEntity<WorkoutPlanResponseDTO> updateWorkoutPlan(@PathVariable Long planId, @Valid @RequestBody WorkoutPlan planUpdates) {
        WorkoutPlan updated = workoutPlanService.updateWorkoutPlan(planId, planUpdates);
        return new ResponseEntity<>(Mappers.mapToWorkoutPlanResponseDTO(updated), HttpStatus.OK);
    }

    @DeleteMapping("/{planId}")
    @PreAuthorize("hasAnyRole('TRAINER', 'ADMIN')")
    public ResponseEntity<Void> deleteWorkoutPlan(@PathVariable Long planId) {
        workoutPlanService.deleteWorkoutPlan(planId);
        return ResponseEntity.noContent().build();
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