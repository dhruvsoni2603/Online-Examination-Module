import { ExamCard } from "@/components/ExamCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFetchExamResults, useFetchExams } from "@/hooks/useFetchData";
import {
  BadgePlus,
  CirclePlus,
  Eye,
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
            onClick={() => navigate("/admin/exams")}
          >
            <BadgePlus
              style={{ height: "1.5rem", width: "1.5rem" }}
              className="mr-2"
            />
            Create Exam
          </Button>
          <Button className="w-[20%] h-12 text-lg">
            <UserPlus
              style={{ height: "1.5rem", width: "1.5rem" }}
              className="mr-2"
            />
            Add Student
          </Button>
          <Button className="w-[20%] h-12 text-lg">
            <CirclePlus
              style={{ height: "1.5rem", width: "1.5rem" }}
              className="mr-2"
            />
            Add Question
          </Button>
          <Button className="w-[20%] h-12 text-lg">
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
          <div className="text-red-500 font-bold">Error: {examsError.message}</div>
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
      <div className="">
        <h1 className="text-lg font-bold mb-2">Recent Exam Results</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {areResultsLoading && <Loader />}
          {resultsError && (
            <div className="text-red-500 font-bold">Error: {resultsError.message}</div>
          )}
          {examResults.map((result) => (
            <div
              key={result.examId}
              className="bg-gray-800 rounded-lg p-4 shadow-lg text-white w-fit"
            >
              <h2 className="text-xl font-bold mb-2">{result.title}</h2>
              <div className="flex justify-between items-center gap-2 mt-2">
                <div className="flex gap-2">
                  <Badge className="bg-green-700 hover:bg-green-600">
                    {result.mcqQuestions.length} MCQs
                  </Badge>
                  <Badge className="bg-blue-700 hover:bg-blue-600">
                    {result.programmingQuestions.length} Programming
                  </Badge>
                  <Badge className="bg-yellow-700 hover:bg-yellow-600">
                    {result.passedStudents.length} Passed
                  </Badge>
                </div>
                <div className="">
                  <Button size="sm">
                    <Eye className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
