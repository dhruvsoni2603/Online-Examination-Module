# Online Examination Management System (OEM)

## Overview
The *Online Examination Management System* is a full-stack application designed to facilitate the creation, management, and evaluation of online exams. It supports both multiple-choice questions (MCQs) and programming assessments, providing features for both administrators and students. The system ensures a streamlined process for administering exams, tracking responses, and generating results efficiently.

---

## Features

### Admin Features
1. *User Management*:
   - Create and manage student profiles.
   - Register and authenticate admin accounts.
2. *Exam Management*:
   - Create and schedule exams with specified time limits and passing criteria.
   - Assign MCQs and programming questions to exams.
3. *Question Management*:
   - Add, edit, delete, and categorize questions (Logical, Technical, Programming).
   - Support for uploading images and reference answers.
4. *Result Analysis*:
   - View exam results with detailed analysis of student performance.
   - Export results for further processing.
5. *Security Enhancements*:
   - Session tracking and monitoring for student activities during exams.

### Student Features
1. *Exam Participation*:
   - View and take scheduled exams.
   - Submit responses for MCQs and programming questions.
2. *Real-Time Monitoring*:
   - Track remaining time during exams.
   - Save responses to avoid data loss on accidental refresh or disconnection.
3. *Result Viewing*:
   - View personal performance in completed exams.

---

## Technology Stack

### Backend
- *Framework*: Spring Boot
- *Database*: SQL Server
- *Authentication*: JWT for secure token-based authentication

### Frontend
- *Framework*: React.js (Vite-based setup)
- *Styling*: ShadCN UI for modern and responsive design
- *State Management*: Zustand
- *Data Management*: TanStack Query for efficient data fetching and caching

### Deployment
- *Frontend*: Deployed using Netlify or Vercel
- *Backend*: Deployed using Heroku or AWS

---

## Project Structure

### Backend
- *`src/main/java/com/oem/backend`*
  - `model`: Contains all JPA entities.
  - `repository`: Interfaces for database operations.
  - `service`: Business logic and core functionality.
  - `controller`: REST APIs for frontend interaction.
  - `config`: Application configuration, including security and JWT setup.

- *`src/main/resources`*
  - `application.properties`: Configuration for database, server, and JWT.
  - `schema.sql`: SQL schema for table creation.

### Frontend
- *`src`*
  - `components`: Reusable UI components (e.g., tables, modals, forms).
  - `contexts`: Context providers for authentication and exam data.
  - `pages`: Screens for login, admin dashboard, and student exam view.
  - `hooks`: Custom React hooks like `useAuth` and `useFetch`.
  - `services`: API wrappers and JWT utility functions.
  - `store`: Zustand-based global state management.

---

## API Endpoints

### Authentication
- *POST* `/api/auth/student/register`: Register a student.
- *POST* `/api/auth/admin/register`: Register an admin.
- *POST* `/api/auth/login`: Login and receive JWT.

### Questions
- *GET* `/api/questions`: Retrieve all questions.
- *POST* `/api/questions`: Add a new question.
- *PUT* `/api/questions/{id}`: Update a question.
- *DELETE* `/api/questions/{id}`: Delete a question.

### Exams
- *GET* `/api/exams`: Retrieve all exams.
- *POST* `/api/exams`: Create a new exam.
- *PUT* `/api/exams/{id}`: Update an exam.
- *DELETE* `/api/exams/{id}`: Delete an exam.

---

## Installation and Setup

### Prerequisites
1. *Backend*: Java 17, Maven, SQL Server
2. *Frontend*: Node.js, npm or yarn

### Steps
1. *Clone the repository*:
   ```bash
   git clone https://github.com/your-repo-url/oem.git
   cd oem
   ```

2. *Backend Setup*:
   - Navigate to the `backend` folder:
     ```bash
     cd backend
     ```
   - Configure `application.properties` for your database credentials.
   - Run the application:
     ```bash
     mvn spring-boot:run
     ```

3. *Frontend Setup*:
   - Navigate to the `frontend` folder:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```

4. *Access the Application*:
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend: [http://localhost:8080](http://localhost:8080)

---

## Contribution

Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push them to your branch.
4. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Acknowledgements
- *TanStack Query* for data management.
- *Zustand* for state management.
- *ShadCN UI* for elegant styling.
- Open-source libraries and the developer community.
