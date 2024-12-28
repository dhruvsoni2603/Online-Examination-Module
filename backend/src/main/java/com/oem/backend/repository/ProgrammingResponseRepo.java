package com.oem.backend.repository;

import com.oem.backend.model.ProgrammingResponse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ProgrammingResponseRepo extends JpaRepository<ProgrammingResponse, UUID> {
    List<ProgrammingResponse> findByStudentExamId(UUID studentExamId);
}

