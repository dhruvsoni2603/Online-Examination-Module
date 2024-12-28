package com.oem.backend.service;

import com.oem.backend.dto.AdminRegisterDTO;
import com.oem.backend.model.Admin;
import com.oem.backend.repository.AdminRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

//@RequiredArgsConstructor
@Service
public class AdminService {

    private final AdminRepo adminRepository;

    public AdminService(AdminRepo adminRepository) {
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

    public String registerAdmin(AdminRegisterDTO adminRegisterDTO) {
        adminRepository.save(new Admin(
                adminRegisterDTO.getName(),
                adminRegisterDTO.getEmail()
        ));
        return "Admin registered";
    }
}
