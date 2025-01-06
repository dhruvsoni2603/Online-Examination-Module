package com.oem.backend.service;

import com.oem.backend.dto.McqOptionDTO;
import com.oem.backend.model.McqOption;
import com.oem.backend.repository.McqOptionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class McqOptionService {

    @Autowired
    private McqOptionRepo mcqOptionRepository;

    public List<McqOption> getAllOptions() {
        return mcqOptionRepository.findAll();
    }

    public List<McqOptionDTO> getOptionsByQuestionId(UUID questionId) {
        List<McqOption> mcqOptions = mcqOptionRepository.findByQuestionId(questionId);
        return mcqOptions.stream().map(mcqOption -> {
            McqOptionDTO mcqOptionDTO = new McqOptionDTO();
            mcqOptionDTO.setText(mcqOption.getText());
            mcqOptionDTO.setCorrect(mcqOption.isCorrect());
            return mcqOptionDTO;
        }).toList();
    }

    public McqOption getMcqOptionById(UUID id) {
        return mcqOptionRepository.findById(id).orElse(null);
    }

    public List<McqOption> getMcqOptionsByQuestionId(UUID questionId) {
        return mcqOptionRepository.findByQuestionId(questionId);
    }

    public McqOption createMcqOption(McqOption mcqOption) {
        return mcqOptionRepository.save(mcqOption);
    }

    public void deleteMcqOption(UUID id) {
        mcqOptionRepository.deleteById(id);
    }

    public McqOption getCorrectOptionByQuestionId(UUID questionId) {
        return mcqOptionRepository.findByQuestionId(questionId).stream().filter(McqOption::isCorrect).findFirst().orElse(null);
    }
}
