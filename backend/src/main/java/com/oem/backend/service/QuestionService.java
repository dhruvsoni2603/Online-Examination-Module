package com.oem.backend.service;

import com.oem.backend.model.Question;
import com.oem.backend.repository.QuestionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepo questionRepository;

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Optional<Question> getQuestionById(UUID id) {
        return questionRepository.findById(id);
    }

    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    public Question updateQuestion(UUID id, Question question) {
        question.setId(id);
        return questionRepository.save(question);
    }

    public void deleteQuestion(UUID id) {
        questionRepository.deleteById(id);
    }
}
