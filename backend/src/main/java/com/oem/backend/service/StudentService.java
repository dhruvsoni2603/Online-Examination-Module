package com.oem.backend.service;

import com.oem.backend.dto.StudentRegisterDTO;
import com.oem.backend.model.Student;
import com.oem.backend.repository.StudentRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StudentService {

    private final StudentRepo studentRepository;

    public StudentService(StudentRepo studentRepository) {
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

    public String registerStudent(StudentRegisterDTO studentRegisterDTO) {
        studentRepository.save(new Student(
                studentRegisterDTO.getStudentId(),
                studentRegisterDTO.getName(),
                studentRegisterDTO.getEmail(),
                studentRegisterDTO.getCollegeName(),
                studentRegisterDTO.getBranch(),
                studentRegisterDTO.getPhone()
        ));
        return "Student registered";
    }
}
