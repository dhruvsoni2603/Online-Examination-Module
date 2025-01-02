package com.oem.backend.service;

import com.oem.backend.dto.McqOptionDTO;
import com.oem.backend.dto.McqQuestionDTO;
import com.oem.backend.dto.McqQuestionResponseDTO;
import com.oem.backend.model.McqOption;
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

    @Autowired
    private McqOptionService mcqOptionService;

    public List<McqQuestionResponseDTO> getAllQuestions() {
        List<Question> questions = questionRepository.findAll();
        return questions.stream().map(question -> {
            McqQuestionResponseDTO mcqQuestionResponseDTO = new McqQuestionResponseDTO();
            mcqQuestionResponseDTO.setId(question.getId().toString());
            mcqQuestionResponseDTO.setText(question.getText());
            mcqQuestionResponseDTO.setCategory(question.getCategory());
            mcqQuestionResponseDTO.setType(question.getType());
            mcqQuestionResponseDTO.setDifficultyLevel(question.getDifficultyLevel());
            mcqQuestionResponseDTO.setMarks(question.getMarks());
            mcqQuestionResponseDTO.setReferenceAnswer(question.getReferenceAnswer());
            mcqQuestionResponseDTO.setOptions(mcqOptionService.getOptionsByQuestionId(question.getId()));
            mcqQuestionResponseDTO.setCreatedAt(question.getCreatedAt());
            mcqQuestionResponseDTO.setUpdatedAt(question.getUpdatedAt());
            return mcqQuestionResponseDTO;
        }).toList();
    }

    public List<Question> getAllQuestionsByType(String type) {
        return questionRepository.findByType(type);
    }

    public List<Question> getAllQuestionsByCategory(String category) {
        return questionRepository.findByCategory(category);
    }

    public Optional<Question> getQuestionById(UUID id) {
        return questionRepository.findById(id);
    }

    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    public String createMcqQuestion(McqQuestionDTO mcqQuestionDTO) {
        // Create the question
        Question question = new Question();
        question.setText(mcqQuestionDTO.getText());
        question.setCategory(mcqQuestionDTO.getCategory());
        question.setType(mcqQuestionDTO.getType());
        question.setDifficultyLevel(mcqQuestionDTO.getDifficultyLevel());
        question.setMarks(mcqQuestionDTO.getMarks());

        Question savedQuestion = questionRepository.save(question);

        // Map and save MCQ options
        if ("MCQ".equalsIgnoreCase(mcqQuestionDTO.getType())) {
            for (McqOptionDTO option : mcqQuestionDTO.getOptions()) {
                McqOption mcqOption = new McqOption();
                mcqOption.setQuestion(savedQuestion);
                mcqOption.setText(option.getText());
                mcqOption.setCorrect(option.isCorrect());
                mcqOptionService.createMcqOption(mcqOption);
            }
        }

        return "Question created successfully";
    }

    public Question updateQuestion(UUID id, Question question) {
        question.setId(id);
        return questionRepository.save(question);
    }

    public void deleteQuestion(UUID id) {
        questionRepository.deleteById(id);
    }
}
