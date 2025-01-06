package com.oem.backend.service;

import com.oem.backend.dto.ProgrammingResponseDTO;
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
    @Autowired
    private StudentExamService studentExamService;
    @Autowired
    private QuestionService questionService;

    public List<ProgrammingResponse> getResponsesByStudentExamId(UUID studentExamId) {
        return programmingResponseRepository.findByStudentExamId(studentExamId);
    }

    public List<String> createProgrammingResponse(List<ProgrammingResponseDTO> programmingResponseDTOs) {
        return programmingResponseDTOs.stream().map(programmingResponseDTO -> {
            ProgrammingResponse programmingResponse = new ProgrammingResponse();
            programmingResponse.setStudentExam(studentExamService.getStudentExamById(UUID.fromString(programmingResponseDTO.getStudentExamId())));
            programmingResponse.setQuestion(questionService.getQuestionById(UUID.fromString(programmingResponseDTO.getQuestionId())).orElse(null));
            programmingResponse.setAnswer(programmingResponseDTO.getAnswer());
            programmingResponse.setLanguage(programmingResponseDTO.getLanguage());

            programmingResponse = programmingResponseRepository.save(programmingResponse);
            return programmingResponse.getId().toString();
        }).toList();
    }

    public List<ProgrammingResponseDTO> getResponsesByQuestionId(String questionId) {
        List<ProgrammingResponse> programmingResponses = programmingResponseRepository.findByQuestionId(UUID.fromString(questionId));
        return programmingResponses.stream().map(programmingResponse -> {
            ProgrammingResponseDTO programmingResponseDTO = new ProgrammingResponseDTO();
            programmingResponseDTO.setStudentExamId(programmingResponse.getStudentExam().getId().toString());
            programmingResponseDTO.setQuestionId(programmingResponse.getQuestion().getId().toString());
            programmingResponseDTO.setAnswer(programmingResponse.getAnswer());
            programmingResponseDTO.setLanguage(programmingResponse.getLanguage());
            return programmingResponseDTO;
        }).toList();
    }
}