package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.PlanExercise;
import com.examly.springapp.model.WorkoutPlan;

@Repository
public interface PlanExerciseRepository extends JpaRepository<PlanExercise,Long> {

    List<PlanExercise> findByWorkoutPlan(WorkoutPlan plan);
    
}
