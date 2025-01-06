package com.oem.backend.dto;

import lombok.*;

import java.util.List;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProgrammingQuestionDTO {
    private String id;
    private String text;
    private String category;
    private String type; // Should be "PROGRAMMING" for this DTO
    private String difficultyLevel;
    private Integer marks;
    private String referenceAnswer;
    private List<ResultProgrammingResponseDTO> studentResponses; // List of student responses to be associated with the question
}
