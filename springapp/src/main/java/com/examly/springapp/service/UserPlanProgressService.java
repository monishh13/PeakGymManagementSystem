package com.examly.springapp.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Exercise;
import com.examly.springapp.model.ProgressLog;
import com.examly.springapp.model.User;
import com.examly.springapp.model.UserPlanProgress;
import com.examly.springapp.model.WorkoutPlan;
import com.examly.springapp.model.dto.ProgressLogRequest;
import com.examly.springapp.repository.ExerciseRepository;
import com.examly.springapp.repository.ProgressLogRepository;
import com.examly.springapp.repository.UserPlanProgressRepository;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.repository.WorkoutPlanRepository;

@Service
public class UserPlanProgressService {
    @Autowired
    private UserPlanProgressRepository userPlanProgressRepository;

    @Autowired
    private WorkoutPlanRepository workoutPlanRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProgressLogRepository progressLogRepository;
    @Autowired
    private ExerciseRepository exerciseRepository;

    public List<UserPlanProgress> getProgressByUser(Long userId){
        return userPlanProgressRepository.findByUserUserId(userId);
    }
    public UserPlanProgress assignProgress(Long userId,Long planId,LocalDate assignedDate){
        
        UserPlanProgress p=new UserPlanProgress();
        p.setUser(new User(userId));
        WorkoutPlan w=workoutPlanRepository.findById(planId).orElseThrow(() -> new RuntimeException("Not Found" + planId));
        p.setWorkoutPlan(w);
        p.setAssignedDate(assignedDate);
        p.setCompletionPercentage(0);
        p.setLastUpdated(assignedDate);
        return userPlanProgressRepository.save(p);  

    }
    public UserPlanProgress updateProgress(Long userId,Long progressId,int completionPercentage,LocalDate lastUpdated){
        UserPlanProgress p=userPlanProgressRepository.findById(progressId).orElse(null);
        if(p!=null && p.getUser().getUserId().equals(userId)){
            p.setCompletionPercentage(completionPercentage != 0 ? completionPercentage:0);
            p.setLastUpdated(lastUpdated);
            return userPlanProgressRepository.save(p);
        }
        return null;
    }
    /**
     * 
     * * Log exercise-level progress for a user
     * 
     */

     public ProgressLog logExerciseProgress(ProgressLogRequest req) {

        // Validate user exists

        User user = userRepository.findById(req.getUserId())

        .orElseThrow(() -> new RuntimeException("User not found with id: " + req.getUserId()));



        // Validate workout plan exists

        WorkoutPlan workoutPlan = workoutPlanRepository.findById(req.getWorkoutPlanId())

        .orElseThrow(() -> new RuntimeException("Workout plan not found with id: " + req.getWorkoutPlanId()));



        // Validate exercise exists (you'll need to inject ExerciseRepository)

        Exercise exercise = exerciseRepository.findById(req.getExerciseId())

        .orElseThrow(() -> new RuntimeException("Exercise not found with id: " + req.getExerciseId()));



        // Create and populate ProgressLog

        ProgressLog log = new ProgressLog();

        log.setUser(user);

        log.setExercise(exercise);

        log.setWorkoutPlan(workoutPlan);

        log.setDate(req.getDate() != null ? req.getDate() : LocalDate.now());

        log.setWeightLifted(req.getWeightLifted());

        log.setRepsCompleted(req.getRepsCompleted());

        log.setSetsCompleted(req.getSetsCompleted());



        return progressLogRepository.save(log);

     }



     /**
      * 
      * Get all exercise-level progress logs for a user

      */

      public List<ProgressLog> getExerciseProgress(Long userId) {

        // Validate user exists

        if (!userRepository.existsById(userId)) {

            throw new RuntimeException("User not found with id: " + userId);

        }



        return progressLogRepository.findByUserUserId(userId);

    }
}
