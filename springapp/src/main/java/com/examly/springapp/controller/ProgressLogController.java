package com.examly.springapp.controller;



import java.util.List;

import org.springframework.http.*;

import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Autowired;

import com.examly.springapp.model.ProgressLog;

import com.examly.springapp.model.dto.ProgressLogRequest;

import com.examly.springapp.service.ProgressLogService;

import jakarta.validation.Valid;



@RestController

@RequestMapping("/apiv2")

public class ProgressLogController {

    @Autowired private ProgressLogService service;



    @PostMapping("/progress-logs")

    public ResponseEntity<ProgressLog> logProgress(@Valid @RequestBody ProgressLogRequest req) {

        return new ResponseEntity<>(service.logExerciseProgress(req), HttpStatus.CREATED);

    }



    @GetMapping("/users/{userId}/exercise-progress")

    public ResponseEntity<List<ProgressLog>> getExerciseProgress(@PathVariable Long userId) {

        return ResponseEntity.ok(service.getExerciseProgress(userId));

    }

    }