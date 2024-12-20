package com.oem.backend.service;

import com.oem.backend.model.McqResponse;
import com.oem.backend.repository.McqResponseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class McqResponseService {

    @Autowired
    private McqResponseRepo mcqResponseRepository;

    public List<McqResponse> getResponsesByStudentExamId(UUID studentExamId) {
        return mcqResponseRepository.findByStudentExamId(studentExamId);
    }

    public McqResponse createMcqResponse(McqResponse mcqResponse) {
        return mcqResponseRepository.save(mcqResponse);
    }
}