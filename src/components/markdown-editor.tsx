"use client";
import gfm from "@bytemd/plugin-gfm";
import gemoji from "@bytemd/plugin-gemoji";
import { Editor, Viewer } from "@bytemd/react";
import { useState } from "react";
import highlight from "@bytemd/plugin-highlight";

// import "github-markdown-css/github-markdown.css";
// import "bytemd/dist/index.min.css";
import "bytemd/dist/index.css";
import "highlight.js/styles/default.css";
import styles from "./markdown-editor.module.css";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
const plugins = [
  gfm(),
  highlight(),
  gemoji(),
  // Add more plugins here
];

export default function MarkdownEditor() {
  const [value, setValue] = useState(
    "# Article\n\n\n```js\nconst a = 1233;\nconst func = () => {\n    return 123;\n}\n```\n\n## list\n1. - item1\n2. - item2\n3. - item3\n\n\n| Heading | aaaaaaaaaa | baaaaaaaaa |\n| --- | --- | --- |\n| 1 | 2 | 3 |\n\n ## Gemoji\n Thumbs up: :+1:, thumbs down: :-1:.",
  );

  const [mode, setMode] = useState<"edit" | "preview" | undefined>("edit");

  const handleToggle = () => {
    setMode(mode === "edit" ? "preview" : "edit");
  };

  // console.log(mode);

  return (
    <div
      className={cn(
        "prose flex h-full w-[50vw] flex-col gap-2 dark:prose-invert lg:prose-lg prose-code:bg-white",
      )}
    >
      {/*  prose-code:bg-white lg:prose-sm dark:prose-invert */}

      <p className="self-center text-slate-500">
        Current Mode <span className="font-bold">{mode}</span>
      </p>
      <Button className="self-center" onClick={handleToggle}>
        Toggl View Mode
      </Button>
      {mode === "edit" ? (
        <Editor
          value={value}
          plugins={plugins}
          onChange={(v) => {
            setValue(v);
          }}
        />
      ) : (
        <Viewer value={value} plugins={plugins} />
      )}
    </div>
  );
}
