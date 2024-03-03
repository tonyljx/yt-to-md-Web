"use client";
import MarkdownEditorOut from "@/components/markdown-editor-out";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

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

  // chat data
  const [message, setMessage] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiMessageLoading, setAiMessageLoading] = useState(false);
  const onAIMessage = (userMessage: string) => {
    setAiMessageLoading(true);
    fetch(`/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    })
      .then((response) => {
        if (response.status === 200) {
          // console.log("Success");
          return response.json();
        } else {
          throw new Error("Failed to fetch");
        }
      })
      .then((data) => {
        setAiResponse(data?.message?.message?.content);
        toast.success("ai convert success");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("chat error");
      })
      .finally(() => {
        setAiMessageLoading(false);
      });
  };

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
        <Loader2 className="mx-auto animate-spin" />
      ) : (
        <div className="w-full justify-center">
          <div className="grid grid-cols-2">
            <MarkdownEditorOut
              value={markdown}
              setValue={setMarkdown}
              className="mx-auto w-full"
            />
            <div className="flex flex-col gap-6">
              {/* ai convert */}
              <h2 className="text-3xl font-bold tracking-tighter">
                AI Assistant
              </h2>
              <Textarea
                className="h-[20vh] border-2 md:h-[30vh]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button
                className="flex gap-2"
                disabled={aiMessageLoading}
                onClick={() => onAIMessage(message)}
              >
                {aiMessageLoading && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                Convert
              </Button>

              <Textarea className="flex-1" value={aiResponse}></Textarea>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
