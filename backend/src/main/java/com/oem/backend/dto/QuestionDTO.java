package com.oem.backend.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class QuestionDTO {
    private String text;
    private String category;
    private String type;
    private String difficultyLevel;
    private Integer marks;
    private String referenceAnswer;
    private String imageUrl;
}