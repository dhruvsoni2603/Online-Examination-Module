package com.oem.backend.controller;

import com.oem.backend.dto.ExamResultDTO;
import com.oem.backend.service.ExamResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "${frontend_url}")
@PreAuthorize("hasRole('admin')")
@RequestMapping("/api/exam-results")
public class ExamResultController {

    @Autowired
    private ExamResultService examResultService;

    @GetMapping
    public List<ExamResultDTO> getExamResults() {
        return examResultService.getAllExamResults();
    }

    @GetMapping("/exam/{examId}")
    public ExamResultDTO getExamResultByExamId(@PathVariable String examId) {
        return examResultService.getExamResult(UUID.fromString(examId));
    }
}
