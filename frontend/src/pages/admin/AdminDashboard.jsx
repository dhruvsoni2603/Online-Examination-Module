import { ExamCard } from "@/components/ExamCard";
import { ResultCard } from "@/components/ResultCard";
import { Button } from "@/components/ui/button";
import { useFetchExamResults, useFetchExams } from "@/hooks/useFetchData";
import {
  BadgePlus,
  CirclePlus,
  Loader,
  Target,
  UserPlus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AdminDashboard = () => {
  const navigate = useNavigate();

  const {
    exams,
    isLoading: areExamsLoading,
    error: examsError,
  } = useFetchExams();
  const {
    examResults,
    isLoading: areResultsLoading,
    error: resultsError,
  } = useFetchExamResults();

  return (
    <div className="px-4 py-2 mx-auto mt-14 w-full max-w-7xl">
      {/* Quick Actions */}
      <div className="mb-8">
        <h1 className="text-lg font-bold mb-2">Quick Actions</h1>
        <div className="flex flex-wrap justify-between items-center gap-2 w-full">
          <Button
            className="w-[20%] h-12 text-lg"
            onClick={() => navigate("/admin/create-exam")}
          >
            <BadgePlus
              style={{ height: "1.5rem", width: "1.5rem" }}
              className="mr-2"
            />
            Create Exam
          </Button>
          <Button
            className="w-[20%] h-12 text-lg"
            onClick={() => navigate("/admin/add-student")}
          >
            <UserPlus
              style={{ height: "1.5rem", width: "1.5rem" }}
              className="mr-2"
            />
            Add Student
          </Button>
          <Button
            className="w-[20%] h-12 text-lg"
            onClick={() => navigate("/admin/add-question")}
          >
            <CirclePlus
              style={{ height: "1.5rem", width: "1.5rem" }}
              className="mr-2"
            />
            Add Question
          </Button>
          <Button
            className="w-[20%] h-12 text-lg"
            onClick={() => navigate("/admin/results")}
          >
            <Target
              style={{ height: "1.5rem", width: "1.5rem" }}
              className="mr-2"
            />
            View Results
          </Button>
        </div>
      </div>
      {/* Recently Created Exams */}
      <div className="mb-8">
        <h1 className="text-lg font-bold mb-2">Recently Created Exams</h1>
        {areExamsLoading && <Loader />}
        {examsError && (
          <div className="text-red-500 font-bold">
            Error: {examsError.message}
          </div>
        )}
        {exams && exams.length === 0 && (
          <div className="text-red-500 font-bold">No exams found</div>
        )}
        {exams && exams.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exams.map((exam) => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
          </div>
        )}
      </div>
      {/* Recent Exam Results */}
      <div className="mb-8">
        <h1 className="text-lg font-bold mb-2">Recent Exam Results</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {areResultsLoading && <Loader />}
          {resultsError && (
            <div className="text-red-500 font-bold">
              Error: {resultsError.message}
            </div>
          )}
          {examResults && examResults.length > 0 && (
            <div className="">
              {examResults.map((result) => (
                <ResultCard key={result.examId} result={result} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
