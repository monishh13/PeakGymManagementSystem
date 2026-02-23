package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Exercise;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise,Long> {
    List<Exercise> findByWorkoutPlanPlanId(Long planId);
}
