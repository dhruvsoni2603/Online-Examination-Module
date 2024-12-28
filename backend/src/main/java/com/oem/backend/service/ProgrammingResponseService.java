package com.oem.backend.service;

import com.oem.backend.model.ProgrammingResponse;
import com.oem.backend.repository.ProgrammingResponseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProgrammingResponseService {

    @Autowired
    private ProgrammingResponseRepo programmingResponseRepository;

    public List<ProgrammingResponse> getResponsesByStudentExamId(UUID studentExamId) {
        return programmingResponseRepository.findByStudentExamId(studentExamId);
    }

    public ProgrammingResponse createProgrammingResponse(ProgrammingResponse response) {
        return programmingResponseRepository.save(response);
    }
}