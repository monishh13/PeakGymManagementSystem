package com.examly.springapp.model;



import jakarta.persistence.*;

import lombok.*;



import java.time.LocalDate;



@Entity

@Table(name = "member_trainer")

@Getter

@Setter

@NoArgsConstructor

@AllArgsConstructor

@Builder

public class MemberTrainerMapping {



    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;



    @ManyToOne(fetch = FetchType.LAZY)

    @JoinColumn(name = "member_id", nullable = false)

    private User member; // Role = MEMBER



    @ManyToOne(fetch = FetchType.LAZY)

    @JoinColumn(name = "trainer_id", nullable = false)

    private User trainer; // Role = TRAINER



    private LocalDate assignedDate;

}