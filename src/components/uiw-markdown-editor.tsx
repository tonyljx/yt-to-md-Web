"use client";
import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import styles from "./uiw-markdown-editor.module.css";
type Props = {};

const code =
  "# Article\n\n\n```js\nconst a = 1233;\nconst func = () => {\n    return 123;\n}\n```\n";

export default function UiwMarkdownEditor({}: Props) {
  const [value, setValue] = useState(code);
  const handleChange = (newValue: string | undefined) => {
    if (newValue !== undefined) {
      setValue(newValue);
    }
  };
  return (
    <div className="container" data-color-mode="light">
      {/* <div className="wmde-markdown-var"> </div> */}
      <MDEditor
        minHeight={500}
        height="100%"
        value={value}
        onChange={handleChange}
      />
      {/* <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} /> */}
    </div>
  );
}
