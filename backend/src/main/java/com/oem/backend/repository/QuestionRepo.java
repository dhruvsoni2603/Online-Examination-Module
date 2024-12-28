package com.oem.backend.repository;

import com.oem.backend.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface QuestionRepo extends JpaRepository<Question, UUID> {
    List<Question> findByCategory(String category);
    List<Question> findByType(String type);
}