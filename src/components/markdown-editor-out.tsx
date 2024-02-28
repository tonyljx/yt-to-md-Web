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

export default function MarkdownEditorOut({
  value,
  setValue,
  className,
}: {
  value: string;
  setValue: (value: string) => void;
  className?: string;
}) {
  const [mode, setMode] = useState<"edit" | "preview" | undefined>("edit");

  const handleToggle = () => {
    setMode(mode === "edit" ? "preview" : "edit");
  };

  // console.log(mode);

  return (
    <div
      className={cn(
        "prose lg:prose-lg dark:prose-invert flex h-full w-[50vw] flex-col gap-2",
        className,
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
