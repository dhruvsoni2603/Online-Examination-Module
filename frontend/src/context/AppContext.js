import { create } from 'zustand';

const useAppStore = create((set) => ({
  userId: null,
  setUserId: (id) => set({ userId: id }),
  questions: [],
  setQuestions: (questions) => set({ questions }),
  students: [],
  setStudents: (students) => set({ students }),
}));

export default useAppStore;