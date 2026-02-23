package com.examly.springapp.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.ProgressLog;



public interface ProgressLogRepository extends JpaRepository<ProgressLog,Long> {

    List<ProgressLog> findByUserUserId(Long userId);

    List<ProgressLog> findByWorkoutPlanPlanIdAndExerciseExerciseId(Long planId, Long exerciseId);

}