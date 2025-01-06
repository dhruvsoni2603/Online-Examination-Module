package com.oem.backend.service;

import com.oem.backend.dto.AdminDTO;
import com.oem.backend.dto.AdminRegisterDTO;
import com.oem.backend.model.Admin;
import com.oem.backend.model.User;
import com.oem.backend.repository.AdminRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

//@RequiredArgsConstructor
@Service
public class AdminService {

    private final AdminRepo adminRepository;
    private final UserService userService;

    public AdminService(AdminRepo adminRepository, UserService userService) {
        this.adminRepository = adminRepository;
        this.userService = userService;
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Optional<Admin> getAdminById(UUID id) {
        return adminRepository.findById(id);
    }

    public Optional<AdminDTO> getAdminDTOById(UUID id) {
        Optional<Admin> admin = adminRepository.findById(id);
        AdminDTO adminDTO = new AdminDTO();
        admin.ifPresent(value -> {
            adminDTO.setId(value.getId().toString());
            adminDTO.setName(value.getName());
            adminDTO.setEmail(value.getEmail());
            adminDTO.setVerified(value.getUser().isVerified());
            adminDTO.setCreatedAt(value.getCreatedAt());
            adminDTO.setUpdatedAt(value.getUpdatedAt());
        });
        return Optional.of(adminDTO);
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
        User user = adminRepository.findById(id).get().getUser();

        if (user != null) {
            userService.deleteUser(user.getId());
        } else {
            System.out.println("User not found");
            return;
        }

        adminRepository.deleteById(id);
    }

    public String registerAdmin(AdminRegisterDTO adminRegisterDTO) {
        User user = userService.getUserByEmail(adminRegisterDTO.getEmail());
        if (user == null) {
            return "User not found";
        }
        adminRepository.save(new Admin(
                adminRegisterDTO.getName(),
                adminRegisterDTO.getEmail(),
                user
        ));
        return "Admin registered";
    }
}
