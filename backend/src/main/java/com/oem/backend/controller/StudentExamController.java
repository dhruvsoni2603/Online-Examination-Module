package com.oem.backend.controller;

import com.oem.backend.dto.StudentExamDTO;
import com.oem.backend.model.StudentExam;
import com.oem.backend.service.StudentExamService;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "${frontend_url}")
//@PreAuthorize("hasRole('admin')")
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

    @GetMapping("/exam/{examId}")
    public List<String> getStudentExamsByExamId(@PathVariable UUID examId) {
        return studentExamService.getStudentExamsByExamId(examId);
    }

    @GetMapping("/student/{studentId}")
    public StudentExamDTO getStudentExamsByStudentId(@PathVariable UUID studentId) {
        return studentExamService.getStudentExamByStudentId(studentId);
    }

    @PostMapping
    public StudentExam createStudentExam(@RequestBody StudentExam studentExam) {
        return studentExamService.createStudentExam(studentExam);
    }

    // request body is a json object with a key "status" and value
    @PatchMapping("/{id}")
    public ResponseEntity<StudentExam> updateStudentExamStatus(@PathVariable UUID id, @RequestBody JSONObject status) {
        StudentExam studentExam = studentExamService.updateStudentExamStatus(id, (String) status.get("status"));
        return ResponseEntity.ok(studentExam);
    }
}
