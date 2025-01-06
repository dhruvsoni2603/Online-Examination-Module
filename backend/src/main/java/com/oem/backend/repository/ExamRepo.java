package com.oem.backend.repository;

import com.oem.backend.model.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ExamRepo extends JpaRepository<Exam, UUID> {
    List<Exam> findByCreatedById(UUID adminId);
}
