package com.oem.backend.repository;

import com.oem.backend.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepo extends JpaRepository<Users, UUID> {

    Users findByUsername(String username);

}
