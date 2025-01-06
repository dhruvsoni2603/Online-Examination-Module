import { create } from "zustand";

const useGlobalStore = create((set) => ({
  userId: null,
  questions: [],
  students: [],
  exams: [],
  studentExam: null,
  mcqResponses: [],
  programmingResponses: [],

  // Actions
  setUserId: (id) => set({ userId: id }),
  setQuestions: (questions) => set({ questions }),
  setStudents: (students) => set({ students }),
  setExams: (exams) => set({ exams }),
  setStudentExam: (exam) => set({ studentExam: exam }),
  setMcqResponses: (responses) => set({ mcqResponses: responses }),
  setProgrammingResponses: (responses) =>
    set({ programmingResponses: responses }),
}));

export default useGlobalStore;
