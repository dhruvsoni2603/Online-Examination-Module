package com.oem.backend.repository;

import com.oem.backend.model.McqOption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface McqOptionRepo extends JpaRepository<McqOption, UUID> {
    List<McqOption> findByQuestionId(UUID questionId);
}