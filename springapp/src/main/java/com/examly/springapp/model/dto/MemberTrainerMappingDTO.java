package com.examly.springapp.model.dto;

import lombok.Data;

@Data
public class MemberTrainerMappingDTO {
    private Long id;
    private Long memberId;
    private String memberName;
    private Long trainerId;
    private String trainerName;


    
}
