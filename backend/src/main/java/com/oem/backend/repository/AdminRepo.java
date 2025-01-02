package com.oem.backend.repository;

import com.oem.backend.model.Admin;
import com.oem.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AdminRepo extends JpaRepository<Admin, UUID> {
    // Additional query methods if needed
    Admin findByEmail(String email);

    List<Admin> user(User user);
}

