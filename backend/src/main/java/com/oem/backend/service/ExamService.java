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

    public List<ExamDTO> getAllExams() {
        List<Exam> exams = examRepository.findAll();
        List<ExamDTO> examDTOs = new ArrayList<>();

        for (Exam exam : exams) {
            ExamDTO examDTO = new ExamDTO();

            examDTO.setId(exam.getId().toString());
            examDTO.setTitle(exam.getTitle());
            examDTO.setDescription(exam.getDescription());
            examDTO.setDuration(exam.getDuration());
            examDTO.setPassingCriteria(exam.getPassingCriteria());
            examDTO.setStartingAt(exam.getStartingAt());
            examDTO.setCreatedBy(exam.getCreatedBy().getId().toString());
            examDTO.setCreatedAt(exam.getCreatedAt());
            examDTO.setUpdatedAt(exam.getUpdatedAt());
            examDTO.setQuestionIds(examQuestionService.getExamQuestionsByExamId(exam.getId()));
            examDTO.setStudentIds(studentExamService.getStudentExamsByExamId(exam.getId()));
            examDTOs.add(examDTO);
        }

        return examDTOs;
    }

    public Optional<ExamDTO> getExamById(UUID id) {
        Optional<Exam> exam = examRepository.findById(id);

        if (exam.isEmpty()) {
            return Optional.empty();
        }

        ExamDTO examDTO = new ExamDTO();
        examDTO.setId(exam.get().getId().toString());
        examDTO.setTitle(exam.get().getTitle());
        examDTO.setDescription(exam.get().getDescription());
        examDTO.setDuration(exam.get().getDuration());
        examDTO.setPassingCriteria(exam.get().getPassingCriteria());
        examDTO.setStartingAt(exam.get().getStartingAt());
        examDTO.setCreatedBy(exam.get().getCreatedBy().getId().toString());
        examDTO.setCreatedAt(exam.get().getCreatedAt());
        examDTO.setUpdatedAt(exam.get().getUpdatedAt());
        examDTO.setQuestionIds(examQuestionService.getExamQuestionsByExamId(exam.get().getId()));
        examDTO.setStudentIds(studentExamService.getStudentExamsByExamId(exam.get().getId()));

        return Optional.of(examDTO);
    }

    public Exam createExam(ExamCreationDTO examCreationDTO) {
        Exam exam = new Exam();
        exam.setTitle(examCreationDTO.getTitle());
        exam.setDescription(examCreationDTO.getDescription());
        exam.setDuration(examCreationDTO.getDuration());
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

        for (String questionId : examCreationDTO.getQuestionIds()) {
            ExamQuestion examQuestion = new ExamQuestion();
            examQuestion.setExam(savedExam);
            examQuestion.setQuestion(questionService.getQuestionById(UUID.fromString(questionId)).get());
            examQuestionService.createExamQuestion(examQuestion);
        }

        for (String studentId : examCreationDTO.getStudentIds()) {
            StudentExam studentExam = new StudentExam();
            studentExam.setStudent(studentService.getStudentById(UUID.fromString(studentId)).get());
            studentExam.setExam(savedExam);
            studentExam.setStatus("not-started");
            studentExam.setStartTime(examCreationDTO.getStartingAt());
            studentExam.setEndTime(examCreationDTO.getStartingAt().plusMinutes(examCreationDTO.getDuration()));
            studentExam.setScore(0);
            studentExamService.createStudentExam(studentExam);
        }

        return savedExam;
    }

    public ExamDTO updateExam(UUID id, ExamCreationDTO examCreationDTO) {
        Exam exam = new Exam();
        exam.setId(id);
        exam.setTitle(examCreationDTO.getTitle());
        exam.setDescription(examCreationDTO.getDescription());
        exam.setDuration(examCreationDTO.getDuration());
        exam.setPassingCriteria(examCreationDTO.getPassingCriteria());
        exam.setStartingAt(examCreationDTO.getStartingAt());
        exam.setCreatedAt(examRepository.findById(id).get().getCreatedAt());

        // Validate and set createdBy
        try {
            UUID createdById = UUID.fromString(examCreationDTO.getCreatedBy());
            exam.setCreatedBy(adminService.getAdminById(createdById).orElseThrow(() -> new IllegalArgumentException("Invalid Admin ID")));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid UUID format for createdBy field", e);
        }

        Exam savedExam = examRepository.save(exam);

        // Delete existing exam questions
        List<ExamQuestion> examQuestions = examQuestionService.getAllExamQuestions();
        for (ExamQuestion examQuestion : examQuestions) {
            if (examQuestion.getExam().getId().equals(id)) {
                examQuestionService.deleteExamQuestion(examQuestion.getId());
            }
        }

        // Delete existing student exams
        List<StudentExam> studentExams = studentExamService.getAllStudentExams();
        for (StudentExam studentExam : studentExams) {
            if (studentExam.getExam().getId().equals(id)) {
                studentExamService.deleteStudentExam(studentExam.getId());
            }
        }

        for (String questionId : examCreationDTO.getQuestionIds()) {
            ExamQuestion examQuestion = new ExamQuestion();
            examQuestion.setExam(savedExam);
            examQuestion.setQuestion(questionService.getQuestionById(UUID.fromString(questionId)).get());
            examQuestionService.createExamQuestion(examQuestion);
        }

        for (String studentId : examCreationDTO.getStudentIds()) {
            StudentExam studentExam = new StudentExam();
            studentExam.setStudent(studentService.getStudentById(UUID.fromString(studentId)).get());
            studentExam.setExam(savedExam);
            studentExam.setStatus("not-started");
            studentExam.setStartTime(examCreationDTO.getStartingAt());
            studentExam.setEndTime(examCreationDTO.getStartingAt().plusMinutes(examCreationDTO.getDuration()));
            studentExam.setScore(0);
            studentExamService.createStudentExam(studentExam);
        }

        ExamDTO examDTO = new ExamDTO();
        examDTO.setId(savedExam.getId().toString());
        examDTO.setTitle(savedExam.getTitle());
        examDTO.setDescription(savedExam.getDescription());
        examDTO.setDuration(savedExam.getDuration());
        examDTO.setPassingCriteria(savedExam.getPassingCriteria());
        examDTO.setStartingAt(savedExam.getStartingAt());
        examDTO.setCreatedBy(savedExam.getCreatedBy().getId().toString());
        examDTO.setCreatedAt(savedExam.getCreatedAt());
        examDTO.setUpdatedAt(savedExam.getUpdatedAt());
        examDTO.setQuestionIds(examQuestionService.getExamQuestionsByExamId(savedExam.getId()));
        examDTO.setStudentIds(studentExamService.getStudentExamsByExamId(savedExam.getId()));

        return examDTO;
    }

    public void deleteExam(UUID id) {
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

        examRepository.deleteById(id);
    }
}