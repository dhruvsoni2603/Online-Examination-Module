package com.oem.backend.dto;

public record AdminDTO(
    String id,
    String name,
    String email,
    boolean verified
) {}