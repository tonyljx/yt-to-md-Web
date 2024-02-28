"use client";
import gfm from "@bytemd/plugin-gfm";
import gemoji from "@bytemd/plugin-gemoji";
import { Editor, Viewer } from "@bytemd/react";
import { useState } from "react";
import highlight from "@bytemd/plugin-highlight";
import "highlight.js/styles/default.css";
import "bytemd/dist/index.css";
import "github-markdown-css/github-markdown.css";
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

  return (
    <div className="prose prose-code:bg-white lg:prose-sm h-[50vh] w-[50vw] ">
      <Editor
        value={value}
        plugins={plugins}
        onChange={(v) => {
          setValue(v);
        }}
      />
    </div>
  );
}
