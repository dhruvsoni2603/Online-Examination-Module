package com.oem.backend.dto;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProgrammingResponseDTO {
    private String studentExamId;
    private String questionId;
    private String answer;
    private String language;
}