/* eslint-disable react/prop-types */
import { Eye } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export const ResultCard = ({ result }) => {
  return (
    <div
      key={result.examId}
      className="bg-gray-800 rounded-lg p-4 shadow-lg text-white"
    >
      <h2 className="text-xl font-bold mb-2">{result.title}</h2>
      <p className="text-sm text-gray-400">{result.description}</p>
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
  );
};
