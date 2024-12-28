package com.oem.backend.controller;

import com.oem.backend.dto.AdminRegisterDTO;
import com.oem.backend.dto.StudentRegisterDTO;
import com.oem.backend.dto.UserRegisterDTO;
import com.oem.backend.model.User;
import com.oem.backend.service.AdminService;
import com.oem.backend.service.StudentService;
import com.oem.backend.service.UserService;
import com.oem.backend.util.JwtUtil;
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

    private final UserService userService;
    @Autowired
    private JwtUtil jwtUtil;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        try {
            String token = userService.verifyUser(user);
            if (token == null) {
                response.put("error", "Invalid credentials or user not found");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
            response.put("success", true);
            response.put("token", token);

            String userId = userService.getUserByEmail(jwtUtil.extractEmail(token)).getId().toString();
            response.put("userId", userId);

            String role = userService.getUserByEmail(jwtUtil.extractEmail(token)).getRole();
            response.put("role", role);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("error", "Error during login: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // Student Registration
    @PostMapping("/student/register")
    public ResponseEntity<String> registerStudent(@RequestBody StudentRegisterDTO studentRegisterDTO) {
        try {
            String message = "";
            message += userService.registerUser(new UserRegisterDTO(studentRegisterDTO.getEmail(), studentRegisterDTO.getPassword(), "student"));
            message += " ";
            message += studentService.registerStudent(studentRegisterDTO);

            return ResponseEntity.status(HttpStatus.CREATED).body(message);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error during registration: " + e.getMessage());
        }
    }

    // Admin Registration
    @PostMapping("/admin/register")
    public ResponseEntity<String> registerAdmin(@RequestBody AdminRegisterDTO adminRegisterDTO) {
        try {
            String message = "";
            message += adminService.registerAdmin(adminRegisterDTO);
            message += " ";
            message += userService.registerUser(new UserRegisterDTO(adminRegisterDTO.getEmail(), adminRegisterDTO.getPassword(), "admin"));

            return ResponseEntity.status(HttpStatus.CREATED).body(message);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error during registration: " + e.getMessage());
        }
    }
}
