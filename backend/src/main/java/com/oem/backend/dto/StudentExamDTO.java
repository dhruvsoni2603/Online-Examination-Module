package com.oem.backend.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class StudentExamDTO {
    private String id;
    private String examId;
    private String studentId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer score;
    private String status;
    private String sessionToken;
    private LocalDateTime lastPing;
    private boolean isDisconnected;
    private Integer disconnectCount;
    private Integer remainingTime;
    private List<QuestionDTO> questions;
}