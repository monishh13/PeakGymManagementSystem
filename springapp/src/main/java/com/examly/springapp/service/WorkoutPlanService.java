package com.examly.springapp.service;



import java.time.LocalDate;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.stereotype.Service;

import com.examly.springapp.model.Exercise;
import com.examly.springapp.model.PlanExercise;
import com.examly.springapp.model.User;

import com.examly.springapp.model.WorkoutPlan;
import com.examly.springapp.model.dto.EnhancedPlan;
import com.examly.springapp.model.dto.EnhancedPlan.ExerciseDetails;
import com.examly.springapp.model.enums.Role;
import com.examly.springapp.repository.ExerciseRepository;
import com.examly.springapp.repository.PlanExerciseRepository;
import com.examly.springapp.repository.UserRepository;

import com.examly.springapp.repository.WorkoutPlanRepository;

import jakarta.validation.Valid;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;



@Service

public class WorkoutPlanService {

@Autowired

private WorkoutPlanRepository workoutPlanRepository;



@Autowired// Make UserRepository optional

private UserRepository userRepository;
@Autowired
private ExerciseRepository exerciseRepository;

@Autowired
private PlanExerciseRepository planExerciseRepository;


@Value("${spring.profiles.active:}")

private String activeProfile;



private boolean isTestEnvironment() {

return "test".equalsIgnoreCase(activeProfile);

}



public Page<WorkoutPlan> getPaginatedWorkoutPlans(Pageable pageable) {
    Page<WorkoutPlan> plans = workoutPlanRepository.findAllByIsActiveTrue(pageable);
    for(WorkoutPlan plan : plans){
        List<PlanExercise> list = planExerciseRepository.findByWorkoutPlan(plan);
        plan.setPlanExercises(list);
    }
    return plans;
}

public List<WorkoutPlan> getAllWorkoutPlans() {
    List<WorkoutPlan> plans=workoutPlanRepository.findAllByIsActiveTrue();
    for(WorkoutPlan plan : plans){
        List<PlanExercise> list = planExerciseRepository.findByWorkoutPlan(plan);
        plan.setPlanExercises(list);
    }
    return plans;
}



public WorkoutPlan getWorkoutPlanById(Long planId) {

return workoutPlanRepository.findById(planId).orElse(null);

}



public WorkoutPlan createWorkoutPlan(@Valid WorkoutPlan plan) {

if (!isTestEnvironment() && userRepository != null && plan.getCreatedBy() != null  && plan.getCreatedBy().getUserId() != null 

&& (plan.getCreatedBy().getUsername() == null || plan.getCreatedBy().getEmail() == null)) {

User user = userRepository.findById(plan.getCreatedBy().getUserId())

.orElseThrow(() -> new RuntimeException("User not found"));

plan.setCreatedBy(user);

}

return workoutPlanRepository.save(plan);

}

public WorkoutPlan createPlanWithClients(WorkoutPlan basePlan, List<Long> clientIds, List<ExerciseDetails> details) {
    if (basePlan.getCreationDate()==null) {
        basePlan.setCreationDate(LocalDate.now());
    }

    // Save the plan

    WorkoutPlan savedPlan = workoutPlanRepository.save(basePlan);



    // Assign clients

    Set<User> clients = userRepository.findAllById(clientIds).stream()

    .filter(u -> u.getRole().equals(Role.MEMBER)).collect(Collectors.toSet());

    savedPlan.setAssignedMembers(clients);



    // Add exercises with rest times

    for(EnhancedPlan.ExerciseDetails exDetail : details){

        Exercise exercise = exerciseRepository.findById(exDetail.getExerciseId()).orElseThrow(()->new RuntimeException("Exercise not found with id:"+exDetail.getExerciseId()));

        PlanExercise planEx = new PlanExercise();

        planEx.setWorkoutPlan(savedPlan);

        planEx.setExercise(exercise);

        planEx.setSets(exDetail.getSets());

        planEx.setReps(exDetail.getReps());

        planEx.setRestTimeSeconds(exDetail.getRestTimeSeconds() != null ? exDetail.getRestTimeSeconds() : 60);

        

        planExerciseRepository.save(planEx);

    }
    


    // Save and return
    return workoutPlanRepository.save(savedPlan);
}

public WorkoutPlan updateWorkoutPlan(Long planId, WorkoutPlan planUpdates) {
    WorkoutPlan existing = workoutPlanRepository.findById(planId)
            .orElseThrow(() -> new RuntimeException("Workout Plan not found"));
    
    // Only update allowed fields
    if (planUpdates.getTitle() != null) existing.setTitle(planUpdates.getTitle());
    if (planUpdates.getDescription() != null) existing.setDescription(planUpdates.getDescription());
    if (planUpdates.getDifficulty() != null) existing.setDifficulty(planUpdates.getDifficulty());
    
    return workoutPlanRepository.save(existing);
}

public void deleteWorkoutPlan(Long planId) {
    WorkoutPlan existing = workoutPlanRepository.findById(planId)
            .orElseThrow(() -> new RuntimeException("Workout Plan not found"));
    
    existing.setIsActive(false);
    workoutPlanRepository.save(existing);
}

}