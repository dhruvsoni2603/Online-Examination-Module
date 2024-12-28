package com.oem.backend.repository;

import com.oem.backend.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AdminRepo extends JpaRepository<Admin, UUID> {
    // Additional query methods if needed
    Admin findByEmail(String email);
}

