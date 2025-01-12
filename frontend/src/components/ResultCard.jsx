/* eslint-disable react/prop-types */
import { Eye } from "lucide-react";
import { Badge } from "./ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useNavigate } from "react-router-dom";

export const ResultCard = ({ result }) => {
  const navigate = useNavigate();

  return (
    <div
      key={result.examId}
      className="bg-gray-800 rounded-lg p-4 shadow-lg text-white"
    >
      <h2 className="text-xl font-bold mb-2">{result.title}</h2>
      <p className="text-sm text-gray-400">{result.description}</p>
      <div className="flex justify-between items-start gap-2 mt-4">
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
        <Tooltip delayDuration={600}>
          <TooltipTrigger
            className="flex items-center justify-center p-2 bg-green-800 hover:bg-green-900 rounded-md"
            onClick={() => navigate(`/admin/results/${result.examId}`)}
          >
            <Eye className="h-5 w-5" />
          </TooltipTrigger>
          <TooltipContent side="bottom">View</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
