package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.UserPlanProgress;

@Repository
public interface UserPlanProgressRepository extends JpaRepository<UserPlanProgress,Long>{
    List<UserPlanProgress> findByUserUserId(Long userId);
}
