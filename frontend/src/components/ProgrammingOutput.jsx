/* eslint-disable react/prop-types */
import { Loader, Play } from "lucide-react";
import { Button } from "./ui/button";
import { executeCode } from "@/services/api";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const ProgrammingOutput = ({ editorRef, language }) => {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { toast } = useToast();

  const beautifyOutput = (output, language) => {
    if (output === "") {
      return "";
    }

    if (language === "sql") {
      const lines = output.split("\n");
      const headers = lines[0].split("|");

      const table = `
      <table class="table-auto w-full">
        <thead>
          <tr>
            ${headers
              .map(
                (header) =>
                  `<th class="border border-gray-700 px-4 py-2">${header}</th>`
              )
              .join("")}
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    `;
      return table;
    }

    if (isError) {
      return `<pre class="text-red-500">${output}</pre>`;
    }

    return `<pre>${output}</pre>`;
  };

  const handleRunCode = async () => {
    const code = editorRef.current.getValue();
    try {
      setLoading(true);
      const data = await executeCode(code, language);
      // console.log(data);
      if (data.stderr) {
        setIsError(true);
      }
      setOutput(beautifyOutput(data.run.output, language));
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Error occurred while running the code",
        variant: "destructive",
      });
      setOutput("Error occurred while running the code");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 h-full m-0 p-0">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Output</h2>
        <Button onClick={handleRunCode}>
          {loading ? (
            <Loader className="animate-spin" />
          ) : (
            <Play className="w-6 h-6" />
          )}
          Run Code
        </Button>
      </div>
      <div className="bg-gray-900 text-gray-100 p-4 rounded-md h-full">
        {loading && (
          <div className="flex justify-center items-center">
            <Loader className="animate-spin" />
          </div>
        )}
        <div className="p-4 overflow-y-auto flex-1">
          <div dangerouslySetInnerHTML={{ __html: output }} />
        </div>
      </div>
    </div>
  );
};
