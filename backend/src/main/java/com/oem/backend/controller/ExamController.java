package com.oem.backend.controller;

import com.oem.backend.dto.ExamCreationDTO;
import com.oem.backend.dto.ExamDTO;
import com.oem.backend.model.Admin;
import com.oem.backend.model.Exam;
import com.oem.backend.service.AdminService;
import com.oem.backend.service.ExamService;
import com.oem.backend.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
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
@RequestMapping("/api/exams")
public class ExamController {

    @Autowired
    private ExamService examService;

    @Autowired
    private AdminService adminService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public List<ExamDTO> getAllExams() {
        return examService.getAllExams();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExamDTO> getExamById(@PathVariable UUID id) {
        Optional<ExamDTO> exam = examService.getExamById(id);
        return exam.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<String> createExam(@RequestBody ExamCreationDTO examCreationDTO, HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        String email = jwtUtil.extractEmail(token);
        Admin admin = adminService.getAdminByEmail(email);

//        System.out.println(admin.getId().toString());

        examCreationDTO.setCreatedBy(admin.getId().toString());
        Exam createdExam = examService.createExam(examCreationDTO);
        return ResponseEntity.ok(createdExam.getId().toString());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExamDTO> updateExam(@PathVariable UUID id, @RequestBody ExamCreationDTO examCreationDTO) {
        if (examService.getExamById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(examService.updateExam(id, examCreationDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExam(@PathVariable UUID id) {
        if (examService.getExamById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        examService.deleteExam(id);
        return ResponseEntity.noContent().build();
    }
}
