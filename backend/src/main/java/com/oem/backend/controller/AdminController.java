package com.oem.backend.controller;

import com.oem.backend.dto.AdminRegisterDTO;
import com.oem.backend.dto.UserRegisterDTO;
import com.oem.backend.model.Admin;
import com.oem.backend.model.User;
import com.oem.backend.service.AdminService;
import com.oem.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "${frontend_url}")
@PreAuthorize("hasRole('admin')")
@RequestMapping("/api/admins")
public class AdminController {

    private final AdminService adminService;
    private final UserService userService;

    public AdminController(AdminService adminService, UserService userService) {
        this.adminService = adminService;
        this.userService = userService;
    }

    @GetMapping
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Admin> getAdminById(@PathVariable UUID id) {
        Optional<Admin> admin = adminService.getAdminById(id);
        return admin.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Admin> getAdminByEmail(@PathVariable String email) {
        Admin admin = adminService.getAdminByEmail(email);
        return ResponseEntity.ok(admin);
    }

    // Admin Registration
    @PostMapping("/admin/register")
    public ResponseEntity<String> registerAdmin(@RequestBody AdminRegisterDTO adminRegisterDTO) {
        try {
            if (userService.getUserByEmail(adminRegisterDTO.getEmail()) != null) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
            }

            String message = "";
            message += userService.registerUser(new UserRegisterDTO(adminRegisterDTO.getEmail(), adminRegisterDTO.getPassword(), "admin"));
            message += " ";
            message += adminService.registerAdmin(adminRegisterDTO);

            return ResponseEntity.status(HttpStatus.CREATED).body(message);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error during registration: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateAdmin(@PathVariable UUID id, @RequestBody Admin admin) {
        if (adminService.getAdminById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        User user = adminService.getAdminById(id).get().getUser();
        admin.setUser(user);
        return ResponseEntity.ok(adminService.updateAdmin(id, admin));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable UUID id) {
        if (adminService.getAdminById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        User user = adminService.getAdminById(id).get().getUser();
        adminService.deleteAdmin(id);
        userService.deleteUser(user.getId());
        return ResponseEntity.noContent().build();
    }
}
