package com.oem.backend.dto;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class McqResponseDTO{
    private String studentExamId;
    private String questionId;
    private String selectedOptionId;
}