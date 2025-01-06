package com.oem.backend.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AdminRegisterDTO {
    private String name;
    private String email;
    private String password;
}
