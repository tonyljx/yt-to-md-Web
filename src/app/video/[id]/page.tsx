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

function parseTimestamp(timestamp: string): number {
  const [hours, minutes, seconds] = timestamp.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
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
          const chapterStartSeconds = parseTimestamp(chapter.timestamp);
          const nextChapterStartSeconds =
            index < data.chapters.length - 1
              ? parseTimestamp(data.chapters[index + 1].timestamp)
              : Infinity;

          const subtitles = data.subtitle.filter(
            (sub) =>
              sub.start >= chapterStartSeconds &&
              sub.start < nextChapterStartSeconds,
          );

          // const chapterText = subtitles.map((sub) => sub.text).join("\n\n");
          const chapterText = subtitles.map((sub) => sub.text).join(" ");

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
    <div className="">
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <div className="w-full justify-center">
          <h1>Markdown</h1>

          <div className="grid grid-cols-2">
            <MarkdownEditorOut
              value={markdown}
              setValue={setMarkdown}
              className="mx-auto w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
