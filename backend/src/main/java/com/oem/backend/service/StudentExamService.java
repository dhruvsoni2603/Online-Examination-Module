package com.oem.backend.service;

import com.oem.backend.model.StudentExam;
import com.oem.backend.repository.StudentExamRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class StudentExamService {

    @Autowired
    private StudentExamRepo studentExamRepository;

    public List<StudentExam> getAllStudentExams() {
        return studentExamRepository.findAll();
    }

    public List<StudentExam> getStudentExamsByExamId(UUID examId) {
        return studentExamRepository.findByExamId(examId);
    }

    // getStudentExamById
    public StudentExam getStudentExamById(UUID id) {
        return studentExamRepository.findById(id).orElse(null);
    }

    public List<StudentExam> getStudentExamsByStudentId(UUID studentId) {
        return studentExamRepository.findByStudentId(studentId);
    }

    public StudentExam createStudentExam(StudentExam studentExam) {
        return studentExamRepository.save(studentExam);
    }
}