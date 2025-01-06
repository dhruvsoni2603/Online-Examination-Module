package com.oem.backend.controller;

import com.oem.backend.dto.ProgrammingResponseDTO;
import com.oem.backend.model.ProgrammingResponse;
import com.oem.backend.service.ProgrammingResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "${frontend_url}")
//@PreAuthorize("hasRole('student')")
@RequestMapping("/api/programming-responses")
public class ProgrammingResponseController {

    @Autowired
    private ProgrammingResponseService programmingResponseService;

    @GetMapping
    public ResponseEntity<List<ProgrammingResponse>> getResponsesByStudentExamId(@RequestParam UUID studentExamId) {
        List<ProgrammingResponse> programmingResponses = programmingResponseService.getResponsesByStudentExamId(studentExamId);
        return ResponseEntity.ok(programmingResponses);
    }

    @PostMapping
    public ResponseEntity<List<String>> createProgrammingResponse(@RequestBody List<ProgrammingResponseDTO> programmingResponseDTOs) {
        List<String> responseIds = programmingResponseService.createProgrammingResponse(programmingResponseDTOs);
        return ResponseEntity.ok(responseIds);
    }
}
