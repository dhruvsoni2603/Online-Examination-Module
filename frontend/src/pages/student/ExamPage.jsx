import { McqSection } from "@/components/McqSection";
import { ProgrammingSection } from "@/components/ProgrammingSection";
import { StudentNavbar } from "@/components/StudentNavbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import useAuth from "@/hooks/useAuth";
import { useFetchStudentExam } from "@/hooks/useFetchData";
import { submitMcqResponses, submitProgrammingResponses, updateExamStatus } from "@/services/api";
import { getStudentId } from "@/services/jwt";
import { TriangleAlert } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

export const ExamPage = () => {

  const { logout } = useAuth();

  const studentId = getStudentId();
  const { exam, isLoading, error } = useFetchStudentExam(studentId);

  console.log(exam);

  const [submitLoading, setSubmitLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(true);
  const [timeLeft, setTimeLeft] = useState(null);
  const [timerStarted, setTimerStarted] = useState(false);
  const [isExamCompleted, setIsExamCompleted] = useState(false);

  // Update student exam status to In progress when exam is fetched
  useEffect(() => {
    if (exam && exam?.status === "Not started") {
      updateExamStatus(exam.id, "In progress");
    }
  }, [exam]);

  // Check if the exam is completed
  useEffect(() => {
    if (exam && exam?.status === "Completed") {
      setIsExamCompleted(true);
    }
  }, [exam, exam?.status]);

  const customTabsChange = (value) => {
    // Disable instructions tab when switching to other tabs
    if (value !== "instructions") {
      setActiveTab(false);
      if (!timerStarted) {
        startTimer();
        setTimerStarted(true);
      }
    }
  };

  const questions = exam?.questions;

  const mcqQuestions = questions?.filter((question) => question.type === "MCQ");
  const programmingQuestions = questions?.filter(
    (question) => question.type === "Programming"
  );

  const [mcqResponses, setMcqResponses] = useState({});
  const [programmingResponses, setProgrammingResponses] = useState({});

  // console.log(mcqResponses);
  // console.log(programmingResponses);

  const onExamSubmit = useCallback(async () => {
    setSubmitLoading(true);

    // For each pair of questionId and response, attach the studentExamId
    const mcqResponsesWithStudentExamId = Object.entries(mcqResponses).map(
      ([questionId, optionId]) => ({
        studentExamId: exam.id,
        questionId,
        selectedOptionId: optionId,
      })
    );

    const programmingResponsesWithStudentExamId = Object.entries(
      programmingResponses
    ).map(([questionId, code]) => ({
      studentExamId: exam.id,
      questionId,
      answer: code.answer,
      language: code.language,
    }));

    // console.log(mcqResponsesWithStudentExamId);
    // console.log(programmingResponsesWithStudentExamId);

    // Send the responses to the server
    const mcqRespData = await submitMcqResponses(mcqResponsesWithStudentExamId);
    const programmingRespData = await submitProgrammingResponses(
      programmingResponsesWithStudentExamId
    );

    if (mcqRespData && programmingRespData) {
      // Update student exam status to Completed
      await updateExamStatus(exam.id, "Completed");
      // Logout and Redirect to the login page
      logout();
    }

    console.log(mcqRespData);
    console.log(programmingRespData);

    setSubmitLoading(false);
  }, [exam?.id, logout, mcqResponses, programmingResponses]);

  const startTimer = () => {
    if (exam) {
      const startTime = new Date(exam.startTime).getTime();
      const endTime = new Date(exam.endTime).getTime();
      const duration = Math.floor((endTime - startTime) / 1000);
      setTimeLeft(duration);
    }
  };

  // Set time Left when exam is fetched
  useEffect(() => {
    if (exam) {
      const startTime = new Date(exam.startTime).getTime();
      const endTime = new Date(exam.endTime).getTime();
      const duration = Math.floor((endTime - startTime) / 1000);
      setTimeLeft(duration);
    }
  }, [exam]);

  useEffect(() => {
    if (timeLeft === 0) {
      onExamSubmit();
    }

    const timer =
      timeLeft > 0 && timerStarted && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearInterval(timer);
  }, [onExamSubmit, timeLeft, timerStarted]);

  useEffect(() => {
    if (isExamCompleted) {
      setTimerStarted(false);
    }
  }, [isExamCompleted]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!exam) {
    return (
      <div className="text-center text-2xl font-bold text-red-500 h-96 flex flex-col items-center justify-center">
        <TriangleAlert className="w-16 h-16" />
        No exam found
      </div>
    );
  }

  if (isExamCompleted) {
    return (
      <div className="text-center text-2xl font-bold text-red-500 h-96 flex flex-col items-center justify-center">
        <TriangleAlert className="w-16 h-16" />
        Exam completed
        <Button onClick={logout}>Logout</Button>
      </div>
    );
  }

  return (
    <Tabs defaultValue="instructions" onValueChange={customTabsChange}>
      <StudentNavbar
        activeState={activeTab}
        onExamSubmit={onExamSubmit}
        submitLoading={submitLoading}
        timeLeft={timeLeft}
      />
      <div className="container mx-auto py-4">
        <TabsContent value="instructions">
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-white">
            <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">
              Rules and Regulations
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>
                Ensure you have a stable internet connection throughout the
                exam.
              </li>
              <li>Do not refresh the page during the exam.</li>
              <li>Any form of cheating will result in disqualification.</li>
              <li>Keep your ID proof ready for verification.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-6 mb-4 border-b border-gray-700 pb-2">
              Dos
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Read all instructions carefully before starting the exam.</li>
              <li>Ensure your webcam and microphone are working properly.</li>
              <li>Keep a water bottle and necessary stationery with you.</li>
              <li>Take the exam in a quiet and well-lit room.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-6 mb-4 border-b border-gray-700 pb-2">
              Don&apos;ts
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Do not talk to anyone during the exam.</li>
              <li>
                Do not use any electronic devices other than the one used for
                the exam.
              </li>
              <li>Do not leave the exam screen during the test.</li>
              <li>Do not share your screen with anyone.</li>
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="mcq-section">
          <McqSection
            questions={mcqQuestions}
            responses={mcqResponses}
            setResponses={setMcqResponses}
          />
        </TabsContent>
        <TabsContent value="programming-section">
          <ProgrammingSection
            questions={programmingQuestions}
            responses={programmingResponses}
            setResponses={setProgrammingResponses}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
};
