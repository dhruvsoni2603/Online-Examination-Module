package com.oem.backend.dto;

public record McqOptionDTO(
    String id,
    String questionId,
    String text,
    boolean isCorrect,
    String imageUrl
) {}