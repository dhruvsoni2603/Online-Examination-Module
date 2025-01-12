import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TextEditor } from "@/components/TextEditor";
import axiosInstance from "@/services/axiosInstance";
import { getToken } from "@/services/jwt";
import { useMutation } from "@tanstack/react-query";
import { Loader, PlusCircle, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Editor } from "@monaco-editor/react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { CODE_SNIPPETS } from "@/constants/codeEditorConstants";

window.onbeforeunload = function () {
  return "Are you sure you want to leave?";
};

export const AddQuestionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { toast } = useToast();

  const question = location.state?.question || {};
  // console.log(question);

  const [questionType, setQuestionType] = useState(question.type || "MCQ");
  const [questionCategory, setQuestionCategory] = useState(
    question.category || ""
  );
  const [questionDifficulty, setQuestionDifficulty] = useState(
    question.difficultyLevel || ""
  );
  const [questionMarks, setQuestionMarks] = useState(question.marks || 0);

  const [questionTxt, setQuestionTxt] = useState(question.text || "");
  const [firstOptionTxt, setFirstOptionTxt] = useState(
    question.options?.length > 0 ? question.options[0].text : ``
  );
  const [secondOptionTxt, setSecondOptionTxt] = useState(
    question.options?.length > 1 ? question.options[1].text : ``
  );
  const [thirdOptionTxt, setThirdOptionTxt] = useState(
    question.options?.length > 2 ? question.options[2].text : ``
  );
  const [fourthOptionTxt, setFourthOptionTxt] = useState(
    question.options?.length > 3 ? question.options[3].text : ``
  );
  const [correctOption, setCorrectOption] = useState(
    question.options?.findIndex((option) => option.isCorrect === true) + 1 ||
      "1"
  );
  const [language, setLanguage] = useState("java");
  const [referenceAnswer, setReferenceAnswer] = useState(
    question.referenceAnswer || CODE_SNIPPETS[language] || ""
  );

  const onSelect = (value) => {
    setLanguage(value);
    setReferenceAnswer(CODE_SNIPPETS[value]);
  };

  // console.log("Correct Option: " + correctOption);

  const mutation = useMutation({
    mutationFn: async (newQuestion) => {
      const token = getToken();

      let postUrl;

      if (location.pathname.includes("edit-question")) {
        postUrl = `${import.meta.env.VITE_API_URL}/api/questions/${
          question.id
        }`;

        return axiosInstance.put(postUrl, newQuestion, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        if (questionType === "MCQ") {
          postUrl = `${import.meta.env.VITE_API_URL}/api/questions/mcq`;
        } else {
          postUrl = `${import.meta.env.VITE_API_URL}/api/questions`;
        }

        return axiosInstance.post(postUrl, newQuestion, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    },
    onSuccess: () => {
      if (location.pathname.includes("edit-question")) {
        toast({
          title: "Question updated successfully",
          description: "The question has been updated in the database",
        });
      } else {
        toast({
          title: "Question added successfully",
          description: "The question has been added to the database",
        });
      }
      navigate("/admin/questions");
    },
    onError: (error) => {
      if (location.pathname.includes("edit-question")) {
        toast({
          title: "Failed to update question",
          description: "Please try again later",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Failed to add question",
          description: "Please try again later",
          variant: "destructive",
        });
      }
      console.error("Error: ", error);
    },
  });

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();

    // Validation

    if (!questionTxt) {
      console.log("Please fill the question");
      toast({
        title: "Please fill the question",
        description: "The question field cannot be empty",
        variant: "destructive",
      });
      return;
    }
    if (!questionCategory) {
      console.log("Please fill the category");
      toast({
        title: "Please fill the category",
        description: "The category field cannot be empty",
        variant: "destructive",
      });
      return;
    }
    if (!questionType) {
      console.log("Please fill the type");
      toast({
        title: "Please fill the type",
        description: "The type field cannot be empty",
        variant: "destructive",
      });
      return;
    }
    if (!questionDifficulty) {
      console.log("Please fill the difficulty level");
      toast({
        title: "Please fill the difficulty level",
        description: "The difficulty level field cannot be empty",
        variant: "destructive",
      });
      return;
    }
    if (questionMarks === 0) {
      console.log("Please fill the marks");
      toast({
        title: "Please fill the marks",
        description: "The marks field cannot be empty",
        variant: "destructive",
      });
      return;
    }
    if (questionType === "MCQ") {
      if (
        !firstOptionTxt ||
        !secondOptionTxt ||
        !thirdOptionTxt ||
        !fourthOptionTxt
      ) {
        console.log("Please fill all the options");
        toast({
          title: "Please fill all the options",
          description: "All the options must be filled",
          variant: "destructive",
        });
        return;
      }
    } else {
      if (!referenceAnswer) {
        console.log("Please fill the reference answer");
        toast({
          title: "Please fill the reference answer",
          description: "The reference answer field cannot be empty",
          variant: "destructive",
        });
        return;
      }
    }

    const newQuestion = {
      text: questionTxt,
      category: questionCategory,
      type: questionType,
      difficultyLevel: questionDifficulty,
      marks: questionMarks,
      ...(questionType === "MCQ"
        ? {
            options: [
              {
                text: firstOptionTxt,
                isCorrect: correctOption === "1",
              },
              {
                text: secondOptionTxt,
                isCorrect: correctOption === "2",
              },
              {
                text: thirdOptionTxt,
                isCorrect: correctOption === "3",
              },
              {
                text: fourthOptionTxt,
                isCorrect: correctOption === "4",
              },
            ],
          }
        : {
            referenceAnswer: referenceAnswer,
          }),
    };

    // console.log(newQuestion);

    mutation.mutate(newQuestion);
  };

  return (
    <div className="px-4 py-2 mx-auto mt-12 w-full max-w-7xl">
      <form onSubmit={handleQuestionSubmit}>
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between pt-2 pb-4 gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold text-gray-50">
              {location.pathname.includes("edit-question")
                ? "Edit Question"
                : "Add Question"}
            </h1>
            <p className="text-md text-gray-400">
              {location.pathname.includes("edit-question")
                ? "Edit the question details"
                : "Fill the question details"}
            </p>
          </div>
          <div className="flex flex-col-reverse md:flex-row justify-end items-center gap-2 md:gap-4">
            <Button type="reset" variant="outline" className="w-full md:w-auto">
              <RotateCcw className="h-6 w-6" />
              Reset
            </Button>
            <Button type="submit" className="w-full md:w-auto">
              {mutation.isLoading ? (
                <Loader className="animate-spin h-6 w-6" />
              ) : (
                <PlusCircle className="h-6 w-6" />
              )}
              {location.pathname.includes("edit-question") ? "Update" : "Add"}
            </Button>
          </div>
        </header>
        <div className="flex flex-col gap-6 border border-gray-800 rounded-lg p-4">
          {/* Top Fields */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Type */}
            <div className="flex flex-col w-full flex-1 gap-2">
              <Label>Question Type</Label>
              <Select
                id="type"
                value={questionType}
                onValueChange={(value) => setQuestionType(value)}
              >
                <SelectTrigger className="text-neutral-100">
                  {/* Select value from questionType and set it according to that state value */}
                  <SelectValue
                    defaultValue={questionType}
                    placeholder={
                      questionType === "MCQ" ? "Multiple Choice" : "Programming"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MCQ">Multiple Choice</SelectItem>
                  <SelectItem value="Programming">Programming</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Category */}
            <div className="flex flex-col w-full flex-1 gap-2">
              <Label>Question Category</Label>
              <Select
                id="category"
                value={questionCategory}
                onValueChange={(value) => setQuestionCategory(value)}
              >
                <SelectTrigger className="text-neutral-100">
                  <SelectValue
                    defaultValue={questionCategory}
                    placeholder="Select the category"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Logical">Logical</SelectItem>
                  <SelectItem value="Technical">Technical</SelectItem>
                  {/* <SelectItem value="Programming">Programming</SelectItem> */}
                </SelectContent>
              </Select>
            </div>
            {/* Difficulty Level */}
            <div className="flex flex-col w-full flex-1 gap-2">
              <Label>Difficulty Level</Label>
              <Select
                id="difficulty"
                value={questionDifficulty}
                onValueChange={(value) => setQuestionDifficulty(value)}
              >
                <SelectTrigger className="text-neutral-100">
                  <SelectValue
                    defaultValue={questionDifficulty}
                    placeholder="Select the difficulty level"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Marks */}
            <div className="flex flex-col w-full flex-1 gap-2">
              <Label>Marks</Label>
              <Input
                id="marks"
                type="number"
                value={questionMarks}
                onChange={(e) => setQuestionMarks(e.target.value)}
                placeholder="Enter the marks"
                className="text-neutral-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>
          {/* Question Content Field */}
          <div className="flex flex-col gap-2 ">
            {/* Question Label and Image */}
            <Label htmlFor="question" className="text-2xl font-bold">
              Question
            </Label>
            {/* Text Editor */}
            <TextEditor content={questionTxt} setContent={setQuestionTxt} />
          </div>
          {/* Options fields if type is MCQ else Reference Answer if type is Programming */}
          {questionType === "MCQ" ? (
            <div className="flex flex-col gap-2">
              <RadioGroup
                defaultValue={correctOption}
                onValueChange={(value) => setCorrectOption(value)}
                className="flex flex-col gap-8 md:gap-4"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <Label
                      htmlFor="option1"
                      className="text-md md:text-lg font-bold"
                    >
                      Option 1
                    </Label>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem
                        value="1"
                        id="option1"
                        checked={correctOption === "1"}
                      />
                      <Label htmlFor="option1" className="text-md md:text-lg">
                        Correct
                      </Label>
                    </div>
                  </div>
                  <TextEditor
                    content={firstOptionTxt}
                    setContent={setFirstOptionTxt}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center gap-4">
                    <Label
                      htmlFor="option2"
                      className="text-md md:text-lg font-bold"
                    >
                      Option 2
                    </Label>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem
                        value="2"
                        id="option2"
                        checked={correctOption === "2"}
                      />
                      <Label htmlFor="option2" className="text-md md:text-lg">
                        Correct
                      </Label>
                    </div>
                  </div>
                  <TextEditor
                    content={secondOptionTxt}
                    setContent={setSecondOptionTxt}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center gap-4">
                    <Label
                      htmlFor="option3"
                      className="text-md md:text-lg font-bold"
                    >
                      Option 3
                    </Label>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem
                        value="3"
                        id="option3"
                        checked={correctOption === "3"}
                      />
                      <Label htmlFor="option3" className="text-md md:text-lg">
                        Correct
                      </Label>
                    </div>
                  </div>
                  <TextEditor
                    content={thirdOptionTxt}
                    setContent={setThirdOptionTxt}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center gap-4">
                    <Label
                      htmlFor="option4"
                      className="text-md md:text-lg font-bold"
                    >
                      Option 4
                    </Label>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem
                        value="4"
                        id="option4"
                        checked={correctOption === "4"}
                      />
                      <Label htmlFor="option4" className="text-md md:text-lg">
                        Correct
                      </Label>
                    </div>
                  </div>
                  <TextEditor
                    content={fourthOptionTxt}
                    setContent={setFourthOptionTxt}
                  />
                </div>
              </RadioGroup>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center gap-4">
                <Label htmlFor="refAnswer" className="text-2xl font-bold">
                  Reference Answer
                </Label>
                <LanguageSelector language={language} onSelect={onSelect} />
              </div>
              <Editor
                theme="vs-dark"
                height="50vh"
                language={language}
                defaultValue={referenceAnswer}
                value={referenceAnswer}
                onChange={(value) => setReferenceAnswer(value)}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
