package com.oem.backend.controller;

import com.oem.backend.model.Admin;
import com.oem.backend.model.Student;
import com.oem.backend.service.AdminService;
import com.oem.backend.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "${frontend_url}")
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private AdminService adminService;

    // Student Registration
    @PostMapping("/student/register")
    public ResponseEntity<String> registerStudent(@RequestBody Student student) {
        try {
            String message = studentService.registerStudent(student);
            return ResponseEntity.status(HttpStatus.CREATED).body(message);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error during registration: " + e.getMessage());
        }
    }

    // Student Login
    @PostMapping("/student/login")
    public ResponseEntity<Map<String, Object>> loginStudent(@RequestBody Student student) {
        return handleLogin(student, "student");
    }

    // Admin Registration
    @PostMapping("/admin/register")
    public ResponseEntity<String> registerAdmin(@RequestBody Admin admin) {
        try {
            String message = adminService.registerAdmin(admin);
            return ResponseEntity.status(HttpStatus.CREATED).body(message);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error during registration: " + e.getMessage());
        }
    }

    // Admin Login
    @PostMapping("/admin/login")
    public ResponseEntity<Map<String, Object>> loginAdmin(@RequestBody Admin admin) {
        return handleLogin(admin, "admin");
    }

    // Common login handler
    private <T> ResponseEntity<Map<String, Object>> handleLogin(T user, String role) {
        Map<String, Object> response = new HashMap<>();
        try {
            String token;
            if (role.equals("student")) {
                token = studentService.verifyStudent((Student) user);
                if (token == null) {
                    response.put("error", "Invalid credentials or user not found");
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
                }
                response.put("user", studentService.getStudentByEmail(((Student) user).getEmail()));
            } else {
                token = adminService.verifyAdmin((Admin) user);
                if (token == null) {
                    response.put("error", "Invalid credentials or user not found");
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
                }
                response.put("user", adminService.getAdminByEmail(((Admin) user).getEmail()));
            }
            response.put("success", true);
            response.put("token", token);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("error", "Error during login: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
