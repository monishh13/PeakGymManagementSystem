package com.examly.springapp.service;


import java.util.List;

import java.util.Optional;



import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;



import com.examly.springapp.model.Exercise;

import com.examly.springapp.repository.ExerciseRepository;



import jakarta.validation.Valid;



@Service

public class ExerciseService {



    @Autowired

    private ExerciseRepository exerciseRepository;



    // Existing methods

    public List<Exercise> getExercisesByWorkoutPlan(Long planId) {

        return exerciseRepository.findByWorkoutPlanPlanId(planId);

        }



        public Exercise addExerciseToPlan(Long planId, @Valid Exercise exercise) {

            return exerciseRepository.save(exercise);

        }



        // New Tier-2 methods



        /**
         * 
         * * Retrieve all exercises in the database.
         * 
         */

         public List<Exercise> getAllExercises() {

            return exerciseRepository.findAll();

         }



         /**
          * 
          * Create a new standalone exercise (admin only).

          */

          public Exercise createExercise(@Valid Exercise exercise) {

            return exerciseRepository.save(exercise);

          }



          /**
           * 
           * * Update an existing exercise by ID.
           * 
           * * Returns the updated entity, or null if not found.
           * 
           * */

           public Exercise updateExercise(Long id, @Valid Exercise updated) {

            Optional<Exercise> existingOpt = exerciseRepository.findById(id);

            if (existingOpt.isEmpty()) {

                return null;

            }

            Exercise existing = existingOpt.get();

            existing.setName(updated.getName());

            existing.setDescription(updated.getDescription());

            existing.setSets(updated.getSets());

            existing.setReps(updated.getReps());

            existing.setTargetMuscles(updated.getTargetMuscles());

            return exerciseRepository.save(existing);

        }



        /**

        * Delete an exercise by ID.

        * Returns true if deleted, false if not found.

        */

        public boolean deleteExercise(Long id) {

            if (!exerciseRepository.existsById(id)) {

                return false;

            }

            exerciseRepository.deleteById(id);

            return true;

        }

    }