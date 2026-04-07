package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.WorkoutPlan;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

@Repository
public interface WorkoutPlanRepository extends JpaRepository<WorkoutPlan,Long> {
    Page<WorkoutPlan> findAllByIsActiveTrue(Pageable pageable);
    List<WorkoutPlan> findAllByIsActiveTrue();
    Optional<WorkoutPlan> findByPlanIdAndIsActiveTrue(Long id);
}
