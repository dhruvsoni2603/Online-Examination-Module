import { create } from "zustand";

const useGlobalStore = create((set) => ({
  userId: null,
  questions: [],
  students: [],

  // Actions
  setUserId: (id) => set({ userId: id }),
  setQuestions: (questions) => set({ questions }),
  setStudents: (students) => set({ students }),
}));

export default useGlobalStore;
