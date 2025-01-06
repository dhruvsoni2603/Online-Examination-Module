package com.oem.backend.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AdminDTO {
    private String id;
    private String name;
    private String email;
    private boolean verified;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}