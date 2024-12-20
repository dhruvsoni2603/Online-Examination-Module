package com.oem.backend.service;

import com.oem.backend.model.Student;
import com.oem.backend.repository.StudentRepo;
import com.oem.backend.util.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StudentService {

    private final AuthenticationManager authManager;

    private final JwtUtil jwtUtil;

    private final StudentRepo studentRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);

    public StudentService(AuthenticationManager authManager, JwtUtil jwtUtil, StudentRepo studentRepository) {
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
        this.studentRepository = studentRepository;
    }


    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Optional<Student> getStudentById(UUID id) {
        return studentRepository.findById(id);
    }

    public Student getStudentByEmail(String email) {
        return studentRepository.findByEmail(email);
    }

    public String updateStudent(UUID id, Student student) {
        student.setId(id);
        studentRepository.save(student);
        return "Student updated successfully";
    }

    public void deleteStudent(UUID id) {
        studentRepository.deleteById(id);
    }

    public String registerStudent(Student student) {
        student.setPassword(bCryptPasswordEncoder.encode(student.getPassword()));
        studentRepository.save(student);
        return "Student registered";
    }

    public String verifyStudent(Student student) {
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(student.getEmail(), student.getPassword())
        );

        if (authentication.isAuthenticated()) {
            return jwtUtil.generateToken(student.getEmail());
        } else {
            return "Student not authenticated";
        }
    }
}
