# Pre-Internship Assignment

## Project Overview
This project is designed to manage online exams, with user authentication, question management (MCQ and programming), and exam creation functionalities. The project is structured using Spring Boot for the backend and React for the frontend.

## Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Branches](#branches)
- [Features](#features)
- [Contributing](#contributing)

## Tech Stack
- **Frontend:** React, JavaScript, HTML, CSS
- **Backend:** Spring Boot, Java
- **Database:** MySQL

## Setup Instructions

1. **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/your-repo-name.git
    ```
2. **Switch to the dev branch**
    ```bash
    git checkout dev
    ```

3. **Frontend Setup**
   - Navigate to the frontend directory and install dependencies:
     ```bash
     cd frontend
     npm install
     ```
   - Start the frontend server:
     ```bash
     npm start
     ```

4. **Backend Setup**
   - Navigate to the backend directory and install dependencies:
     ```bash
     cd backend
     ```
   - Start the Spring Boot application:
     ```bash
     ./mvnw spring-boot:run
     ```

5. **Database Setup**
   - Create a MySQL database named `exam_management`.
   - Configure database settings in `application.properties` or `application.yml`.

## Branches
- **main**: Stable production-ready code.
- **dev**: Development branch.
- **feature/react-setup**: React frontend setup and configuration.
- **feature/springboot-setup**: Spring Boot backend setup.
- **feature/user-auth**: User authentication and authorization.
- **feature/question-management**: Management of MCQ and programming questions.
- **feature/exam-creation**: Exam creation and management functionalities.
- **feature/exam-interface**: Exam-taking interface and submission logic.

## Features
- **User Authentication**: Login and role-based access.
- **Question Management**: CRUD operations for MCQ and programming questions.
- **Exam Creation**: Create and schedule exams.
- **Exam Interface**: User interface for taking exams with auto-submit.

## Contributing
1. Clone the repository.
2. Create a feature branch.
3. Make your changes and commit them.
4. Push your changes and create a pull request.

---

### Notes
Add additional details as the project evolves, such as testing and deployment instructions.

---

### GitHub Repository Link
[Your Repository Link](https://github.com/yourusername/your-repo-name)
