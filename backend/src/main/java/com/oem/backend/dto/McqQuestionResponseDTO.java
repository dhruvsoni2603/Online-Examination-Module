package com.oem.backend.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class McqQuestionResponseDTO {
    private String id;
    private String text;
    private String category;
    private String type; // Should be "MCQ" for this DTO
    private String difficultyLevel;
    private Integer marks;
    private String referenceAnswer;
    private List<McqOptionDTO> options; // List of MCQ options to be associated with the question
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
