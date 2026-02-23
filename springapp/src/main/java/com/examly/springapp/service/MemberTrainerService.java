package com.examly.springapp.service;



import com.examly.springapp.model.MemberTrainerMapping;

import com.examly.springapp.model.User;

import com.examly.springapp.repository.MemberTrainerMappingRepository;

import com.examly.springapp.repository.UserRepository;

import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;



import java.time.LocalDate;

import java.util.List;



@Service

public class MemberTrainerService {



    private final MemberTrainerMappingRepository mappingRepo;

    private final UserRepository userRepo;



    public MemberTrainerService(MemberTrainerMappingRepository mappingRepo, UserRepository userRepo) {

        this.mappingRepo = mappingRepo;

        this.userRepo = userRepo;

    }



    @Transactional

    public MemberTrainerMapping assignMemberToTrainer(Long memberId, Long trainerId) {

        User member = userRepo.findById(memberId)

        .orElseThrow(() -> new IllegalArgumentException("Member not found"));

        User trainer = userRepo.findById(trainerId)

        .orElseThrow(() -> new IllegalArgumentException("Trainer not found"));



        MemberTrainerMapping mapping = MemberTrainerMapping.builder()

        .member(member)
        .trainer(trainer)
        .assignedDate(LocalDate.now())

        .build();



        return mappingRepo.save(mapping);

    }



    public List<MemberTrainerMapping> getMembersForTrainer(Long trainerId) {

        User trainer = userRepo.findById(trainerId)

        .orElseThrow(() -> new IllegalArgumentException("Trainer not found"));

        return mappingRepo.findByTrainer(trainer);

        }

    }