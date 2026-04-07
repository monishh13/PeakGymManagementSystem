# 🏋️ Peak – Gym Management System

### 🎓 Academic Project

**Peak** is a full-stack Gym Management & Fitness Tracker application developed as an **academic project** to demonstrate full-stack development skills using Spring Boot, React, and MySQL.

This project was designed and implemented as part of coursework requirements to showcase:

* REST API development
* Database design & entity relationships
* Frontend–backend integration
* Validation & global exception handling
* Automated testing (JUnit & Jest)
* Clean architecture & structured implementation planning

---

## 📌 Project Overview

Peak enables:

* Trainers to create structured workout plans
* Members to view assigned workout plans
* Members to track completion progress
* Role-based user management (TRAINER / MEMBER)
* Clean RESTful API integration
* Fully tested backend and frontend

This academic project follows a structured implementation plan including backend, frontend, routing, validation, error handling, styling, and testing.

---

# 🏗️ Architecture

```
React (Frontend)
        ↓
Spring Boot REST API (Backend)
        ↓
MySQL Database
```

---

# ⚙️ Backend – Spring Boot

## 🧩 Entities & Relationships

### 1️⃣ User

Represents gym trainers and members.

| Field    | Type      | Constraints         |
| -------- | --------- | ------------------- |
| userId   | Long      | Primary Key         |
| username | String    | Unique, Min 3 chars |
| email    | String    | Valid Email         |
| role     | String    | TRAINER / MEMBER    |
| joinDate | LocalDate | Not Null            |

---

### 2️⃣ WorkoutPlan

Created by trainers.

| Field        | Type      | Constraints                        |
| ------------ | --------- | ---------------------------------- |
| planId       | Long      | Primary Key                        |
| title        | String    | Max 100 chars                      |
| description  | String    | Max 500 chars                      |
| difficulty   | String    | BEGINNER / INTERMEDIATE / ADVANCED |
| createdBy    | User      | Trainer                            |
| creationDate | LocalDate | Not Null                           |

---

### 3️⃣ Exercise

Belongs to a WorkoutPlan.

| Field       | Type        | Constraints   |
| ----------- | ----------- | ------------- |
| exerciseId  | Long        | Primary Key   |
| name        | String      | Max 100 chars |
| description | String      | Max 500 chars |
| sets        | Integer     | Min 1         |
| reps        | Integer     | Min 1         |
| workoutPlan | WorkoutPlan | Not Null      |

---

### 4️⃣ UserPlanProgress

Tracks assigned workout plans and completion.

| Field                | Type            |
| -------------------- | --------------- |
| progressId           | Long            |
| user                 | User            |
| workoutPlan          | WorkoutPlan     |
| assignedDate         | LocalDate       |
| completionPercentage | Integer (0–100) |
| lastUpdated          | LocalDate       |

---

# 🌐 REST API Endpoints

## 👤 User Management

| Method | Endpoint              | Description     |
| ------ | --------------------- | --------------- |
| GET    | `/api/users`          | Get all users   |
| GET    | `/api/users/{userId}` | Get user by ID  |
| POST   | `/api/users`          | Create new user |

---

## 🏋️ Workout Plan Management

| Method | Endpoint                      | Description         |
| ------ | ----------------------------- | ------------------- |
| GET    | `/api/workout-plans`          | Get all plans       |
| GET    | `/api/workout-plans/{planId}` | Get plan by ID      |
| POST   | `/api/workout-plans`          | Create workout plan |

---

## 💪 Exercise Management

| Method | Endpoint                                |
| ------ | --------------------------------------- |
| GET    | `/api/workout-plans/{planId}/exercises` |
| POST   | `/api/workout-plans/{planId}/exercises` |

---

## 📊 Progress Tracking

| Method | Endpoint                                    |
| ------ | ------------------------------------------- |
| GET    | `/api/users/{userId}/progress`              |
| POST   | `/api/users/{userId}/progress`              |
| PUT    | `/api/users/{userId}/progress/{progressId}` |

---

# ✅ Validation Rules

* Username ≥ 3 characters
* Valid email format
* Role must be TRAINER or MEMBER
* Difficulty must be BEGINNER / INTERMEDIATE / ADVANCED
* Sets & reps must be positive
* Completion % between 0 and 100

### Error Response Format

```json
{
  "error": "Detailed error message"
}
```

---

# 🛡️ Global Exception Handling

Handles:

* 404 – Resource Not Found
* 400 – Validation Errors
* 500 – Server Errors

All error responses follow:

```json
{
  "error": "Error message"
}
```

---

# 🎨 Frontend – React

## 📦 Components

### 👤 User Components

* `UserList`
* `UserDetail`

### 🏋️ Workout Plan Components

* `WorkoutPlanList`
* `WorkoutPlanDetail`

### 📊 Progress Tracking

* `ProgressTracker`
* `Dashboard`

---

## 🧭 Routing

| Route                    | Component         |
| ------------------------ | ----------------- |
| `/`                      | Dashboard         |
| `/users`                 | UserList          |
| `/users/:userId`         | UserDetail        |
| `/workout-plans`         | WorkoutPlanList   |
| `/workout-plans/:planId` | WorkoutPlanDetail |
| `/progress/:userId`      | ProgressTracker   |

---

# 🧪 Testing

### Backend

* JUnit Test Cases
* Repository Layer Testing
* Service Layer Testing
* Controller Layer Testing
* Validation Testing

### Frontend

* Jest + React Testing Library
* Component Rendering Tests
* Routing Tests
* API Mock Tests
* Progress Update Tests

✅ All tests passing
✅ Build successful
✅ Lint clean

---

# 🚀 How to Run

## Backend

```bash
mvn clean install
mvn spring-boot:run
```

## Frontend

```bash
npm install
npm start
```

---

# 🗄️ Database Configuration

Update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/peak
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
```

---

# 🚀 Production Readiness Upgrades

Peak has been recently upgraded to meet modern production standards. Below are the key improvements:

#### Phase 1: Security & Ownership
* **JWT Authentication:** Implemented Spring Security using BCrypt password hashing and stateless JSON Web Tokens.
* **Role-Based Access Control (RBAC):** Tightened endpoints utilizing `@PreAuthorize` to ensure only `TRAINER` accounts can create and assign workout plans.
* **Service-Level Ownership Verification:** Secured PUT/DELETE operations to ensure users can only modify workout plans they successfully created.

#### Phase 2: Structural Integrity
* **Flyway Migrations:** Replaced unpredictable Hibernate `ddl-auto: update` behaviors with deterministic SQL schema version control (baseline `V1__init_schema.sql`).
* **Soft-Deletes:** Converted direct `DELETE FROM` SQL commands to use `isActive` flags (soft deletes) on Users and WorkoutPlans, preserving historical progress logs and referential integrity.
* **Pagination (Prev/Next):** Scaled list-fetching API calls by converting `/api/workout-plans` and `/users` to use Spring Data REST `Pageable` parameters, supported strictly by updated React views to handle large volumes gracefully without triggering Memory Leaks.

---

# 🎓 Academic Context

This project was developed as part of an academic curriculum to demonstrate:

* Full-stack application development
* Enterprise-level REST API design
* Database modeling & relationships
* Validation and global error handling
* Frontend state management
* Automated testing practices
* Structured implementation planning

---

# 📜 License

This project is developed strictly for **academic and educational purposes**.

---
