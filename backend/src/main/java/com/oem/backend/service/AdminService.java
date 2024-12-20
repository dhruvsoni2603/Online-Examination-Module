package com.oem.backend.service;

import com.oem.backend.model.Admin;
import com.oem.backend.repository.AdminRepo;
import com.oem.backend.util.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

//@RequiredArgsConstructor
@Service
public class AdminService {

    private final AuthenticationManager authManager;

    private final JwtUtil jwtUtil;

    private final AdminRepo adminRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);

    public AdminService(AuthenticationManager authManager, JwtUtil jwtUtil, AdminRepo adminRepository) {
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
        this.adminRepository = adminRepository;

    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Optional<Admin> getAdminById(UUID id) {
        return adminRepository.findById(id);
    }

    // Get Admin by email
    public Admin getAdminByEmail(String email) {
        return adminRepository.findByEmail(email);
    }

    public String updateAdmin(UUID id, Admin admin) {
        admin.setId(id);
        adminRepository.save(admin);
        return "Admin updated successfully";
    }

    public void deleteAdmin(UUID id) {
        adminRepository.deleteById(id);
    }

    public String registerAdmin(Admin admin) {
        admin.setPassword(bCryptPasswordEncoder.encode(admin.getPassword()));
        adminRepository.save(admin);
        return "Admin registered";
    }

    public String verifyAdmin(Admin admin) {
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(admin.getEmail(), admin.getPassword())
        );

        if (authentication.isAuthenticated()) {
            return jwtUtil.generateToken(admin.getEmail());
        } else {
            return "User not authenticated";
        }
    }
}
