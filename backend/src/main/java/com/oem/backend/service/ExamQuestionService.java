package com.oem.backend.service;

import com.oem.backend.model.ExamQuestion;
import com.oem.backend.repository.ExamQuestionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ExamQuestionService {

    @Autowired
    private ExamQuestionRepo examQuestionRepository;

    public List<ExamQuestion> getAllExamQuestions() {
        return examQuestionRepository.findAll();
    }

    public Optional<ExamQuestion> getExamQuestionById(UUID id) {
        return examQuestionRepository.findById(id);
    }

    public ExamQuestion createExamQuestion(ExamQuestion examQuestion) {
        return examQuestionRepository.save(examQuestion);
    }

    public void deleteExamQuestion(UUID id) {
        examQuestionRepository.deleteById(id);
    }
}
