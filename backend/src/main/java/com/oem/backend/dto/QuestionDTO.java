package com.oem.backend.dto;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class QuestionDTO {
    private String id;
    private String text;
    private String category;
    private String type;
    private List<McqOptionResponseDTO> options;
}