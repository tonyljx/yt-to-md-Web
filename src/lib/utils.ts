import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type Chapter = {
  title: string;
  timestamp: string;
};

type Subtitle = {
  start: number;
  text: string;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 将时间戳转换为秒
const timestampToSeconds = (timestamp: string): number => {
  const [minutes, seconds] = timestamp.split(".").map(Number);
  return minutes * 60 + seconds;
};

// 为每个章节生成Markdown
const generateMarkdown = (
  chapters: Chapter[],
  subtitles: Subtitle[],
): string => {
  let markdown = "";

  chapters.forEach((chapter, index) => {
    const chapterStart = timestampToSeconds(chapter.timestamp);
    const nextChapter = chapters[index + 1];
    const chapterEnd = nextChapter
      ? timestampToSeconds(nextChapter.timestamp)
      : Infinity;

    markdown += `## ${chapter.title}\n\n`;

    const chapterSubtitles = subtitles.filter((subtitle) => {
      return subtitle.start >= chapterStart && subtitle.start < chapterEnd;
    });

    chapterSubtitles.forEach((subtitle) => {
      markdown += `${subtitle.text}`;
    });

    markdown += "\n";
  });

  return markdown;
};
