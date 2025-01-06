package com.oem.backend.dto;

import lombok.*;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ResultProgrammingResponseDTO {
    private String studentName;
    private String questionName;
    private String language;
    private String response;
}
