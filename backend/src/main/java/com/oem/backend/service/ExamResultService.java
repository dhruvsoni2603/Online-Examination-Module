package com.oem.backend.service;

import com.oem.backend.dto.*;
import com.oem.backend.model.*;
import com.oem.backend.repository.ExamRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ExamResultService {

    private final ExamRepo examRepo;
    private final ExamQuestionService examQuestionService;
    private final QuestionService questionService;
    private final McqOptionService mcqOptionService;
    private final McqResponseService mcqResponseService;
    private final ProgrammingResponseService programmingResponseService;
    private final StudentService studentService;
    private final StudentExamService studentExamService;

    public ExamResultService(ExamRepo examRepo, ExamQuestionService examQuestionService, QuestionService questionService, McqOptionService mcqOptionService, McqResponseService mcqResponseService, ProgrammingResponseService programmingResponseService, StudentService studentService, StudentExamService studentExamService) {
        this.examRepo = examRepo;
        this.examQuestionService = examQuestionService;
        this.questionService = questionService;
        this.mcqOptionService = mcqOptionService;
        this.mcqResponseService = mcqResponseService;
        this.programmingResponseService = programmingResponseService;
        this.studentService = studentService;
        this.studentExamService = studentExamService;
    }

    public List<ExamResultDTO> getAllExamResults() {
        List<Exam> exams = examRepo.findAll();
        List<ExamResultDTO> examResultDTOs = new ArrayList<>();
        for (Exam exam : exams) {
            examResultDTOs.add(getExamResult(exam.getId()));
        }
        return examResultDTOs;
    }

    public ExamResultDTO getExamResult(UUID examId) {
        Exam exam = examRepo.findById(examId).orElse(null);
        if (exam == null) {
            return null;
        }

        ExamResultDTO examResultDTO = new ExamResultDTO();
        examResultDTO.setExamId(examId.toString());
        examResultDTO.setTitle(exam.getTitle());
        examResultDTO.setDescription(exam.getDescription());

        List<String> questionIds = examQuestionService.getExamQuestionsByExamId(examId);

        // Get mcq questions
        List<ResultMcqQuestionDTO> mcqQuestions = new ArrayList<>();
        for (String questionId : questionIds) {
            Question question = questionService.getQuestionById(UUID.fromString(questionId)).orElse(null);
            if (question == null || !question.getType().equals("MCQ")) {
                continue;
            }
            ResultMcqQuestionDTO resultMcqQuestionDTO = new ResultMcqQuestionDTO();
            resultMcqQuestionDTO.setQuestionId(questionId);
            resultMcqQuestionDTO.setText(question.getText());
            resultMcqQuestionDTO.setCategory(question.getCategory());
            resultMcqQuestionDTO.setType(question.getType());
            resultMcqQuestionDTO.setDifficultyLevel(question.getDifficultyLevel());
            resultMcqQuestionDTO.setMarks(question.getMarks());
            resultMcqQuestionDTO.setOptions(getMcqOptionDTOs(questionId));
            mcqQuestions.add(resultMcqQuestionDTO);
        }
        examResultDTO.setMcqQuestions(mcqQuestions);

        // Get programming questions
        List<ProgrammingQuestionDTO> programmingQuestions = new ArrayList<>();
        for (String questionId : questionIds) {
            Question question = questionService.getQuestionById(UUID.fromString(questionId)).orElse(null);
            if (question == null || !question.getType().equals("Programming")) {
                continue;
            }
            ProgrammingQuestionDTO programmingQuestionDTO = new ProgrammingQuestionDTO();
            programmingQuestionDTO.setId(questionId);
            programmingQuestionDTO.setText(question.getText());
            programmingQuestionDTO.setCategory(question.getCategory());
            programmingQuestionDTO.setType(question.getType());
            programmingQuestionDTO.setDifficultyLevel(question.getDifficultyLevel());
            programmingQuestionDTO.setMarks(question.getMarks());
            programmingQuestionDTO.setReferenceAnswer(question.getReferenceAnswer());
            programmingQuestionDTO.setStudentResponses(getProgrammingResponses(questionId));
            programmingQuestions.add(programmingQuestionDTO);
        }
        examResultDTO.setProgrammingQuestions(programmingQuestions);

        // Get passed students
        List<PassedStudentsDTO> passedStudents = new ArrayList<>();
        List<String> studentExamIds = studentExamService.getStudentExamsByExamId(examId);

        for (String studentExamId : studentExamIds) {
            StudentExam studentExam = studentExamService.getStudentExamById(UUID.fromString(studentExamId));
            if (studentExam == null) {
                continue;
            }
            setStudentExamScore(studentExamId);
            if (studentExam.getScore() < exam.getPassingCriteria()) {
                continue;
            }
            PassedStudentsDTO passedStudentsDTO = new PassedStudentsDTO();
            passedStudentsDTO.setStudentId(studentExam.getStudent().getId().toString());
            passedStudentsDTO.setStudentName(studentService.getStudentById(UUID.fromString(studentExam.getStudent().getId().toString())).orElseThrow(() -> new RuntimeException("Student not found")).getName());
            passedStudentsDTO.setScore(studentExam.getScore());
            passedStudentsDTO.setMcqResponses(mcqResponseService.getResponsesByStudentExamId(UUID.fromString(studentExamId)));
            passedStudents.add(passedStudentsDTO);
        }
        examResultDTO.setPassedStudents(passedStudents);

        return examResultDTO;
    }

    private List<ResultMcqOptionDTO> getMcqOptionDTOs(String questionId) {
        List<McqOption> mcqOptions = mcqOptionService.getMcqOptionsByQuestionId(UUID.fromString(questionId));
        List<ResultMcqOptionDTO> resultMcqOptionDTOs = new ArrayList<>();
        for (McqOption mcqOption : mcqOptions) {
            ResultMcqOptionDTO resultMcqOptionDTO = new ResultMcqOptionDTO();
            resultMcqOptionDTO.setText(mcqOption.getText());
            resultMcqOptionDTO.setCorrect(mcqOption.isCorrect());
            resultMcqOptionDTO.setResponsesCount(countMcqOptionResponses(mcqOption.getId().toString()));
            resultMcqOptionDTOs.add(resultMcqOptionDTO);
        }
        return resultMcqOptionDTOs;
    }

    private Integer countMcqOptionResponses(String optionId) {
        List<McqResponse> mcqResponses = mcqResponseService.getResponsesByOptionId(optionId);
        return (int) mcqResponses.stream().filter(mcqResponse -> mcqResponse.getSelectedOption() != null).count();
    }

    private List<ResultProgrammingResponseDTO> getProgrammingResponses(String questionId) {
        List<ProgrammingResponseDTO> programmingResponses = programmingResponseService.getResponsesByQuestionId(questionId);
        List<ResultProgrammingResponseDTO> resultProgrammingResponseDTOs = new ArrayList<>();
        for (ProgrammingResponseDTO programmingResponse : programmingResponses) {
            ResultProgrammingResponseDTO resultProgrammingResponseDTO = new ResultProgrammingResponseDTO();

            resultProgrammingResponseDTO.setStudentName(studentService.getStudentById(UUID.fromString(studentExamService.getStudentExamById(UUID.fromString(programmingResponse.getStudentExamId())).getStudent().getId().toString())).orElseThrow(() -> new RuntimeException("Student not found")).getName());

            resultProgrammingResponseDTO.setQuestionName(questionService.getQuestionById(UUID.fromString(programmingResponse.getQuestionId())).orElseThrow(() -> new RuntimeException("Question not found")).getText());

            resultProgrammingResponseDTO.setResponse(programmingResponse.getAnswer());
            resultProgrammingResponseDTO.setLanguage(programmingResponse.getLanguage());
            resultProgrammingResponseDTOs.add(resultProgrammingResponseDTO);
        }
        return resultProgrammingResponseDTOs;
    }

    private void setStudentExamScore (String studentExamId) {
        StudentExam studentExam = studentExamService.getStudentExamById(UUID.fromString(studentExamId));
        List<McqResponse> mcqResponses = mcqResponseService.getResponsesByStudentExamId(UUID.fromString(studentExamId));

        int mcqScore = 0;
        for (McqResponse mcqResponse : mcqResponses) {
            if (mcqResponse.getSelectedOption() != null && mcqResponse.getSelectedOption().isCorrect()) {
                mcqScore += mcqResponse.getQuestion().getMarks();
            }
        }

        studentExamService.updateStudentExamScore(UUID.fromString(studentExamId), mcqScore);
    }
}
