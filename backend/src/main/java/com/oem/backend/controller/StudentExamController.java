package com.oem.backend.controller;

import com.oem.backend.model.StudentExam;
import com.oem.backend.service.StudentExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "${frontend_url}")
@RequestMapping("/api/student-exams")
public class StudentExamController {

    @Autowired
    private StudentExamService studentExamService;

    @GetMapping
    public List<StudentExam> getAllStudentExams() {
        return studentExamService.getAllStudentExams();
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentExam> getStudentExamById(@PathVariable UUID id) {
        Optional<StudentExam> studentExam = Optional.ofNullable(studentExamService.getStudentExamById(id));
        return studentExam.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public StudentExam createStudentExam(@RequestBody StudentExam studentExam) {
        return studentExamService.createStudentExam(studentExam);
    }
}
