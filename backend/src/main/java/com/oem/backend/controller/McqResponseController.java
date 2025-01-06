package com.oem.backend.controller;

import com.oem.backend.dto.McqResponseDTO;
import com.oem.backend.model.McqResponse;
import com.oem.backend.service.McqResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "${frontend_url}")
//@PreAuthorize("hasRole('student')")
@RequestMapping("/api/mcq-responses")
public class McqResponseController {

    @Autowired
    private McqResponseService mcqResponseService;

    @GetMapping
    public ResponseEntity<List<McqResponse>> getResponsesByStudentExamId(@RequestParam UUID studentExamId) {
        List<McqResponse> mcqResponses = mcqResponseService.getResponsesByStudentExamId(studentExamId);
        return ResponseEntity.ok(mcqResponses);
    }

    @PostMapping
    public ResponseEntity<List<String>> createMcqResponses(@RequestBody List<McqResponseDTO> mcqResponseDTOs) {
        List<String> responseIds = mcqResponseService.createMcqResponses(mcqResponseDTOs);
        return ResponseEntity.ok(responseIds);
    }
}
