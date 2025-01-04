import { create } from 'zustand';

const useAppStore = create((set) => ({
  userId: null,
  setUserId: (id) => set({ userId: id }),
  questions: [],
  setQuestions: (questions) => set({ questions }),
  students: [],
  setStudents: (students) => set({ students }),
  exams: [],
  setExams: (exams) => set({ exams }),
}));

export default useAppStore;