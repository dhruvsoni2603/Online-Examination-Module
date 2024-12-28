package com.oem.backend.repository;

import com.oem.backend.model.McqResponse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface McqResponseRepo extends JpaRepository<McqResponse, UUID> {
    List<McqResponse> findByStudentExamId(UUID studentExamId);
}
