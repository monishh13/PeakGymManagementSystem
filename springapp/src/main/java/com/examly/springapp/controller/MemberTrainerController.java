package com.examly.springapp.controller;



import com.examly.springapp.model.MemberTrainerMapping;
import com.examly.springapp.model.dto.MemberTrainerMappingDTO;
import com.examly.springapp.service.MemberTrainerService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.web.bind.annotation.*;



import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;



@RestController
@SecurityRequirement(name = "bearerAuth")
@RequestMapping("/api/v2")

public class MemberTrainerController {



    private final MemberTrainerService service;



    public MemberTrainerController(MemberTrainerService service) {

        this.service = service;

        }



        // ADMIN assigns a member to a trainer

       @PostMapping("/admin/assign-member")

       @PreAuthorize("hasRole('ADMIN')")

       public ResponseEntity<?> assignMember(@RequestParam Long memberId, @RequestParam Long trainerId) {

        try {

            MemberTrainerMapping mapping = service.assignMemberToTrainer(memberId, trainerId);

            return new ResponseEntity<>(mapping, HttpStatus.CREATED);

        } catch (IllegalArgumentException ex) {

            // Sends clear message for not found etc.

            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));

        } catch (Exception ex) {

            ex.printStackTrace(); // Will print the full stack trace to your server console/logs

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)

            .body(Map.of("error", "Unexpected error: " + ex.getClass().getSimpleName() + " - " + ex.getMessage()));

        }

    }

    public MemberTrainerMappingDTO toDto(MemberTrainerMapping mapping) {

        MemberTrainerMappingDTO dto = new MemberTrainerMappingDTO();

        dto.setId(mapping.getId());

        dto.setMemberId(mapping.getMember().getUserId());

        dto.setMemberName(mapping.getMember().getUsername());

        dto.setTrainerId(mapping.getTrainer().getUserId());

        dto.setTrainerName(mapping.getTrainer().getUsername());

        return dto;

    }

        // TRAINER lists their assigned members
        
        @GetMapping("/trainer/{trainerId}/members")
        @PreAuthorize("hasRole('TRAINER') and #trainerId == authentication.principal.id or hasRole('ADMIN')")

       public ResponseEntity<List<MemberTrainerMappingDTO>> getMembersForTrainer(@PathVariable Long trainerId) {

        List<MemberTrainerMapping> entities = service.getMembersForTrainer(trainerId);

        List<MemberTrainerMappingDTO> dtos = entities.stream()

        .map(this::toDto)

        .collect(Collectors.toList());

        return ResponseEntity.ok(dtos);

       }
       }