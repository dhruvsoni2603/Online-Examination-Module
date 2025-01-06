import { LANGUAGE_VERSIONS } from "@/constants/codeEditorConstants";
import axiosInstance from "./axiosInstance";
import axios from "axios";

//* Admin

export const fetchAdmin = async (id) => {
  const response = await axiosInstance.get(`/admins/${id}`);
  return response.data;
};

//* Questions

export const fetchQuestions = async () => {
  const response = await axiosInstance.get("/questions");
  return response.data;
};

export const fetchQuestion = async (id) => {
  const response = await axiosInstance.get(`/questions/${id}`);
  return response.data;
};

export const createQuestion = async (question) => {
  const response = await axiosInstance.post("/questions", question);
  return response.data;
};

export const editQuestion = async (question) => {
  const response = await axiosInstance.put(
    `/questions/${question.id}`,
    question
  );
  return response.data;
};

export const deleteQuestion = async (id) => {
  const response = await axiosInstance.delete(`/questions/${id}`);
  return response.data;
};

//* Students

export const fetchStudents = async () => {
  const response = await axiosInstance.get("/students");
  return response.data;
};

export const createStudent = async (student) => {
  const response = await axiosInstance.post("/students", student);
  return response.data;
};

export const editStudent = async (student) => {
  const response = await axiosInstance.put(`/students/${student.id}`, student);
  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await axiosInstance.delete(`/students/${id}`);
  return response.data;
};

//* Exams

export const fetchExams = async () => {
  const response = await axiosInstance.get("/exams");
  return response.data;
};

export const createExam = async (exam) => {
  const response = await axiosInstance.post("/exams", exam);
  return response.data;
};

export const editExam = async (exam) => {
  const response = await axiosInstance.put(`/exams/${exam.id}`, exam);
  return response.data;
};

export const deleteExam = async (id) => {
  const response = await axiosInstance.delete(`/exams/${id}`);
  return response.data;
};

//* Results

export const fetchExamResults = async () => {
  const response = await axiosInstance.get(`/exam-results`);
  return response.data;
}

export const fetchExamById = async (examId) => {
  const response = await axiosInstance.get(`/exam-results/exam/${examId}`);
  return response.data;
}

//* Student Exam

export const fetchStudentExam = async (studentId) => {
  const response = await axiosInstance.get(
    `/student-exams/student/${studentId}`
  );
  return response.data;
};

export const updateExamStatus = async (studentExamId, status) => {
  const response = await axiosInstance.patch(
    `/student-exams/${studentExamId}`,
    {
      status,
    }
  );
  return response.data;
};

export const submitMcqResponses = async (responses) => {
  const response = await axiosInstance.post("/mcq-responses", responses);
  return response.data;
};

export const submitProgrammingResponses = async (responses) => {
  const response = await axiosInstance.post(
    "/programming-responses",
    responses
  );
  return response.data;
};

//* Code Execution

export const executeCode = async (code, language) => {
  let aliases = [];
  let languageVersion = LANGUAGE_VERSIONS[language];

  if (language === "sql") {
    language = "sqlite3";
    aliases = ["sqlite", "sql"];
  }

  const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
    language: language,
    version: languageVersion,
    files: [
      {
        content: code,
      },
    ],
    aliases: aliases,
  });
  return response.data;
};
