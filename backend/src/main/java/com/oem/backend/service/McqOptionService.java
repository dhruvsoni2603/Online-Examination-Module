package com.oem.backend.service;

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

    public List<McqOption> getOptionsByQuestionId(UUID questionId) {
        return mcqOptionRepository.findByQuestionId(questionId);
    }

    public McqOption createMcqOption(McqOption mcqOption) {
        return mcqOptionRepository.save(mcqOption);
    }

    public void deleteMcqOption(UUID id) {
        mcqOptionRepository.deleteById(id);
    }
}
