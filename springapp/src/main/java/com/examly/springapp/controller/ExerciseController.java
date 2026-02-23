package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Exercise;
import com.examly.springapp.model.WorkoutPlan;
import com.examly.springapp.service.ExerciseService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/workout-plans")
public class ExerciseController {
    @Autowired
    private ExerciseService exerciseService;

    @GetMapping("/{planId}/exercises")
    public ResponseEntity<List<Exercise>> getExercisesForPlan(@PathVariable Long planId){
        List<Exercise> ex=exerciseService.getExercisesByWorkoutPlan(planId);
        return ex.isEmpty() ? new ResponseEntity<>(HttpStatus.NOT_FOUND) : new ResponseEntity<>(ex,HttpStatus.OK);
    }
    @PostMapping("/{planId}/exercises")
    public ResponseEntity<Exercise> addExerciseToPlan(@PathVariable Long planId,@Valid @RequestBody Exercise exercise){
        exercise.setWorkoutPlan(new WorkoutPlan(planId));
        Exercise s=exerciseService.addExerciseToPlan(planId, exercise);
        return new ResponseEntity<>(s,HttpStatus.CREATED);
    }
}
