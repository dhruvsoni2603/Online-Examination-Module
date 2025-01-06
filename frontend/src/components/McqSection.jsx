/* eslint-disable react/prop-types */
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useState } from "react";

export const McqSection = ({ questions, responses, setResponses }) => {
  const [activeTab, setActiveTab] = useState(0);
  const handleSelect = (questionIndex, optionIndex) => {
    setResponses((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  // console.log(responses);

  const convertHtmlToText = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  return (
    <Tabs value={activeTab.toString()} onValueChange={(value) => setActiveTab(Number(value))}>
      <div className="flex flex-col gap-4">
        <TabsList className="flex items-center justify-around bg-gray-700 py-1 px-4 rounded-lg text-white">
          {questions.map((_, i) => (
            <TabsTrigger
              key={i}
              value={i.toString()} // Ensure value is a string
              className="bg-gray-800 hover:bg-gray-600 rounded-lg text-white"
            >
              {i + 1}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-white overflow-y-auto">
          {questions.map((question, i) => (
            <TabsContent key={i} value={i.toString()} className="h-full">
              <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">
                Question {i + 1}
              </h2>
              <p className="text-xl my-8">
                {convertHtmlToText(questions[i].text)}
              </p>
              {/* Options */}
              <div className="flex flex-col gap-4 mt-2">
                <RadioGroup
                  defaultValue={responses[question.id]}
                  onValueChange={(value) => handleSelect(question.id, value)}
                >
                  {questions[i].options.map((_, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-4 px-4 text-lg font-semibold bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer"
                    >
                      <RadioGroupItem
                        value={questions[i].options[j].id}
                        id={questions[i].options[j].id}
                      />
                      <Label htmlFor={questions[i].options[j].id} className="w-full cursor-pointer py-4">
                        {convertHtmlToText(questions[i].options[j].text)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            {/* Next and Previous button */}
            <div className="flex justify-between mt-8">
              <Button
                type="button"
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white"
                onClick={() => setActiveTab((prev) => Math.max(prev - 1, 0))}
                disabled={i === 0}
              >
                <ArrowLeft className="w-6 h-6" />
                Previous
              </Button>
              <Button
                type="button"
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white"
                onClick={() => setActiveTab((prev) => Math.min(prev + 1, questions.length - 1))}
                disabled={i === questions.length - 1}
              >
                Next
                <ArrowRight className="w-6 h-6" />
              </Button>
            </div>
            </TabsContent>
          ))}
        </div>
      </div>
    </Tabs>
  );
};
