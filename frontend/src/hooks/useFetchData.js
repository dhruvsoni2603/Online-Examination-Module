import { useQuery } from "@tanstack/react-query";
import {
  fetchAdmin,
  fetchExamById,
  fetchExamResults,
  fetchExams,
  fetchQuestions,
  fetchStudentExam,
  fetchStudents,
} from "@/services/api";
import useGlobalStore from "@/store/globalStore";
import { useEffect } from "react";

export const useFetchQuestions = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["questions"],
    queryFn: fetchQuestions,
  });

  const setQuestions = useGlobalStore((state) => state.setQuestions);

  useEffect(() => {
    if (data) {
      setQuestions(data);
    }
  }, [data, setQuestions]);

  return { questions: data, isLoading, error, refetch };
};

export const useFetchStudents = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
  });

  const setStudents = useGlobalStore((state) => state.setStudents);

  useEffect(() => {
    if (data) {
      setStudents(data);
    }
  }, [data, setStudents]);

  return { students: data, isLoading, error, refetch };
};

export const useFetchExams = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["exams"],
    queryFn: fetchExams,
  });

  const setExams = useGlobalStore((state) => state.setExams);

  useEffect(() => {
    if (data) {
      const examsWithDefaultMarks = data.map((exam) => ({
        ...exam,
        totalMarks: exam.totalMarks ?? 0,
      }));
      setExams(examsWithDefaultMarks);
    }
  }, [data, setExams]);

  return { exams: data, isLoading, error, refetch };
};

export const useFetchStudentExam = (studentId) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["student-exam", studentId],
    queryFn: () => fetchStudentExam(studentId),
  });

  const setStudentExam = useGlobalStore((state) => state.setStudentExam);

  useEffect(() => {
    if (data) {
      setStudentExam(data);
    }
  }, [data, setStudentExam]);

  return { exam: data, isLoading, error, refetch };
};

export const useFetchExamResults = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["exam-results"],
    queryFn: fetchExamResults,
  });

  return { examResults: data, isLoading, error, refetch };
}

export const useFetchExamResultById = (examId) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["exam-result", examId],
    queryFn: () => fetchExamById(examId),
  });

  return { examResult: data, isLoading, error, refetch };
};

export const useFetchAdmin = (adminId) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin", adminId],
    queryFn: () => fetchAdmin(adminId),
  });

  return { admin: data, isLoading, error, refetch };
};
