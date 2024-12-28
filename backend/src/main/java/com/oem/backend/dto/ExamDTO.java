package com.oem.backend.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ExamDTO {
    private String id;
    private String title;
    private String description;
    private Integer duration;
    private Integer passingCriteria;
    private LocalDateTime startingAt;
    private String createdBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<String> questionIds;
    private List<String> studentIds;
}