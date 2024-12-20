package com.oem.backend.service;

import com.oem.backend.model.Exam;
import com.oem.backend.repository.ExamRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ExamService {

    @Autowired
    private ExamRepo examRepository;

    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    public Optional<Exam> getExamById(UUID id) {
        return examRepository.findById(id);
    }

    public Exam createExam(Exam exam) {
        return examRepository.save(exam);
    }

    public Exam updateExam(UUID id, Exam exam) {
        exam.setId(id);
        return examRepository.save(exam);
    }

    public void deleteExam(UUID id) {
        examRepository.deleteById(id);
    }
}
