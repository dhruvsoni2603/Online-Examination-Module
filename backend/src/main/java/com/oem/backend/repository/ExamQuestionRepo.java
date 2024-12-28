package com.oem.backend.repository;

import com.oem.backend.model.ExamQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ExamQuestionRepo extends JpaRepository<ExamQuestion, UUID> {
    List<ExamQuestion> findByExamId(UUID examId);
}