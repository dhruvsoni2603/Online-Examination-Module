import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useFetchExamResultById } from "@/hooks/useFetchData";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";

export const SingleResultPage = () => {
  // get the examId from the URL params
  const { id } = useParams();

  // console.log(id);

  const { examResult, isLoading, error } = useFetchExamResultById(id);

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Loader className="animate-spin h-6 w-6" />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-2xl font-bold text-red-500 flex flex-col items-center justify-center">
        Error: {error.message}
      </div>
    );

  // console.log(examResult);

  // {
  //     "examId": "2b1f98b2-1f35-4e98-abbe-b99a8b723c38",
  //     "title": "ABC College Technical Skills and Coding Challenge",
  //     "description": "A comprehensive test covering technical concepts, debugging, and competitive programming to evaluate coding proficiency and technical knowledge for placement opportunities.",
  //     "mcqQuestions": [
  //         {
  //             "questionId": "38835efd-4b59-447a-8957-1761c8a263c0",
  //             "text": "<p>What is the time complexity of a binary search algorithm?</p>",
  //             "category": "Technical",
  //             "type": "MCQ",
  //             "difficultyLevel": "Hard",
  //             "marks": 3,
  //             "options": [
  //                 {
  //                     "text": "<p>O(1)</p>",
  //                     "responsesCount": 0,
  //                     "isCorrect": false
  //                 },
  //                 {
  //                     "text": "<p>O(log n)</p>",
  //                     "responsesCount": 1,
  //                     "isCorrect": true
  //                 },
  //                 {
  //                     "text": "<p>O(n²)</p>",
  //                     "responsesCount": 0,
  //                     "isCorrect": false
  //                 },
  //                 {
  //                     "text": "<p>O(n)</p>",
  //                     "responsesCount": 0,
  //                     "isCorrect": false
  //                 }
  //             ]
  //         },
  //         {
  //             "questionId": "4f59b6a9-3a7e-4c52-a266-00220a135e38",
  //             "text": "<p>What is the next number in the sequence: 2, 4, 8, 16?</p>",
  //             "category": "Logical",
  //             "type": "MCQ",
  //             "difficultyLevel": "Easy",
  //             "marks": 1,
  //             "options": [
  //                 {
  //                     "text": "<p>24</p>",
  //                     "responsesCount": 0,
  //                     "isCorrect": false
  //                 },
  //                 {
  //                     "text": "<p>32</p>",
  //                     "responsesCount": 0,
  //                     "isCorrect": true
  //                 },
  //                 {
  //                     "text": "<p>18</p>",
  //                     "responsesCount": 1,
  //                     "isCorrect": false
  //                 },
  //                 {
  //                     "text": "<p>64</p>",
  //                     "responsesCount": 0,
  //                     "isCorrect": false
  //                 }
  //             ]
  //         },
  //         {
  //             "questionId": "8640e561-f2a3-414c-9b41-862c292711a9",
  //             "text": "<p>Which layer in the OSI model is responsible for routing?</p>",
  //             "category": "Technical",
  //             "type": "MCQ",
  //             "difficultyLevel": "Medium",
  //             "marks": 2,
  //             "options": [
  //                 {
  //                     "text": "<p>Network</p>",
  //                     "responsesCount": 0,
  //                     "isCorrect": true
  //                 },
  //                 {
  //                     "text": "<p>Application</p>",
  //                     "responsesCount": 1,
  //                     "isCorrect": false
  //                 },
  //                 {
  //                     "text": "<p>Datalink</p>",
  //                     "responsesCount": 0,
  //                     "isCorrect": false
  //                 },
  //                 {
  //                     "text": "<p>Transport</p>",
  //                     "responsesCount": 0,
  //                     "isCorrect": false
  //                 }
  //             ]
  //         }
  //     ],
  //     "programmingQuestions": [
  //         {
  //             "id": "7aae467a-7665-4093-96e7-6f70802f5e9c",
  //             "text": "<p>Write a Python script to count the number of occurrences of each word in a given text file.</p>",
  //             "category": "Technical",
  //             "type": "Programming",
  //             "difficultyLevel": "Medium",
  //             "marks": 5,
  //             "referenceAnswer": "<p><code>from collections import Counter with open(\"file.txt\", \"r\") as file: data = file.read().split() word_count = Counter(data) print(word_count)</code></p>",
  //             "studentResponses": [
  //                 {
  //                     "studentName": "Cristiano Ronaldo",
  //                     "questionName": "<p>Write a Python script to count the number of occurrences of each word in a given text file.</p>",
  //                     "language": "python",
  //                     "response": "def hello_world():\n    print(\"Hello, Python 1!\")\n\nhello_world()\n"
  //                 }
  //             ]
  //         },
  //         {
  //             "id": "1d781351-b4c3-4e99-954f-2d88e1edfac6",
  //             "text": "<p>Write a Java program to find the nth Fibonacci number using dynamic programming.</p>",
  //             "category": "Technical",
  //             "type": "Programming",
  //             "difficultyLevel": "Hard",
  //             "marks": 6,
  //             "referenceAnswer": "<p><code>int fibonacci(int n) { int[] dp = new int[n+1]; dp[0] = 0; dp[1] = 1; for (int i = 2; i &lt;= n; i++) dp[i] = dp[i-1] + dp[i-2]; return dp[n]; }</code></p>",
  //             "studentResponses": [
  //                 {
  //                     "studentName": "Cristiano Ronaldo",
  //                     "questionName": "<p>Write a Java program to find the nth Fibonacci number using dynamic programming.</p>",
  //                     "language": "java",
  //                     "response": "public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, Java!\");\n    }\n}\n"
  //                 }
  //             ]
  //         },
  //         {
  //             "id": "dca3ff78-0a41-4b12-9a45-51b8380fc471",
  //             "text": "<p>Write a function in C to check if a given number is prime.</p>",
  //             "category": "Technical",
  //             "type": "Programming",
  //             "difficultyLevel": "Medium",
  //             "marks": 4,
  //             "referenceAnswer": "<p><code>int is_prime(int n) { if (n &lt; 2) return 0; for (int i = 2; i*i &lt;= n; i++) if (n % i == 0) return 0; return 1; }</code></p>",
  //             "studentResponses": [
  //                 {
  //                     "studentName": "Cristiano Ronaldo",
  //                     "questionName": "<p>Write a function in C to check if a given number is prime.</p>",
  //                     "language": "cpp",
  //                     "response": "#include <iostream>\n\nint main() {\n    std::cout << \"Hello, C++!\" << std::endl;\n    return 0;\n}\n"
  //                 }
  //             ]
  //         },
  //         {
  //             "id": "efd39628-3e36-4303-afdc-ef4cab976835",
  //             "text": "<p>Write a Python program to reverse a string.</p>",
  //             "category": "Technical",
  //             "type": "Programming",
  //             "difficultyLevel": "Easy",
  //             "marks": 3,
  //             "referenceAnswer": "<p><code>def reverse_string(s): return s[::-1]</code></p>",
  //             "studentResponses": [
  //                 {
  //                     "studentName": "Cristiano Ronaldo",
  //                     "questionName": "<p>Write a Python program to reverse a string.</p>",
  //                     "language": "javascript",
  //                     "response": "function helloWorld() {\n  console.log(\"String reverse program\");\n}\n\nhelloWorld();\n"
  //                 }
  //             ]
  //         }
  //     ],
  //     "passedStudents": [
  //   {
  //     "studentId": "student1",
  //     "name": "John Doe",
  //     "mcqResponses": [
  //       {
  //         "questionText": "What is the capital of France?",
  //         "selectedOption": "Paris"
  //       },
  //       {
  //         "questionText": "What is 2 + 2?",
  //         "selectedOption": "4"
  //       }
  //     ],
  //     "programmingResponses": [
  //       {
  //         "questionText": "Write a function to reverse a string.",
  //         "response": "def reverse_string(s): return s[::-1]"
  //       },
  //       {
  //         "questionText": "Implement a function to calculate Fibonacci numbers.",
  //         "response": "function fib(n) { if (n <= 1) return n; return fib(n - 1) + fib(n - 2); }"
  //       }
  //     ]
  //   }
  // ]
  // }

  return (
    <div className="px-4 py-2 mx-auto mt-14 w-full max-w-7xl">
      {/* Title and Description */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-gray-100">{examResult.title}</h1>
        <p className="text-gray-400">{examResult.description}</p>
      </div>
      <Separator className="my-4" />
      {/* MCQ Questions */}
      {examResult.mcqQuestions.length > 0 ? (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold text-gray-100">
            MCQ Questions
          </h2>
          <Accordion type="multiple" className="mt-4 flex flex-col gap-4">
            {examResult.mcqQuestions.map((question) => (
              <AccordionItem
                key={question.questionId}
                value={question.questionId}
                className="border border-gray-700 rounded-lg"
              >
                <AccordionTrigger>
                  <div className="flex items-center justify-between gap-4">
                    <h3
                      className="text-md font-semibold text-gray-100"
                      dangerouslySetInnerHTML={{ __html: question.text }}
                    />
                    <div className="flex gap-2">
                      <Badge className="bg-blue-700 hover:bg-blue-600">
                        {question.category}
                      </Badge>
                      <Badge className="bg-red-700 hover:bg-red-600">
                        {question.difficultyLevel}
                      </Badge>
                      <Badge className="bg-pink-700 hover:bg-pink-600">
                        {question.marks} Marks
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    {question.options.map((option, index) => (
                      <div
                        key={index}
                        className="bg-gray-800 rounded-lg p-4 shadow-lg text-white"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div
                            dangerouslySetInnerHTML={{ __html: option.text }}
                          />
                          {option.isCorrect && (
                            <Badge className="bg-green-700 hover:bg-green-600">
                              Correct
                            </Badge>
                          )}
                        </div>
                        <div className="">
                          <Progress
                            value={option.responsesCount}
                            max={examResult.passedStudents.length}
                            className="mt-2 bg-gray-700"
                          />
                          <span className="text-xs text-gray-400">
                            {option.responsesCount === 1
                              ? `${option.responsesCount} response`
                              : `${option.responsesCount} responses`}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ) : (
        <div className="text-center text-2xl font-bold text-red-500 flex flex-col items-center justify-center">
          No MCQ Questions found
        </div>
      )}
      <Separator className="my-4" />
      {/* Programming Questions */}
      {examResult.programmingQuestions.length > 0 ? (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold text-gray-100">
            Programming Questions
          </h2>
          <Accordion type="multiple" className="mt-4 flex flex-col gap-4">
            {examResult.programmingQuestions.map((question) => (
              <AccordionItem
                key={question.id}
                value={question.id}
                className="border border-gray-700 rounded-lg"
              >
                <AccordionTrigger>
                  <div className="flex items-center justify-between gap-4">
                    <h3
                      className="text-md font-semibold text-gray-100"
                      dangerouslySetInnerHTML={{ __html: question.text }}
                    />
                    <div className="flex gap-2">
                      <Badge className="bg-blue-700 hover:bg-blue-600">
                        {question.category}
                      </Badge>
                      <Badge className="bg-red-700 hover:bg-red-600">
                        {question.difficultyLevel}
                      </Badge>
                      <Badge className="bg-pink-700 hover:bg-pink-600">
                        {question.marks} Marks
                      </Badge>
                      <Badge className="bg-green-700 hover:bg-green-600">
                        {question.studentResponses.length === 1
                          ? `${question.studentResponses.length} Response`
                          : `${question.studentResponses.length} Responses`}
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-4 p-4">
                    {/* Reference Answer */}
                    <div className="bg-gray-800 rounded-lg p-4 shadow-lg text-white">
                      <h4 className="text-lg font-semibold text-gray-100">
                        Reference Answer
                      </h4>
                      <div
                        className="bg-gray-900 p-4 rounded-lg mt-2"
                        dangerouslySetInnerHTML={{
                          __html: question.referenceAnswer,
                        }}
                      />
                    </div>
                    {question.studentResponses.map((response, index) => (
                      <div
                        key={index}
                        className="bg-gray-800 rounded-lg p-4 shadow-lg text-white"
                      >
                        {/* Student Name */}
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <h4 className="text-lg font-semibold text-gray-100">
                              {response.studentName}
                            </h4>
                            <Badge className="bg-blue-700 hover:bg-blue-600">
                              {response.language.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        {/* Code */}
                        <div className="mt-2">
                          <pre className="bg-gray-900 p-4 rounded-lg">
                            <code>{response.response}</code>
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ) : (
        <div className="text-center text-2xl font-bold text-red-500 flex flex-col items-center justify-center">
          No Programming Questions found
        </div>
      )}
      <Separator className="my-4" />
      {/* Passed Students */}
      {examResult.passedStudents.length > 0 ? (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold text-gray-100">
            Passed Students
          </h2>
          <Accordion type="single" className="mt-4 flex flex-col gap-4">
            {examResult.passedStudents.map((student) => (
              <AccordionItem
                key={student.studentId}
                value={student.studentId}
                className="border border-gray-700 rounded-lg"
              >
                <AccordionTrigger>
                  <div className="flex items-center justify-between gap-4">
                    <h3
                      className="text-md font-semibold text-gray-100"
                      dangerouslySetInnerHTML={{ __html: student.name }}
                    />
                    <div className="flex gap-2">
                      <Badge className="bg-green-700 hover:bg-green-600">
                        {student.mcqResponses.length} MCQs
                      </Badge>
                      <Badge className="bg-blue-700 hover:bg-blue-600">
                        {student.programmingResponses.length} Programming
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-4 p-4">
                    {/* MCQ Responses */}
                    <div>
                      <Accordion
                        type="multiple"
                        className="flex flex-col gap-4"
                      >
                        <AccordionItem
                          value="mcq"
                          className="border border-gray-700 rounded-lg"
                        >
                          <AccordionTrigger>
                            <h4 className="text-lg font-semibold text-gray-100">
                              MCQ Responses
                            </h4>
                          </AccordionTrigger>
                          <AccordionContent className="px-4">
                            {student.mcqResponses.map((response, index) => (
                              <div
                                key={index}
                                className="bg-gray-800 rounded-lg p-4 shadow-lg text-white mt-2"
                              >
                                <div className="flex items-center justify-between gap-4">
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: response.questionText,
                                    }}
                                  />
                                  <Badge className="bg-green-700 hover:bg-green-600">
                                    {response.selectedOption}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                    {/* Programming Responses */}
                    <div>
                      <Accordion
                        type="multiple"
                        className="flex flex-col gap-4"
                      >
                        <AccordionItem
                          value="programming"
                          className="border border-gray-700 rounded-lg"
                        >
                          <AccordionTrigger>
                            <h4 className="text-lg font-semibold text-gray-100">
                              Programming Responses
                            </h4>
                          </AccordionTrigger>
                          <AccordionContent className="px-4">
                            {student.programmingResponses.map(
                              (response, index) => (
                                <div
                                  key={index}
                                  className="bg-gray-800 rounded-lg p-4 shadow-lg text-white mt-2"
                                >
                                  <div className="flex flex-col gap-4">
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: response.questionText,
                                      }}
                                    />
                                    <pre className="bg-gray-900 p-4 rounded-lg">
                                      <code>{response.response}</code>
                                    </pre>
                                  </div>
                                </div>
                              )
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ) : (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold text-gray-100">
            Passed Students
          </h2>
          <div className="bg-gray-800 rounded-lg p-4 shadow-lg text-white mt-2">
            No Passed Students found
          </div>
        </div>
      )}
    </div>
  );
};
