package com.oem.backend.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ExamCreationDTO {
    private String title;
    private String description;
    private Integer duration;
    private Integer totalMarks;
    private Integer passingCriteria;
    private LocalDateTime startingAt;
    private String createdBy; // ID of the admin who created the exam
    private List<String> questionIds; // IDs of questions to associate with the exam
    private List<String> studentIds;  // IDs of students to assign the exam
}
