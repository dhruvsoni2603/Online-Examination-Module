import { ResultCard } from "@/components/ResultCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFetchExamResults } from "@/hooks/useFetchData";
import { Eye, Loader } from "lucide-react";

export const ResultsPage = () => {
  const { examResults, isLoading, error } = useFetchExamResults();

  console.log(examResults);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="animate-spin h-6 w-6" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-2xl font-bold text-red-500 h-96 flex flex-col items-center justify-center">
        Error: {error.message}
      </div>
    );
  }

  //   [
  //     {
  //         "examId": "2b1f98b2-1f35-4e98-abbe-b99a8b723c38",
  //         "title": "ABC College Technical Skills and Coding Challenge",
  //         "description": "A comprehensive test covering technical concepts, debugging, and competitive programming to evaluate coding proficiency and technical knowledge for placement opportunities.",
  //         "mcqQuestions": [
  //             {
  //                 "questionId": "38835efd-4b59-447a-8957-1761c8a263c0",
  //                 "text": "<p>What is the time complexity of a binary search algorithm?</p>",
  //                 "category": "Technical",
  //                 "type": "MCQ",
  //                 "difficultyLevel": "Hard",
  //                 "marks": 3,
  //                 "options": [
  //                     {
  //                         "text": "<p>O(1)</p>",
  //                         "responsesCount": 0,
  //                         "isCorrect": false
  //                     },
  //                     {
  //                         "text": "<p>O(log n)</p>",
  //                         "responsesCount": 1,
  //                         "isCorrect": true
  //                     },
  //                     {
  //                         "text": "<p>O(n²)</p>",
  //                         "responsesCount": 0,
  //                         "isCorrect": false
  //                     },
  //                     {
  //                         "text": "<p>O(n)</p>",
  //                         "responsesCount": 0,
  //                         "isCorrect": false
  //                     }
  //                 ]
  //             },
  //             {
  //                 "questionId": "4f59b6a9-3a7e-4c52-a266-00220a135e38",
  //                 "text": "<p>What is the next number in the sequence: 2, 4, 8, 16?</p>",
  //                 "category": "Logical",
  //                 "type": "MCQ",
  //                 "difficultyLevel": "Easy",
  //                 "marks": 1,
  //                 "options": [
  //                     {
  //                         "text": "<p>24</p>",
  //                         "responsesCount": 0,
  //                         "isCorrect": false
  //                     },
  //                     {
  //                         "text": "<p>32</p>",
  //                         "responsesCount": 0,
  //                         "isCorrect": true
  //                     },
  //                     {
  //                         "text": "<p>18</p>",
  //                         "responsesCount": 1,
  //                         "isCorrect": false
  //                     },
  //                     {
  //                         "text": "<p>64</p>",
  //                         "responsesCount": 0,
  //                         "isCorrect": false
  //                     }
  //                 ]
  //             },
  //             {
  //                 "questionId": "8640e561-f2a3-414c-9b41-862c292711a9",
  //                 "text": "<p>Which layer in the OSI model is responsible for routing?</p>",
  //                 "category": "Technical",
  //                 "type": "MCQ",
  //                 "difficultyLevel": "Medium",
  //                 "marks": 2,
  //                 "options": [
  //                     {
  //                         "text": "<p>Network</p>",
  //                         "responsesCount": 0,
  //                         "isCorrect": true
  //                     },
  //                     {
  //                         "text": "<p>Application</p>",
  //                         "responsesCount": 1,
  //                         "isCorrect": false
  //                     },
  //                     {
  //                         "text": "<p>Datalink</p>",
  //                         "responsesCount": 0,
  //                         "isCorrect": false
  //                     },
  //                     {
  //                         "text": "<p>Transport</p>",
  //                         "responsesCount": 0,
  //                         "isCorrect": false
  //                     }
  //                 ]
  //             }
  //         ],
  //         "programmingQuestions": [
  //             {
  //                 "id": "7aae467a-7665-4093-96e7-6f70802f5e9c",
  //                 "text": "<p>Write a Python script to count the number of occurrences of each word in a given text file.</p>",
  //                 "category": "Technical",
  //                 "type": "Programming",
  //                 "difficultyLevel": "Medium",
  //                 "marks": 5,
  //                 "referenceAnswer": "<p><code>from collections import Counter with open(\"file.txt\", \"r\") as file: data = file.read().split() word_count = Counter(data) print(word_count)</code></p>",
  //                 "studentResponses": [
  //                     {
  //                         "studentName": "Cristiano Ronaldo",
  //                         "questionId": "7aae467a-7665-4093-96e7-6f70802f5e9c",
  //                         "language": "python",
  //                         "response": "def hello_world():\n    print(\"Hello, Python 1!\")\n\nhello_world()\n"
  //                     }
  //                 ]
  //             },
  //             {
  //                 "id": "1d781351-b4c3-4e99-954f-2d88e1edfac6",
  //                 "text": "<p>Write a Java program to find the nth Fibonacci number using dynamic programming.</p>",
  //                 "category": "Technical",
  //                 "type": "Programming",
  //                 "difficultyLevel": "Hard",
  //                 "marks": 6,
  //                 "referenceAnswer": "<p><code>int fibonacci(int n) { int[] dp = new int[n+1]; dp[0] = 0; dp[1] = 1; for (int i = 2; i &lt;= n; i++) dp[i] = dp[i-1] + dp[i-2]; return dp[n]; }</code></p>",
  //                 "studentResponses": [
  //                     {
  //                         "studentName": "Cristiano Ronaldo",
  //                         "questionId": "1d781351-b4c3-4e99-954f-2d88e1edfac6",
  //                         "language": "java",
  //                         "response": "public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, Java!\");\n    }\n}\n"
  //                     }
  //                 ]
  //             },
  //             {
  //                 "id": "dca3ff78-0a41-4b12-9a45-51b8380fc471",
  //                 "text": "<p>Write a function in C to check if a given number is prime.</p>",
  //                 "category": "Technical",
  //                 "type": "Programming",
  //                 "difficultyLevel": "Medium",
  //                 "marks": 4,
  //                 "referenceAnswer": "<p><code>int is_prime(int n) { if (n &lt; 2) return 0; for (int i = 2; i*i &lt;= n; i++) if (n % i == 0) return 0; return 1; }</code></p>",
  //                 "studentResponses": [
  //                     {
  //                         "studentName": "Cristiano Ronaldo",
  //                         "questionId": "dca3ff78-0a41-4b12-9a45-51b8380fc471",
  //                         "language": "cpp",
  //                         "response": "#include <iostream>\n\nint main() {\n    std::cout << \"Hello, C++!\" << std::endl;\n    return 0;\n}\n"
  //                     }
  //                 ]
  //             },
  //             {
  //                 "id": "efd39628-3e36-4303-afdc-ef4cab976835",
  //                 "text": "<p>Write a Python program to reverse a string.</p>",
  //                 "category": "Technical",
  //                 "type": "Programming",
  //                 "difficultyLevel": "Easy",
  //                 "marks": 3,
  //                 "referenceAnswer": "<p><code>def reverse_string(s): return s[::-1]</code></p>",
  //                 "studentResponses": [
  //                     {
  //                         "studentName": "Cristiano Ronaldo",
  //                         "questionId": "efd39628-3e36-4303-afdc-ef4cab976835",
  //                         "language": "javascript",
  //                         "response": "function helloWorld() {\n  console.log(\"String reverse program\");\n}\n\nhelloWorld();\n"
  //                     }
  //                 ]
  //             }
  //         ],
  //         "passedStudents": []
  //     }
  // ]

  return (
    <div className="px-4 py-2 mx-auto mt-14 w-full max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {examResults.map((result) => (
          <ResultCard key={result.examId} result={result} />
        ))}
      </div>
    </div>
  );
};
