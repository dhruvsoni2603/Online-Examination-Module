package com.oem.backend.dto;

public record QuestionDTO(
    String id,
    String text,
    String category,
    String type,
    String difficultyLevel,
    Integer marks,
    String referenceAnswer,
    String imageUrl
) {}