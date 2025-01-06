package com.oem.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ResultMcqOptionDTO {
    private String text;
    @JsonProperty("isCorrect")
    private boolean isCorrect;
    private Integer responsesCount;
}
