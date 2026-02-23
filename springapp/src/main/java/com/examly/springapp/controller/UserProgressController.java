package com.examly.springapp.controller;



import com.examly.springapp.model.UserPlanProgress;

import com.examly.springapp.service.UserPlanProgressService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;




import java.util.List;



@RestController

@RequestMapping("/api/users")

public class UserProgressController {

    @Autowired

    private UserPlanProgressService userPlanProgressService;



    @GetMapping("/{userId}/progress")

    public ResponseEntity<List<UserPlanProgress>> getUserProgress(@PathVariable Long userId) {

        List<UserPlanProgress> progress = userPlanProgressService.getProgressByUser(userId);

        return progress.isEmpty() ? new ResponseEntity<>(HttpStatus.NOT_FOUND) : new ResponseEntity<>(progress, HttpStatus.OK);

        }



        @PostMapping("/{userId}/progress")

        public ResponseEntity<UserPlanProgress> assignWorkoutPlan(@PathVariable Long userId, @Valid @RequestBody UserPlanProgress progress) {

            UserPlanProgress savedProgress = userPlanProgressService.assignProgress(userId, progress.getWorkoutPlan().getPlanId(), progress.getAssignedDate());

            return savedProgress != null ? new ResponseEntity<>(savedProgress, HttpStatus.CREATED) : new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }



        @PutMapping("/{userId}/progress/{progressId}")
        public ResponseEntity<UserPlanProgress> updateUserProgress(@PathVariable Long userId, @PathVariable Long progressId,
        @Valid @RequestBody UserPlanProgress progressDetails) {

            UserPlanProgress updatedProgress = userPlanProgressService.updateProgress(userId, progressId,
            progressDetails.getCompletionPercentage(), progressDetails.getLastUpdated());

            return updatedProgress != null ? new ResponseEntity<>(updatedProgress, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }

}