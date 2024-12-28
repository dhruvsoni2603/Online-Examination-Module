package com.oem.backend.repository;

import com.oem.backend.model.StudentExam;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface StudentExamRepo extends JpaRepository<StudentExam, UUID> {
    List<StudentExam> findByStudentId(UUID studentId);
    List<StudentExam> findByExamId(UUID examId);
}
