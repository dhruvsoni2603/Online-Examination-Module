package com.oem.backend.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class StudentRegisterDTO {
    private String studentId;
    private String name;
    private String email;
    private String password;
    private String collegeName;
    private String branch;
    private String phone;
}
