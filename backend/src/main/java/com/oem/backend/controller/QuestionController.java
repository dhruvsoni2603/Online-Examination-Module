package com.oem.backend.controller;

import com.oem.backend.dto.McqQuestionDTO;
import com.oem.backend.dto.McqQuestionResponseDTO;
import com.oem.backend.model.Question;
import com.oem.backend.service.ExamQuestionService;
import com.oem.backend.service.McqOptionService;
import com.oem.backend.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "${frontend_url}")
@PreAuthorize("hasRole('admin')")
@RequestMapping("/api/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private McqOptionService mcqOptionService;

    @Autowired
    private ExamQuestionService examQuestionService;

    @GetMapping
    public List<McqQuestionResponseDTO> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    @GetMapping("/type/{type}")
    public List<Question> getAllQuestionsByType(@PathVariable String type) {
        return questionService.getAllQuestionsByType(type);
    }

    @GetMapping("/category/{category}")
    public List<Question> getAllQuestionsByCategory(@PathVariable String category) {
        return questionService.getAllQuestionsByCategory(category);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable UUID id) {
        Optional<Question> question = questionService.getQuestionById(id);
        return question.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Question createQuestion(@RequestBody Question question) {
        return questionService.createQuestion(question);
    }

    @PostMapping("/mcq")
    public String createMcqQuestion(@RequestBody McqQuestionDTO mcqQuestionDTO) {
//        System.out.println(mcqQuestionDTO);
        return questionService.createMcqQuestion(mcqQuestionDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Question> updateQuestion(@PathVariable UUID id, @RequestBody Question question) {
        if (questionService.getQuestionById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(questionService.updateQuestion(id, question));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable UUID id) {
        if (questionService.getQuestionById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        examQuestionService.getExamQuestionsByQuestionId(id).forEach(examQuestion -> examQuestionService.deleteExamQuestion(examQuestion.getId()));
        mcqOptionService.getMcqOptionsByQuestionId(id).forEach(mcqOption -> mcqOptionService.deleteMcqOption(mcqOption.getId()));
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }
}
