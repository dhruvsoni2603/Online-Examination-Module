package com.oem.backend.service;

import com.oem.backend.dto.ExamCreationDTO;
import com.oem.backend.dto.ExamDTO;
import com.oem.backend.model.Exam;
import com.oem.backend.model.ExamQuestion;
import com.oem.backend.model.StudentExam;
import com.oem.backend.repository.ExamRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ExamService {

    @Autowired
    private ExamRepo examRepository;

    @Autowired
    private ExamQuestionService examQuestionService;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private StudentExamService studentExamService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private AdminService adminService;

    // Helper method to set ExamDTO
    private ExamDTO setExamDTO(Exam exam) {
        ExamDTO examDTO = new ExamDTO();

        examDTO.setId(exam.getId().toString());
        examDTO.setTitle(exam.getTitle());
        examDTO.setDescription(exam.getDescription());
        examDTO.setDuration(exam.getDuration());
        examDTO.setTotalMarks(exam.getTotalMarks());
        examDTO.setPassingCriteria(exam.getPassingCriteria());
        examDTO.setStartingAt(exam.getStartingAt());
        examDTO.setCreatedBy(exam.getCreatedBy().getId().toString());
        examDTO.setCreatedAt(exam.getCreatedAt());
        examDTO.setUpdatedAt(exam.getUpdatedAt());
        examDTO.setQuestionIds(examQuestionService.getExamQuestionsByExamId(exam.getId()));
        examDTO.setStudentIds(studentExamService.getStudentExamsByExamId(exam.getId()));

        return examDTO;
    }

    // Helper method to set ExamQuestions and StudentExams
    private void setExamQuestionsAndStudentExams(ExamCreationDTO examCreationDTO, Exam savedExam) {
        for (String questionId : examCreationDTO.getQuestionIds()) {
            ExamQuestion examQuestion = new ExamQuestion();
            examQuestion.setExam(savedExam);
            examQuestion.setQuestion(questionService.getQuestionById(UUID.fromString(questionId)).orElseThrow(() -> new IllegalArgumentException("Question not found")));
            examQuestionService.createExamQuestion(examQuestion);
        }

        for (String studentId : examCreationDTO.getStudentIds()) {
            StudentExam studentExam = new StudentExam();
            studentExam.setStudent(studentService.getStudentById(UUID.fromString(studentId)).orElseThrow(() -> new IllegalArgumentException("Student not found")));
            studentExam.setExam(savedExam);
            studentExam.setStatus("not-started");
            studentExam.setStartTime(examCreationDTO.getStartingAt());
            studentExam.setEndTime(examCreationDTO.getStartingAt().plusMinutes(examCreationDTO.getDuration()));
            studentExam.setScore(0);
            studentExamService.createStudentExam(studentExam);
        }
    }

    // Helper method to delete ExamQuestions and StudentExams
    private void deleteExamQuestionsAndStudentExams(UUID id) {
        List<ExamQuestion> examQuestions = examQuestionService.getAllExamQuestions();
        for (ExamQuestion examQuestion : examQuestions) {
            if (examQuestion.getExam().getId().equals(id)) {
                examQuestionService.deleteExamQuestion(examQuestion.getId());
            }
        }

        List<StudentExam> studentExams = studentExamService.getAllStudentExams();
        for (StudentExam studentExam : studentExams) {
            if (studentExam.getExam().getId().equals(id)) {
                studentExamService.deleteStudentExam(studentExam.getId());
            }
        }
    }

    public List<ExamDTO> getAllExams() {
        List<Exam> exams = examRepository.findAll();
        List<ExamDTO> examDTOs = new ArrayList<>();

        for (Exam exam : exams) {
//            System.out.println(exam);
            examDTOs.add(setExamDTO(exam));
        }

        return examDTOs;
    }

    public Optional<ExamDTO> getExamById(UUID id) {
        Optional<Exam> exam = examRepository.findById(id);

//        if (exam.isEmpty()) {
//            return Optional.empty();
//        }
//
//        return Optional.of(setExamDTO(exam.get()));

        return exam.map(this::setExamDTO);
    }

    public Exam createExam(ExamCreationDTO examCreationDTO) {

//        System.out.println(examCreationDTO);

        Exam exam = new Exam();
        exam.setTitle(examCreationDTO.getTitle());
        exam.setDescription(examCreationDTO.getDescription());
        exam.setDuration(examCreationDTO.getDuration());
        exam.setTotalMarks(examCreationDTO.getTotalMarks());
        exam.setPassingCriteria(examCreationDTO.getPassingCriteria());
        exam.setStartingAt(examCreationDTO.getStartingAt());

        // Validate and set createdBy
        try {
            UUID createdById = UUID.fromString(examCreationDTO.getCreatedBy());
            exam.setCreatedBy(adminService.getAdminById(createdById).orElseThrow(() -> new IllegalArgumentException("Invalid Admin ID")));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid UUID format for createdBy field", e);
        }

        Exam savedExam = examRepository.save(exam);

        setExamQuestionsAndStudentExams(examCreationDTO, savedExam);

        return savedExam;
    }

    public ExamDTO updateExam(UUID id, ExamCreationDTO examCreationDTO) {
        Exam exam = new Exam();
        exam.setId(id);
        exam.setTitle(examCreationDTO.getTitle());
        exam.setDescription(examCreationDTO.getDescription());
        exam.setDuration(examCreationDTO.getDuration());
        exam.setTotalMarks(examCreationDTO.getTotalMarks());
        exam.setPassingCriteria(examCreationDTO.getPassingCriteria());
        exam.setStartingAt(examCreationDTO.getStartingAt());
        exam.setCreatedAt(examRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Exam not found")).getCreatedAt());

        // Validate and set createdBy
        try {
            UUID createdById = UUID.fromString(examCreationDTO.getCreatedBy());
            exam.setCreatedBy(adminService.getAdminById(createdById).orElseThrow(() -> new IllegalArgumentException("Invalid Admin ID")));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid UUID format for createdBy field", e);
        }

        Exam savedExam = examRepository.save(exam);

        // Delete existing exam questions
        deleteExamQuestionsAndStudentExams(id);

        setExamQuestionsAndStudentExams(examCreationDTO, savedExam);

        return setExamDTO(savedExam);
    }

    public void deleteExam(UUID id) {
        // Delete existing exam questions and student exams
        deleteExamQuestionsAndStudentExams(id);

        examRepository.deleteById(id);
    }
}