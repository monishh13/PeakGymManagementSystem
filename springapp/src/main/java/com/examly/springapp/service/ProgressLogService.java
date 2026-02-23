package com.examly.springapp.service;



import java.util.List;

import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Autowired;

import com.examly.springapp.model.ProgressLog;

import com.examly.springapp.model.dto.ProgressLogRequest;
import com.examly.springapp.repository.ExerciseRepository;
import com.examly.springapp.repository.ProgressLogRepository;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.repository.WorkoutPlanRepository;



@Service

public class ProgressLogService {

    @Autowired private ProgressLogRepository repo;

    @Autowired private UserRepository userRepo;

    @Autowired private ExerciseRepository exerciseRepo;

    @Autowired private WorkoutPlanRepository planRepo;



    public ProgressLog logExerciseProgress(ProgressLogRequest req) {

        ProgressLog log = new ProgressLog();

        log.setUser(userRepo.findById(req.getUserId()).orElseThrow());

        log.setExercise(exerciseRepo.findById(req.getExerciseId()).orElseThrow());

        log.setWorkoutPlan(planRepo.findById(req.getWorkoutPlanId()).orElseThrow());

        log.setDate(req.getDate());

        log.setWeightLifted(req.getWeightLifted());

        log.setRepsCompleted(req.getRepsCompleted());

        log.setSetsCompleted(req.getSetsCompleted());

        return repo.save(log);

    }



    public List<ProgressLog> getExerciseProgress(Long userId) {

        return repo.findByUserUserId(userId);

        }

    }