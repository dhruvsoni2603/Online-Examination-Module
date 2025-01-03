import { create } from "zustand";

const useGlobalStore = create((set) => ({
  userId: null,
  questions: [],
  students: [],
  exams: [],

  // Actions
  setUserId: (id) => set({ userId: id }),
  setQuestions: (questions) => set({ questions }),
  setStudents: (students) => set({ students }),
  setExams: (exams) => set({ exams }),
}));

export default useGlobalStore;
