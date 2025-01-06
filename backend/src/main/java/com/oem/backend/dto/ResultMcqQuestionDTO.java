package com.oem.backend.dto;

import lombok.*;

import java.util.List;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ResultMcqQuestionDTO {
    private String questionId;
    private String text;
    private String category;
    private String type; // Should be "MCQ" for this DTO
    private String difficultyLevel;
    private Integer marks;
    private List<ResultMcqOptionDTO> options; // List of MCQ options to be associated with the question
}
