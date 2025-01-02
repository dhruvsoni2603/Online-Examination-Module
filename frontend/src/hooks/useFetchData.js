import { useQuery } from "@tanstack/react-query";
import { fetchQuestions, fetchStudents } from "@/services/api";
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
