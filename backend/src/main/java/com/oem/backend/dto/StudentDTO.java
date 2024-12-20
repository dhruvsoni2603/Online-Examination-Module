package com.oem.backend.dto;

public record StudentDTO(
    String id,
    String studentId,
    String name,
    String email,
    boolean verified,
    String collegeName,
    String branch,
    String phone
) {}