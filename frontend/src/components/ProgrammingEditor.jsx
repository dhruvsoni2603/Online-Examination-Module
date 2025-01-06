/* eslint-disable react/prop-types */
import { Editor } from "@monaco-editor/react";
import { LanguageSelector } from "./LanguageSelector";
import { Loader } from "lucide-react";
import { ProgrammingOutput } from "./ProgrammingOutput";
import { useRef, useState } from "react";
import { CODE_SNIPPETS } from "@/constants/codeEditorConstants";

export const ProgrammingEditor = ({
  responses,
  handleResponse,
  questionId,
}) => {
  const editorRef = useRef();

  const [code, setCode] = useState(
    responses[questionId]?.answer || CODE_SNIPPETS["javascript"]
  );
  const [language, setLanguage] = useState(
    responses[questionId]?.language || "javascript"
  );

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (value) => {
    setLanguage(value);
    setCode(CODE_SNIPPETS[value]);
    setResponse(CODE_SNIPPETS[value], value);
  };

  const setResponse = (value, language) => {
    handleResponse(questionId, { answer: value, language });
  };

  return (
    <div className="flex flex-col gap-4 h-full m-0 p-0">
      <div className="flex flex-col justify-center gap-2 h-full">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Code Editor</h2>
          <LanguageSelector language={language} onSelect={onSelect} />
        </div>
        <Editor
          height="55vh"
          theme="vs-dark"
          language={language}
          defaultValue={code}
          value={code}
          onChange={(value) => {
            setCode(value);
            setResponse(value, language);
          }}
          onMount={onMount}
          loading={
            <div>
              <Loader className="animate-spin" />
            </div>
          }
        />
      </div>
      <div className="h-full">
        <ProgrammingOutput editorRef={editorRef} language={language} />
      </div>
    </div>
  );
};
