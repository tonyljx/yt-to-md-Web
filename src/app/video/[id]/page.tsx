"use client";
import Header from "@/components/header";
import MarkdownEditorOut from "@/components/markdown-editor-out";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Chapter {
  title: string;
  timestamp: string;
}

interface Subtitle {
  text: string;
  start: number;
}

interface VideoData {
  id: number;
  videoId: string;
  chapters: Chapter[];
  subtitle: Subtitle[];
}

interface ChapterContent {
  [key: string]: string;
}

export default function VideoPage({ params }: { params: { id: string } }) {
  const [markdown, setMarkdown] = useState<string>("");
  const [chapterContent, setChapterContent] = useState<ChapterContent>({});
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetcher = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/sub?videoId=${params.id}`);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch: ${response.status} ${response.statusText}`,
          );
        }
        const data: VideoData = await response.json();

        // Process data to generate Markdown and chapter content
        let md = "";
        const content: ChapterContent = {};
        data.chapters.forEach((chapter, index) => {
          const nextTimestamp =
            index < data.chapters.length - 1
              ? parseFloat(data.chapters[index + 1].timestamp)
              : Infinity;
          const subtitles = data.subtitle.filter(
            (sub) =>
              sub.start >= parseFloat(chapter.timestamp) &&
              sub.start < nextTimestamp,
          );
          const chapterText = subtitles.map((sub) => sub.text).join("\n\n");

          md += `## ${chapter.title}\n\n${chapterText}\n\n`;
          content[chapter.title] = chapterText;
        });

        setMarkdown(md);
        setChapterContent(content);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetcher();
  }, [params.id]);

  return (
    <div className="container">
      <Header />
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <div className="w-full justify-center">
          <h1>Markdown</h1>
          {/* <pre>{markdown}</pre> */}
          {/* <h1>Chapter Content</h1> */}
          {/* <pre>{JSON.stringify(chapterContent, null, 2)}</pre> */}
          <MarkdownEditorOut
            value={markdown}
            setValue={setMarkdown}
            className="mx-auto w-full"
          />
        </div>
      )}
    </div>
  );
}
