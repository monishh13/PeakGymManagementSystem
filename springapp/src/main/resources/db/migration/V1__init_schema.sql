-- V1__init_schema.sql

CREATE TABLE `user` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `is_active` bit(1) DEFAULT b'1',
  `join_date` date NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `username` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UK_user_email` (`email`),
  UNIQUE KEY `UK_user_username` (`username`)
);

CREATE TABLE `workout_plan` (
  `plan_id` bigint NOT NULL AUTO_INCREMENT,
  `creation_date` date NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `difficulty` varchar(255) NOT NULL,
  `is_active` bit(1) DEFAULT b'1',
  `title` varchar(100) NOT NULL,
  `created_by` bigint NOT NULL,
  PRIMARY KEY (`plan_id`),
  CONSTRAINT `FK_wp_created_by` FOREIGN KEY (`created_by`) REFERENCES `user` (`user_id`)
);

CREATE TABLE `exercise` (
  `exercise_id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(500) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `reps` int NOT NULL,
  `sets` int NOT NULL,
  `target_muscles` varchar(255) DEFAULT NULL,
  `plan_id` bigint DEFAULT NULL,
  PRIMARY KEY (`exercise_id`),
  CONSTRAINT `FK_exercise_plan_id` FOREIGN KEY (`plan_id`) REFERENCES `workout_plan` (`plan_id`)
);

CREATE TABLE `member_trainer_mapping` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `member_id` bigint DEFAULT NULL,
  `trainer_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_mtm_member_id` FOREIGN KEY (`member_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FK_mtm_trainer_id` FOREIGN KEY (`trainer_id`) REFERENCES `user` (`user_id`)
);

CREATE TABLE `plan_exercise` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `reps` int DEFAULT NULL,
  `rest_time_seconds` int DEFAULT NULL,
  `sets` int DEFAULT NULL,
  `exercise_id` bigint DEFAULT NULL,
  `workout_plan_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_pe_exercise_id` FOREIGN KEY (`exercise_id`) REFERENCES `exercise` (`exercise_id`),
  CONSTRAINT `FK_pe_workout_plan_id` FOREIGN KEY (`workout_plan_id`) REFERENCES `workout_plan` (`plan_id`)
);

CREATE TABLE `progress_logs` (
  `log_id` bigint NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `reps_completed` int NOT NULL,
  `sets_completed` int DEFAULT NULL,
  `weight_lifted` int NOT NULL,
  `exercise_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `workout_plan_id` bigint NOT NULL,
  PRIMARY KEY (`log_id`),
  CONSTRAINT `FK_pl_exercise_id` FOREIGN KEY (`exercise_id`) REFERENCES `exercise` (`exercise_id`),
  CONSTRAINT `FK_pl_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FK_pl_workout_plan_id` FOREIGN KEY (`workout_plan_id`) REFERENCES `workout_plan` (`plan_id`)
);

CREATE TABLE `user_plan_progress` (
  `progress_id` bigint NOT NULL AUTO_INCREMENT,
  `assigned_date` date NOT NULL,
  `completion_percentage` int NOT NULL,
  `last_updated` date NOT NULL,
  `user_user_id` bigint DEFAULT NULL,
  `workout_plan_plan_id` bigint DEFAULT NULL,
  PRIMARY KEY (`progress_id`),
  CONSTRAINT `FK_upp_user_id` FOREIGN KEY (`user_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FK_upp_plan_id` FOREIGN KEY (`workout_plan_plan_id`) REFERENCES `workout_plan` (`plan_id`)
);

CREATE TABLE `workout_plan_assigned_members` (
  `workout_plan_plan_id` bigint NOT NULL,
  `assigned_members_user_id` bigint NOT NULL,
  PRIMARY KEY (`workout_plan_plan_id`,`assigned_members_user_id`),
  CONSTRAINT `FK_wpam_user_id` FOREIGN KEY (`assigned_members_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FK_wpam_plan_id` FOREIGN KEY (`workout_plan_plan_id`) REFERENCES `workout_plan` (`plan_id`)
);
