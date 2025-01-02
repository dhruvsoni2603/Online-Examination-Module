/* eslint-disable react/prop-types */
import { Fragment } from "react";

import MenuItem from "./EditorMenuItem";
import {
  Bold,
  Braces,
  Code,
  Heading1,
  Heading2,
  Highlighter,
  Image,
  Italic,
  LetterText,
  List,
  ListChecks,
  ListOrdered,
  Redo2,
  RemoveFormatting,
  SeparatorHorizontal,
  Strikethrough,
  TextQuote,
  Undo2,
  WrapText,
} from "lucide-react";
import { authenticator } from "@/services/imagekitAuth";
import axios from "axios";

export default function MenuBar({ editor }) {
  const imagekitAuth = authenticator();

  // Get signature, expire, and token from imagekitAuth
  let signature, expire, token;
  imagekitAuth.then((data) => {
    signature = data.signature;
    expire = data.expire;
    token = data.token;
  });

  const items = [
    {
      icon: <Bold style={{ width: "1.5rem", height: "1.5rem" }} />,
      title: "Bold",
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive("bold"),
    },
    {
      icon: <Italic style={{ width: "1.5rem", height: "1.5rem" }} />,
      title: "Italic",
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive("italic"),
    },
    {
      icon: <Strikethrough style={{ width: "1.5rem", height: "1.5rem" }} />,
      title: "Strike",
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive("strike"),
    },
    {
      icon: <Code style={{ width: "1.5rem", height: "1.5rem" }} />,
      title: "Code",
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: () => editor.isActive("code"),
    },
    {
      icon: <Highlighter style={{ width: "1.5rem", height: "1.5rem" }} />,
      title: "Highlight",
      action: () => editor.chain().focus().toggleHighlight().run(),
      isActive: () => editor.isActive("highlight"),
    },
    {
      type: "divider",
    },
    {
      icon: <Heading1 style={{ width: "1.5rem", height: "1.5rem" }} />,
      title: "Heading 1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 style={{ width: "1.5rem", height: "1.5rem" }} />,
      title: "Heading 2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <LetterText style={{ width: "1.5rem", height: "1.5rem" }} />,
      title: "Paragraph",
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: () => editor.isActive("paragraph"),
    },
    {
      icon: <List style={{ width: "1.5rem", height: "1.5rem" }} />,
      title: "Bullet List",
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered style={{ width: "1.5rem", height: "1.5rem" }} />,
      title: "Ordered List",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList"),
    },
    {
      icon: <ListChecks style={{ width: "1.5rem", height: "1.5rem" }} />,
      title: "Task List",
      action: () => editor.chain().focus().toggleTaskList().run(),
      isActive: () => editor.isActive("taskList"),
    },
    {
      icon: <Braces style={{ width: "1.5rem", height: "1.5rem" }} />,
      title: "Code Block",
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive("codeBlock"),
    },
    {
      type: "divider",
    },
    {
      icon: <TextQuote style={{ width: "1.5rem", height: "1.5rem" }} />,
      title: "Blockquote",
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive("blockquote"),
    },
    {
      icon: <SeparatorHorizontal style={{ width: "1.5rem", height: "1.5rem" }} />,
      title: "Horizontal Rule",
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      type: "divider",
    },
    {
      icon: <WrapText style={{ width: "1.5rem", height: "1.5rem" }} />,
      title: "Hard Break",
      action: () => editor.chain().focus().setHardBreak().run(),
    },
    {
      icon: <RemoveFormatting style={{ width: "1.5rem", height: "1.5rem" }} />,
      title: "Clear Format",
      action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
    },
    {
      icon: <Image style={{ width: "1.5rem", height: "1.5rem" }} />,
      title: "Image",
      action: () => {
        // Get file from input
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = async (event) => {
          const file = event.target.files[0];
          const formData = new FormData();
          formData.append("file", file);
          formData.append("fileName", file.name);
          formData.append(
            "publicKey",
            import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY
          );
          formData.append("signature", signature);
          formData.append("expire", expire);
          formData.append("token", token);
          formData.append("useUniqueFileName", "true");

          const response = await axios.post(
            import.meta.env.VITE_IMAGEKIT_UPLOAD_URL,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (response.status === 200) {
            const data = response.data;
            const url = data.url;
            editor.chain().focus().setImage({ src: url }).run();
          }
        };
        input.click();
      },
    },
    {
      type: "divider",
    },
    {
      icon: <Undo2 style={{ width: "1.5rem", height: "1.5rem" }} />,
      title: "Undo",
      action: () => editor.chain().focus().undo().run(),
    },
    {
      icon: <Redo2 style={{ width: "1.5rem", height: "1.5rem" }} />,
      title: "Redo",
      action: () => editor.chain().focus().redo().run(),
    },
  ];

  return (
    <div className="flex md:flex-wrap gap-2 p-2">
      {items.map((item, index) => (
        <Fragment key={index}>
          {item.type === "divider" ? (
            <div className="border-r border-gray-700 h-6" />
          ) : (
            <MenuItem {...item} />
          )}
        </Fragment>
      ))}
    </div>
  );
}
