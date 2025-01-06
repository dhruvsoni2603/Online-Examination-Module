/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import { ProgrammingEditor } from "./ProgrammingEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export const ProgrammingSection = ({ questions, responses, setResponses }) => {
  const [activeTab, setActiveTab] = useState(questions[0].id);

  const handleResponse = (questionId, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const convertHtmlToText = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const questionTextMap = useMemo(() => {
    return questions.reduce((map, question) => {
      map[question.id] = convertHtmlToText(question.text);
      return map;
    }, {});
  }, [questions]);

  const activeQuestion = useMemo(
    () => questions.find((question) => question.id === activeTab),
    [activeTab, questions]
  );

  return (
    <div>
      {/* Question Navigator */}
      <Tabs
        defaultValue={questions[0].id}
        orientation="vertical"
        className="flex gap-4 h-full"
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList className="flex flex-col gap-4 bg-gray-800 p-2 rounded-lg shadow-lg text-white h-full w-fit">
          {questions.map((question, i) => (
            <TabsTrigger
              key={question.id}
              value={question.id}
              className={`bg-gray-700 hover:bg-gray-600 rounded-lg text-white ${
                activeTab === question.id ? "bg-gray-600" : ""
              }`}
            >
              {i + 1}
            </TabsTrigger>
          ))}
        </TabsList>
        {activeQuestion && (
          <TabsContent value={activeQuestion.id} className="flex gap-4 p-0 m-0">
            <div className="flex flex-col gap-2 bg-gray-800 p-4 rounded-lg shadow-lg text-white w-full md:w-1/3">
              <span className="text-xl font-bold">
                Question-
                {questions.findIndex((q) => q.id === activeQuestion.id) + 1}:
              </span>
              <p className="text-sm">{questionTextMap[activeQuestion.id]}</p>
            </div>
            <div className="w-full md:w-2/3">
              <ProgrammingEditor
                responses={responses}
                handleResponse={handleResponse}
                questionId={activeQuestion.id}
              />
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};
