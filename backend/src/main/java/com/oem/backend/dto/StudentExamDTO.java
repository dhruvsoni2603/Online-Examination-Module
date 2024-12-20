package com.oem.backend.dto;

import java.time.LocalDateTime;

public record StudentExamDTO(
    String id,
    String studentId,
    String examId,
    LocalDateTime startTime,
    LocalDateTime endTime,
    Integer score,
    String status,
    String sessionToken,
    LocalDateTime lastPing,
    boolean isDisconnected,
    Integer disconnectCount,
    Integer remainingTime
) {}