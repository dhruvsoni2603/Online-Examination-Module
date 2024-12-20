package com.oem.backend.dto;

public record ExamQuestionDTO(
    String id,
    String examId,
    String questionId
) {}