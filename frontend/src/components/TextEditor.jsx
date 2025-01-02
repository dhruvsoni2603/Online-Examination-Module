/* eslint-disable react/prop-types */
import "./textEditor.css";
import CharacterCount from "@tiptap/extension-character-count";
import Highlight from "@tiptap/extension-highlight";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./EditorMenuBar";
import Image from "@tiptap/extension-image";
// import { useEffect } from "react";

const handleMenuClick = (event) => {
  event.preventDefault();
  event.stopPropagation();
};

export const TextEditor = ({ content, setContent, className }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Highlight,
      TaskList,
      TaskItem,
      Image.configure({
        inline: true,
        HTMLAttributes: {
          class: "w-full h-auto",
        },
      }),
      CharacterCount.configure({
        limit: 10000,
      }),
      // Heading.configure({
      //   levels: [1, 2, 3, 4, 5, 6],
      // }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="bg-gray-900 rounded-md p-2 flex flex-col">
      <div className="overflow-auto" onClick={handleMenuClick}>
        {editor && <MenuBar editor={editor} />}
      </div>
      <EditorContent
        editor={editor}
        placeholder="Enter the question here"
        className={`bg-gray-800 rounded-md flex-1 ` + className}
      />
    </div>
  );
};
