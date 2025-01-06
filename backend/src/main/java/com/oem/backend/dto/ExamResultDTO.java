package com.oem.backend.dto;

import lombok.*;

import java.util.List;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ExamResultDTO {
    private String examId;
    private String title;
    private String description;
    private List<ResultMcqQuestionDTO> mcqQuestions;
    private List<ProgrammingQuestionDTO> programmingQuestions;
    private List<PassedStudentsDTO> passedStudents;
}
