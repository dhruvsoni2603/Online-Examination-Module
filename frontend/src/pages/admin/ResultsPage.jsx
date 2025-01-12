import { ResultCard } from "@/components/ResultCard";
import { useFetchExamResults } from "@/hooks/useFetchData";
import { Loader } from "lucide-react";

export const ResultsPage = () => {
  const { examResults, isLoading, error } = useFetchExamResults();

  console.log(examResults);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="animate-spin h-6 w-6" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-2xl font-bold text-red-500 h-96 flex flex-col items-center justify-center">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="px-4 py-2 mx-auto mt-14 w-full max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {examResults.map((result) => (
          <ResultCard key={result.examId} result={result} />
        ))}
      </div>
    </div>
  );
};
