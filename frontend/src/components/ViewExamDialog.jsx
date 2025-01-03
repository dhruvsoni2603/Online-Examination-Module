import { useFetchQuestions, useFetchStudents } from "@/hooks/useFetchData";
import { Badge } from "./ui/badge";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

/* eslint-disable react/prop-types */
export const ViewExamDialog = ({ exam }) => {
  const {
    questions,
    isLoading: questionIsLoading,
    error: questionError,
  } = useFetchQuestions();
  const {
    students,
    isLoading: studentIsLoading,
    error: studentError,
  } = useFetchStudents();

  if (questionIsLoading || studentIsLoading) {
    return <p>Loading...</p>;
  }

  if (questionError || studentError) {
    return <p>Error: {questionError?.message || studentError?.message}</p>;
  }

  const examQuestions = questions.filter((question) =>
    exam.questionIds.includes(question.id)
  );
  const examStudents = students.filter((student) =>
    exam.studentIds.includes(student.id)
  );

  // console.log(examQuestions);

  const convertHtmlToText = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  return (
    <DialogContent
      aria-label="View exam"
      className="bg-gray-900 min-w-[10rem] max-h-[90vh] overflow-y-auto"
    >
      <DialogHeader>
        <DialogTitle>
          <div className="text-gray-100">
            <h1 className="text-lg font-bold m-0 p-0 mb-2">View Exam</h1>
          </div>
        </DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">{exam.title}</h2>
          <p className="text-sm text-gray-400">{exam.description}</p>
        </div>
        <div className="flex flex-col md:flex-wrap md:flex-row gap-2 md:w-full">
          <Badge className="text-xs sm:text-sm md:text-xs text-slate-200 bg-yellow-700 hover:bg-yellow-600 flex items-center gap-1 cursor-default w-max">
            {exam.questionIds.length} Questions
          </Badge>
          <Badge className="text-xs sm:text-sm md:text-xs text-slate-200 bg-green-700 hover:bg-green-600 flex items-center gap-1 cursor-default w-max">
            {exam.totalMarks} Marks
          </Badge>
          <Badge className="text-xs sm:text-sm md:text-xs text-slate-200 bg-blue-700 hover:bg-blue-600 flex items-center gap-1 cursor-default w-max">
            {exam.duration} minutes
          </Badge>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-2 justify-between md:items-end md:w-full">
          <div className="flex flex-col justify-end md:items-center gap-1">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-gray-700 rounded-full flex items-center justify-center">
                <p className="text-xs text-gray-400">JD</p>
              </div>
              <p className="text-xs text-gray-400">Created by John Doe</p>
            </div>
          </div>
        </div>
        {/* Questions */}
        <div className="flex flex-col gap-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="Questions">
              <AccordionTrigger>
                <h2 className="text-lg font-semibold">Questions</h2>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 gap-4">
                  {examQuestions.map((question, index) => (
                    <div
                      key={question.id}
                      className="bg-gray-800 p-4 rounded-md"
                    >
                      <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-semibold">
                          Q.{index + 1} {convertHtmlToText(question.text)}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Badge className="text-xs text-slate-200 bg-green-700 hover:bg-green-600 flex items-center gap-1 cursor-default w-max">
                            {question.category}
                          </Badge>
                          <Badge className="text-xs text-slate-200 bg-blue-700 hover:bg-blue-600 flex items-center gap-1 cursor-default w-max">
                            {question.difficultyLevel}
                          </Badge>
                          <Badge className="text-xs text-slate-200 bg-yellow-700 hover:bg-yellow-600 flex items-center gap-1 cursor-default w-max">
                            {question.totalMarks} Marks
                          </Badge>
                          <Badge className="text-xs text-slate-200 bg-red-700 hover:bg-red-600 flex items-center gap-1 cursor-default w-max">
                            {question.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        {/* Students */}
        <div className="flex flex-col gap-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="Students">
              <AccordionTrigger>
                <h2 className="text-lg font-semibold">Students</h2>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 gap-4">
                  {examStudents.map((student) => (
                    <div
                      key={student.id}
                      className="bg-gray-800 p-4 rounded-md"
                    >
                      <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-semibold">
                          {student.firstName} {student.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Badge className="text-xs text-slate-200 bg-green-700 hover:bg-green-600 flex items-center gap-1 cursor-default w-max">
                            {student.collegeName}
                          </Badge>
                          <Badge className="text-xs text-slate-200 bg-blue-700 hover:bg-blue-600 flex items-center gap-1 cursor-default w-max">
                            {student.branch}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </DialogContent>
  );
};
