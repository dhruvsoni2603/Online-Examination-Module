package com.oem.backend.service;

import com.oem.backend.dto.StudentRegisterDTO;
import com.oem.backend.model.Student;
import com.oem.backend.model.User;
import com.oem.backend.repository.StudentRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StudentService {

    private final StudentRepo studentRepository;
    private final UserService userService;

    public StudentService(StudentRepo studentRepository, UserService userService) {
        this.studentRepository = studentRepository;
        this.userService = userService;
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

    public String registerStudent(StudentRegisterDTO studentRegisterDTO) {
        User user = userService.getUserByEmail(studentRegisterDTO.getEmail());

        studentRepository.save(new Student(
                studentRegisterDTO.getStudentId(),
                studentRegisterDTO.getName(),
                studentRegisterDTO.getEmail(),
                studentRegisterDTO.getPassword(),
                studentRegisterDTO.getCollegeName(),
                studentRegisterDTO.getBranch(),
                studentRegisterDTO.getPhone(),
                user
        ));
        return "Student registered";
    }
}
