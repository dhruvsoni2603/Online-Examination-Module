package com.oem.backend.service;

import com.oem.backend.dto.McqResponseDTO;
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
    @Autowired
    private StudentExamService studentExamService;
    @Autowired
    private QuestionService questionService;
    @Autowired
    private McqOptionService mcqOptionService;

    public List<McqResponse> getResponsesByStudentExamId(UUID studentExamId) {
        return mcqResponseRepository.findByStudentExamId(studentExamId);
    }

    public List<String> createMcqResponses(List<McqResponseDTO> mcqResponseDTOs) {
        return mcqResponseDTOs.stream().map(mcqResponseDTO -> {
            McqResponse mcqResponse = new McqResponse();
            mcqResponse.setStudentExam(studentExamService.getStudentExamById(UUID.fromString(mcqResponseDTO.getStudentExamId())));
            mcqResponse.setQuestion(questionService.getQuestionById(UUID.fromString(mcqResponseDTO.getQuestionId())).orElse(null));
            mcqResponse.setSelectedOption(mcqOptionService.getMcqOptionById(UUID.fromString(mcqResponseDTO.getSelectedOptionId())));

            mcqResponse = mcqResponseRepository.save(mcqResponse);
            return mcqResponse.getId().toString();
        }).toList();
    }

    public List<McqResponse> getResponsesByOptionId(String selectedOptionId) {
        return mcqResponseRepository.findBySelectedOptionId(UUID.fromString(selectedOptionId));
    }
}