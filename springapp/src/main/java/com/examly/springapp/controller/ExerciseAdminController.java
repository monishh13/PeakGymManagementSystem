package com.examly.springapp.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Exercise;
import com.examly.springapp.service.ExerciseService;

import jakarta.validation.Valid;

@RestController

@RequestMapping("/api/v2/exercises")

public class ExerciseAdminController {



    @Autowired

    private ExerciseService exerciseService;



    // Get all exercises

    @GetMapping

    public ResponseEntity<List<Exercise>> getAllExercises() {

        List<Exercise> exercises = exerciseService.getAllExercises();

        return exercises.isEmpty() ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(exercises, HttpStatus.OK);

    }



    // Create new exercise (admin only)

    @PostMapping
    
    @PreAuthorize("hasAnyRole('ADMIN','TRAINER')")

    public ResponseEntity<Exercise> createExercise(@Valid @RequestBody Exercise exercise) {

        Exercise savedExercise = exerciseService.createExercise(exercise);

        return new ResponseEntity<>(savedExercise, HttpStatus.CREATED);

    }



    // Update exercise (admin only)

    @PutMapping("/{id}")

    @PreAuthorize("hasAnyRole('ADMIN','TRAINER')")

    public ResponseEntity<Exercise> updateExercise(@PathVariable Long id, @Valid @RequestBody Exercise exercise) {

        Exercise updatedExercise = exerciseService.updateExercise(id, exercise);

        return updatedExercise != null ?

        new ResponseEntity<>(updatedExercise, HttpStatus.OK) :

        new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }



    // Optional: Delete exercise (admin only)

    @DeleteMapping("/{id}")

    @PreAuthorize("hasAnyRole('ADMIN','TRAINER')")

    public ResponseEntity<Void> deleteExercise(@PathVariable Long id) {

        boolean deleted = exerciseService.deleteExercise(id);

        return deleted ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

}