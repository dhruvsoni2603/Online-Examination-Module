package com.oem.backend.dto;

public record ProgrammingResponseDTO(
    String id,
    String studentExamId,
    String questionId,
    String answer,
    String language,
    Integer timeSpent,
    Integer marks
) {}