import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import useAuth from "@/hooks/useAuth";
import { useFetchQuestions, useFetchStudents } from "@/hooks/useFetchData";
import axiosInstance from "@/services/axiosInstance";
import { getToken } from "@/services/jwt";
import { useMutation } from "@tanstack/react-query";
import { Loader, PlusCircle, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MultiSelectInput } from "@/components/MultiSelectInput";
import { Textarea } from "@/components/ui/textarea";

export const AddExamPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { toast } = useToast();

  const exam = location.state?.exam;
  // console.log(exam);

  const {
    questions,
    isLoading: questionLoading,
    error: questionError,
  } = useFetchQuestions();
  // console.log(isLoading);

  if (questionError) {
    toast({
      title: "Error fetching questions",
      description: questionError.message,
      variant: "destructive",
    });
    console.error(questionError);
  }

  const questionOptions =
    questions?.map((question) => ({
      value: question.id,
      label: question.text,
      category: question.category,
      type: question.type,
      difficultyLevel: question.difficultyLevel,
      marks: question.marks,
    })) || [];

  const {
    students,
    isLoading: studentLoading,
    error: studentError,
  } = useFetchStudents();

  if (studentError) {
    toast({
      title: "Error fetching students",
      description: studentError.message,
      variant: "destructive",
    });
    console.error(studentError);
  }

  const studentOptions =
    students?.map((student) => ({
      value: student.id,
      label: student.name,
      collegeName: student.collegeName,
      branch: student.branch,
    })) || [];

  const [examTitle, setExamTitle] = useState(exam?.title || "");
  const [examDescription, setExamDescription] = useState(
    exam?.description || ""
  );
  const [examDuration, setExamDuration] = useState(exam?.duration || "");
  const [examTotalMarks, setExamTotalMarks] = useState(exam?.totalMarks || 0);
  const [examPassingMarks, setExamPassingMarks] = useState(
    exam?.passingCriteria || 0
  );
  const [examStartDate, setExamStartDate] = useState(
    exam?.startingAt || new Date().toISOString().split(".")[0]
  );
  const [examQuestionIds, setExamQuestionIds] = useState(
    exam?.questionIds || []
  );
  const [examStudentIds, setExamStudentIds] = useState(exam?.studentIds || []);

  // console.log(examQuestionIds);

  const createExamMutation = useMutation({
    mutationFn: async (newExam) => {
      const token = getToken();

      let url;

      if (location.pathname.includes("edit-exam")) {
        url = `${import.meta.env.VITE_API_URL}/api/exams/${exam.id}`;

        return axiosInstance.put(url, newExam, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        url = `${import.meta.env.VITE_API_URL}/api/exams`;

        return axiosInstance.post(url, newExam, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    },
    onSuccess: () => {
      if (location.pathname.includes("edit-exam")) {
        toast({
          title: "Exam updated successfully",
          status: "success",
        });
      } else {
        toast({
          title: "Exam created successfully",
          status: "success",
        });
      }

      navigate("/admin/exams");
    },
    onError: (error) => {
      if (location.pathname.includes("edit-exam")) {
        toast({
          title: "Error updating exam",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error creating exam",
          description: error.response.data,
          variant: "destructive",
        });
      }
      console.error(error);
    },
  });

  if (!isAuthenticated) {
    navigate("/login");
  }

  const countTotalMarks = () => {
    let totalMarks = 0;
    examQuestionIds.forEach((id) => {
      const question = questionOptions.find((q) => q.value === id);
      // console.log(question);
      totalMarks += question?.marks;
    });
    setExamTotalMarks(totalMarks);
  };

  useEffect(() => {
    countTotalMarks();
  }, [examQuestionIds]);

  const handleExamSubmit = (e) => {
    e.preventDefault();

    if (!examTitle) {
      toast({
        title: "Exam Title is required",
        variant: "destructive",
      });
      return;
    }
    if (!examDescription) {
      toast({
        title: "Exam Description is required",
        variant: "destructive",
      });
      return;
    }
    if (!examDuration) {
      toast({
        title: "Exam Duration is required",
        variant: "destructive",
      });
      return;
    }
    if (!examTotalMarks) {
      toast({
        title: "Exam Total Marks is required",
        variant: "destructive",
      });
      return;
    }
    if (!examPassingMarks) {
      toast({
        title: "Exam Passing Marks is required",
        variant: "destructive",
      });
      return;
    }
    if (!examStartDate) {
      toast({
        title: "Exam Start Date is required",
        variant: "destructive",
      });
      return;
    }
    if (examQuestionIds.length === 0) {
      toast({
        title: "Select at least one question",
        variant: "destructive",
      });
      return;
    }
    if (examStudentIds.length === 0) {
      toast({
        title: "Select at least one student",
        variant: "destructive",
      });
      return;
    }
    if (examTotalMarks < examPassingMarks) {
      toast({
        title: "Passing Marks should be less than Total Marks",
        variant: "destructive",
      });
      return;
    }

    // console.log(typeof examPassingMarks);

    const newExam = {
      title: examTitle,
      description: examDescription,
      duration: examDuration,
      totalMarks: examTotalMarks,
      passingCriteria: Number(examPassingMarks),
      startingAt: examStartDate,
      questionIds: examQuestionIds,
      studentIds: examStudentIds,
    };

    console.log(newExam);

    createExamMutation.mutate(newExam);
  };

  const handleReset = () => {
    setExamTitle("");
    setExamDescription("");
    setExamDuration("");
    setExamTotalMarks("");
    setExamPassingMarks("");
    setExamStartDate("");
    setExamQuestionIds([]);
    setExamStudentIds([]);
  };

  window.onbeforeunload = function () {
    return "Are you sure you want to leave?";
  };

  const convertHtmlToText = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  return (
    <div className="px-4 py-2 mx-auto mt-12 w-full max-w-7xl">
      <form onSubmit={handleExamSubmit}>
        <header className="flex flex-col md:flex-row md:items-center justify-between pt-2 pb-4 gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold text-gray-50">
              {location.pathname.includes("edit-exam")
                ? "Edit Exam"
                : "Create Exam"}
            </h1>
            <p className="text-md text-gray-400">
              {location.pathname.includes("edit-exam")
                ? "Edit an existing exam"
                : "Create a new exam"}
            </p>
          </div>
          <div className="flex flex-col-reverse md:flex-row justify-end items-center gap-2 md:gap-4">
            <Button
              type="reset"
              variant="outline"
              className="w-full md:w-auto"
              onClick={handleReset}
            >
              <RotateCcw className="h-6 w-6" />
              Reset
            </Button>
            <Button type="submit" className="w-full md:w-auto">
              {createExamMutation.isLoading ? (
                <Loader className="animate-spin h-6 w-6" />
              ) : (
                <PlusCircle className="h-6 w-6" />
              )}
              {location.pathname.includes("edit-exam") ? "Update" : "Add"}
            </Button>
          </div>
        </header>
        <div className="flex flex-col gap-6 border border-gray-800 rounded-lg p-4">
          {/* Title & Description */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="examTitle" className="text-gray-400">
                Exam Title
              </label>
              <Input
                type="text"
                id="examTitle"
                name="examTitle"
                value={examTitle}
                onChange={(e) => setExamTitle(e.target.value)}
                placeholder="Enter the exam title"
                className="Input"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="examDescription" className="text-gray-400">
                Exam Description
              </label>
              <Textarea
                id="examDescription"
                name="examDescription"
                value={examDescription}
                onChange={(e) => setExamDescription(e.target.value)}
                placeholder="Enter the exam description"
              />
            </div>
          </div>
          {/* Questions & Students */}
          <div className="flex flex-col gap-2">
            <label htmlFor="examQuestionIds" className="text-gray-400">
              Select Questions
            </label>
            {questionLoading ? (
              <Loader className="h-8 w-8 animate-spin" />
            ) : (
              <MultiSelectInput
                options={questionOptions}
                selectedOptions={examQuestionIds}
                setSelectedOptions={setExamQuestionIds}
                title="+ Select Questions"
              />
            )}
          </div>
          {examQuestionIds.length > 0 && (
            <div className="flex flex-col gap-2">
              <label htmlFor="selectedQuestions" className="text-gray-400">
                Selected Questions
              </label>
              <div className="flex flex-col gap-2">
                {examQuestionIds.map((id) => {
                  const question = questionOptions.find((q) => q.value === id);
                  return (
                    <div key={id} className="bg-gray-800 p-2 rounded-md">
                      {convertHtmlToText(question?.label)}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <label htmlFor="examStudentIds" className="text-gray-400">
              Select Students
            </label>
            {studentLoading ? (
              <Loader className="h-8 w-8 animate-spin" />
            ) : (
              <MultiSelectInput
                options={studentOptions}
                selectedOptions={examStudentIds}
                setSelectedOptions={setExamStudentIds}
                title="+ Select Students"
              />
            )}
          </div>
          {examStudentIds.length > 0 && (
            <div className="flex flex-col gap-2">
              <label htmlFor="selectedStudents" className="text-gray-400">
                Selected Students
              </label>
              <div className="flex flex-col gap-2">
                {examStudentIds.map((id) => {
                  const student = studentOptions.find((s) => s.value === id);
                  return (
                    <div key={id} className="bg-gray-800 p-2 rounded-md">
                      {student?.label}
                      {student?.branch && student?.collegeName && (
                        <div className="text-xs text-gray-400">
                          {student?.branch}, {student?.collegeName}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {/* Duration, Passing Marks & Start Date */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="examDuration" className="text-gray-400">
                Exam Duration (in minutes)
              </label>
              <Input
                type="number"
                id="examDuration"
                name="examDuration"
                value={examDuration}
                onChange={(e) => setExamDuration(e.target.value)}
                placeholder="Enter the exam duration in minutes"
                className="Input"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="examPassingMarks" className="text-gray-400">
                Exam Passing Marks
              </label>
              <Input
                type="number"
                id="examPassingMarks"
                name="examPassingMarks"
                value={examPassingMarks}
                onChange={(e) => setExamPassingMarks(e.target.value)}
                placeholder="Enter the exam passing marks"
                className="Input"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="examPassingMarks" className="text-gray-400">
                Exam Total Marks
              </label>
              <Input
                type="number"
                id="examPassingMarks"
                name="examPassingMarks"
                value={examTotalMarks}
                disabled
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="examStartDate" className="text-gray-400">
                Exam Start Date
              </label>
              <input
                type="datetime-local"
                id="examStartDate"
                name="examStartDate"
                value={examStartDate}
                onChange={(e) => setExamStartDate(e.target.value)}
                placeholder="Enter the exam start date"
                // min={new Date().toISOString().split(".")[0]}
                // max={
                //   new Date(
                //     new Date().setFullYear(new Date().getFullYear() + 1)
                //   )
                //     .toISOString()
                //     .split(".")[0]
                // }
                className="bg-gray-800 px-3 py-2 rounded-md text-gray-50 text-sm"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
