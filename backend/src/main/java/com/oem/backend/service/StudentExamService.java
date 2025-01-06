package com.oem.backend.service;

import com.oem.backend.dto.McqOptionResponseDTO;
import com.oem.backend.dto.QuestionDTO;
import com.oem.backend.dto.StudentExamDTO;
import com.oem.backend.model.McqOption;
import com.oem.backend.model.StudentExam;
import com.oem.backend.repository.StudentExamRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class StudentExamService {

    @Autowired
    private StudentExamRepo studentExamRepository;

    @Autowired
    private ExamQuestionService examQuestionService;
    @Autowired
    private QuestionService questionService;
    @Autowired
    private McqOptionService mcqOptionService;

    public List<StudentExam> getAllStudentExams() {
        return studentExamRepository.findAll();
    }

    public List<String> getStudentExamsByExamId(UUID examId) {
        List<StudentExam> studentExamList = studentExamRepository.findByExamId(examId);
        List<String> studentIds = new ArrayList<>();

        for (StudentExam studentExam : studentExamList) {
            if(studentExam.getStudent() != null && studentExam.getStudent().getId() != null) {
                studentIds.add(studentExam.getStudent().getId().toString());
            }
        }

        return studentIds;
    }

    // getStudentExamById
    public StudentExam getStudentExamById(UUID id) {
        return studentExamRepository.findById(id).orElse(null);
    }

    public StudentExamDTO getStudentExamByStudentId(UUID studentId) {
        StudentExam studentExam = studentExamRepository.findByStudentId(studentId);
        if (studentExam == null) {
            return null;
        }
        StudentExamDTO studentExamDTO = new StudentExamDTO();
        studentExamDTO.setId(studentExam.getId().toString());
        studentExamDTO.setExamId(studentExam.getExam().getId().toString());
        studentExamDTO.setStudentId(studentExam.getStudent().getId().toString());
        studentExamDTO.setStartTime(studentExam.getStartTime());
        studentExamDTO.setEndTime(studentExam.getEndTime());
        studentExamDTO.setScore(studentExam.getScore());
        studentExamDTO.setStatus(studentExam.getStatus());
        studentExamDTO.setSessionToken(studentExam.getSessionToken());
        studentExamDTO.setLastPing(studentExam.getLastPing());
        studentExamDTO.setDisconnected(studentExam.isDisconnected());
        studentExamDTO.setDisconnectCount(studentExam.getDisconnectCount());
        studentExamDTO.setRemainingTime(studentExam.getRemainingTime());

        List<String> questionIds = examQuestionService.getExamQuestionsByExamId(studentExam.getExam().getId());

        List<QuestionDTO> questions = new ArrayList<>();
        for (String questionId : questionIds) {
            QuestionDTO questionDTO = new QuestionDTO();
            questionDTO.setId(questionId);
            questionDTO.setText(questionService.getQuestionById(UUID.fromString(questionId)).orElseThrow().getText());
            questionDTO.setCategory(questionService.getQuestionById(UUID.fromString(questionId)).orElseThrow().getCategory());
            questionDTO.setType(questionService.getQuestionById(UUID.fromString(questionId)).orElseThrow().getType());
            List<McqOption> options = mcqOptionService.getMcqOptionsByQuestionId(UUID.fromString(questionId));
            List<McqOptionResponseDTO> mcqOptionResponseDTOs = new ArrayList<>();
            for (McqOption option : options) {
                McqOptionResponseDTO mcqOptionResponseDTO = new McqOptionResponseDTO();
                mcqOptionResponseDTO.setId(option.getId().toString());
                mcqOptionResponseDTO.setText(option.getText());
                mcqOptionResponseDTOs.add(mcqOptionResponseDTO);
            }
            questionDTO.setOptions(mcqOptionResponseDTOs);
            questions.add(questionDTO);
        }

        studentExamDTO.setQuestions(questions);

        return studentExamDTO;
    }

    public StudentExam createStudentExam(StudentExam studentExam) {
        return studentExamRepository.save(studentExam);
    }

    public StudentExam updateStudentExamStatus(UUID id, String status) {
        StudentExam studentExam = studentExamRepository.findById(id).orElse(null);
        if (studentExam == null) {
            return null;
        }
        studentExam.setStatus(status);
        return studentExamRepository.save(studentExam);
    }

    public void updateStudentExamScore(UUID id, int score) {
        StudentExam studentExam = studentExamRepository.findById(id).orElse(null);
        if (studentExam == null) {
            return;
        }
        studentExam.setScore(score);
        studentExamRepository.save(studentExam);
    }

    public void deleteStudentExam(UUID id) {
        studentExamRepository.deleteById(id);
    }
}