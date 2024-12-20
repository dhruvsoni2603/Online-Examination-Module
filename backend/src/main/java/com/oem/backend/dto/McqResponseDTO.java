package com.oem.backend.dto;

public record McqResponseDTO(
    String id,
    String studentExamId,
    String questionId,
    String selectedOptionId,
    Integer timeSpent,
    Integer marks
) {}