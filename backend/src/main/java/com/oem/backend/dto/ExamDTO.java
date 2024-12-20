package com.oem.backend.dto;

import java.time.LocalDateTime;

public record ExamDTO(
    String id,
    String title,
    String description,
    Integer duration,
    Integer passingCriteria,
    String createdBy, // Admin ID
    LocalDateTime startingAt,
    LocalDateTime createdAt
) {}