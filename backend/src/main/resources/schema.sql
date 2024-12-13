-- Table: users (Create table if not exists) ACCORDING TO MS SQL SERVER
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
BEGIN
    CREATE TABLE users
    (
--         id    UNIQUEIDENTIFIER PRIMARY KEY,
        id    UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(), -- UUID
        name  NVARCHAR(100) NOT NULL,
        email NVARCHAR(100) NOT NULL UNIQUE,
        password NVARCHAR(255) NOT NULL,                                  -- Store hashed passwords
        img_url NVARCHAR(255),                                            -- Optional profile image URL
        role  NVARCHAR(50) NOT NULL CHECK (role IN ('admin', 'student')) -- Simulate ENUM
    );
END;

-- Table: exams
CREATE TABLE exams
(
    id              UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(), -- UUID
    title           NVARCHAR(200)    NOT NULL,
    description     NVARCHAR(MAX),
    createdAt       DATETIME2 DEFAULT GETDATE(),
    duration        INT              NOT NULL,    -- Duration in minutes
    passingCriteria INT              NOT NULL,
    createdBy       UNIQUEIDENTIFIER NOT NULL,    -- Reference to users.id
    FOREIGN KEY (createdBy) REFERENCES users (id)
);

-- Table: questions
CREATE TABLE questions
(
    id               UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    text             NVARCHAR(MAX) NOT NULL,
    category         NVARCHAR(50)  NOT NULL CHECK (category IN ('Logical', 'Technical', 'Programming')), -- Simulate ENUM
    type             NVARCHAR(50)  NOT NULL CHECK (type IN ('MCQ', 'Programming')),                      -- Simulate ENUM
    difficulty_level NVARCHAR(50)  NOT NULL CHECK (difficulty_level IN ('easy', 'medium', 'hard')),      -- Simulate ENUM
    reference_answer NVARCHAR(MAX),                                                                      -- Optional
    image_url        NVARCHAR(255),                                                                      -- Optional
    createdAt        DATETIME2 DEFAULT GETDATE()
);

-- Table: exam_questions (Junction table for exams and questions)
CREATE TABLE exam_questions
(
    id         UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(), -- UUID
    examId     UNIQUEIDENTIFIER NOT NULL,    -- Reference to exams.id
    questionId UNIQUEIDENTIFIER NOT NULL,    -- Reference to questions.id
    FOREIGN KEY (examId) REFERENCES exams (id),
    FOREIGN KEY (questionId) REFERENCES questions (id)
);

-- Table: mcq_options
CREATE TABLE mcq_options
(
    id         UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(), -- UUID
    questionId UNIQUEIDENTIFIER NOT NULL,    -- Reference to questions.id
    text       NVARCHAR(255)    NOT NULL,
    isCorrect  BIT              NOT NULL,    -- Boolean in SQL Server
    image_url  NVARCHAR(255),                -- Optional
    FOREIGN KEY (questionId) REFERENCES questions (id)
);

-- Table: student_exams
CREATE TABLE student_exams
(
    id        UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(), -- UUID
    studentId UNIQUEIDENTIFIER NOT NULL,                                                               -- Reference to users.id
    examId    UNIQUEIDENTIFIER NOT NULL,                                                               -- Reference to exams.id
    startTime DATETIME2,
    endTime   DATETIME2,
    score     INT,
    status    NVARCHAR(50)     NOT NULL CHECK (status IN ('completed', 'in-progress', 'not-started')), -- Simulate ENUM
    FOREIGN KEY (studentId) REFERENCES users (id),
    FOREIGN KEY (examId) REFERENCES exams (id)
);

-- Table: mcq_responses
CREATE TABLE mcq_responses
(
    id               UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(), -- UUID
    studentExamId    UNIQUEIDENTIFIER NOT NULL,    -- Reference to student_exams.id
    questionId       UNIQUEIDENTIFIER NOT NULL,    -- Reference to questions.id
    selectedOptionId UNIQUEIDENTIFIER,             -- Reference to mcq_options.id
    FOREIGN KEY (studentExamId) REFERENCES student_exams (id),
    FOREIGN KEY (questionId) REFERENCES questions (id),
    FOREIGN KEY (selectedOptionId) REFERENCES mcq_options (id)
);

-- Table: programming_responses
CREATE TABLE programming_responses
(
    id            UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(), -- UUID
    studentExamId UNIQUEIDENTIFIER NOT NULL,    -- Reference to student_exams.id
    questionId    UNIQUEIDENTIFIER NOT NULL,    -- Reference to questions.id
    answer        NVARCHAR(MAX)    NOT NULL,    -- Code written by the student
    FOREIGN KEY (studentExamId) REFERENCES student_exams (id),
    FOREIGN KEY (questionId) REFERENCES questions (id)
);
