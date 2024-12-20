package com.oem.backend.repository;

import com.oem.backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface StudentRepo extends JpaRepository<Student, UUID> {
    // Additional query methods if needed
    Student findByEmail(String email);
}
