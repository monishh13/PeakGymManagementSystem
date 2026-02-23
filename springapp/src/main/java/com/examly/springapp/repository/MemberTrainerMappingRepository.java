package com.examly.springapp.repository;



import com.examly.springapp.model.MemberTrainerMapping;

import com.examly.springapp.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;



public interface MemberTrainerMappingRepository extends JpaRepository<MemberTrainerMapping, Long> {

    List<MemberTrainerMapping> findByTrainer(User trainer);

    List<MemberTrainerMapping> findByMember(User member);

    }