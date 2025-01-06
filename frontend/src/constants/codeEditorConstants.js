export const LANGUAGE_VERSIONS = {
  javascript: "1.32.3",
  python: "3.10.0",
  java: "15.0.2",
  sql: "3.36.0",
  cpp: "10.2.0",
};

export const CODE_SNIPPETS = {
  javascript: `function helloWorld() {\n  console.log("Hello, World!");\n}\n\nhelloWorld();\n`,
  python: `def hello_world():\n    print("Hello, World!")\n\nhello_world()\n`,
  java: `public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}\n`,
  sql: `CREATE TABLE students (\n    id INT PRIMARY KEY,\n    name VARCHAR(255) NOT NULL,\n    age INT NOT NULL\n);\nINSERT INTO students (id, name, age) VALUES (1, 'John Doe', 20);\nSELECT * FROM students;\n `,
  cpp: `#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}\n`,
};
