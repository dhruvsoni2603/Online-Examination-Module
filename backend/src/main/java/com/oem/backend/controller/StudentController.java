package com.oem.backend.controller;

import com.oem.backend.dto.StudentRegisterDTO;
import com.oem.backend.dto.UserRegisterDTO;
import com.oem.backend.model.Student;
import com.oem.backend.model.User;
import com.oem.backend.service.StudentService;
import com.oem.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private UserService userService;

    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable UUID id) {
        Optional<Student> student = studentService.getStudentById(id);
        return student.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Student> getStudentByEmail(@PathVariable String email) {
        Student student = studentService.getStudentByEmail(email);
        return ResponseEntity.ok(student);
    }

    // Student Registration
    @PostMapping("/register")
    public ResponseEntity<String> registerStudent(@RequestBody StudentRegisterDTO studentRegisterDTO) {
        try {
            if (userService.getUserByEmail(studentRegisterDTO.getEmail()) != null) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
            }

            String message = "";
            message += userService.registerUser(new UserRegisterDTO(studentRegisterDTO.getEmail(), studentRegisterDTO.getPassword(), "student"));
            message += " ";
            message += studentService.registerStudent(studentRegisterDTO);

            return ResponseEntity.status(HttpStatus.CREATED).body(message);
        } catch (Exception e) {
            if (e.getMessage().contains("ConstraintViolationException")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Error during registration: " + e.getMessage());
            }
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateStudent(@PathVariable UUID id, @RequestBody Student student) {
        if (studentService.getStudentById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        User user = studentService.getStudentById(id).get().getUser();
        student.setUser(user);
        return ResponseEntity.ok(studentService.updateStudent(id, student));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable UUID id) {
        if (studentService.getStudentById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        User user = studentService.getStudentById(id).get().getUser();
        studentService.deleteStudent(id);
        userService.deleteUser(user.getId());
        return ResponseEntity.noContent().build();
    }
}
