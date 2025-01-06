package com.oem.backend.dto;

import com.oem.backend.model.McqResponse;
import lombok.*;

import java.util.List;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PassedStudentsDTO {
    private String studentId;
    private String studentName;
    private Integer score;
    private List<McqResponse> mcqResponses;
    private List<ResultProgrammingResponseDTO> programmingResponses;
}
