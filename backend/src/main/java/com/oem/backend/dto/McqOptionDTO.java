package com.oem.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class McqOptionDTO {
    private String text;
    @JsonProperty("isCorrect")
    private boolean isCorrect;
}