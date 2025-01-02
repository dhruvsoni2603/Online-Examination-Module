import axiosInstance from "./axiosInstance";

//* Questions
export const fetchQuestions = async () => {
  const response = await axiosInstance.get('/questions');
  return response.data;
};

export const fetchQuestion = async (id) => {
  const response = await axiosInstance.get(`/questions/${id}`);
  return response.data;
}

export const createQuestion = async (question) => {
  const response = await axiosInstance.post('/questions', question);
  return response.data;
};

export const editQuestion = async (question) => {
  const response = await axiosInstance.put(`/questions/${question.id}`, question);
  return response.data;
};

export const deleteQuestion = async (id) => {
  const response = await axiosInstance.delete(`/questions/${id}`);
  return response.data;
};

//* Students
export const fetchStudents = async () => {
  const response = await axiosInstance.get('/students');
  return response.data;
};

export const createStudent = async (student) => {
  const response = await axiosInstance.post('/students', student);
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
  const response = await axiosInstance.get('/exams');
  return response.data;
};

export const createExam = async (exam) => {
  const response = await axiosInstance.post('/exams', exam);
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