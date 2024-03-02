"use client";
import React, { useRef, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CornerDownLeft, CornerDownLeftIcon, Loader2, X } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { MyCard } from "./card";

// 定义 YouTube URL 的正则表达式
const youtubeUrlRegex =
  /^https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)$/;

export const formSchema = z.object({
  url: z
    .string()
    // 首先确保是有效的 URL
    .url({ message: "Invalid URL." })
    // 使用 refine 和正则表达式进一步验证 URL 格式
    .refine((value) => youtubeUrlRegex.test(value), {
      message: "URL must be a valid YouTube video link.",
    }),
  chapters: z.array(
    z.object({
      title: z.string().min(1, { message: "Product Name is required" }),
      timestamp: z.string().min(1, {
        message: "Product Description is required",
      }),
    }),
  ),
});

type Props = {};

interface IParsed {
  title: string;
  description: string;
}

export default function UrlInputForm({}: Props) {
  const [loading, setLoading] = useState(false);
  const [parseLoading, setParseLoading] = useState(false);
  const [parsedContent, setParsedContent] = useState<IParsed>({
    title: "",
    description: "",
  });

  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      chapters: [],
    },
  });

  // 动态元素(允许增加chapter)
  const { fields, append, remove } = useFieldArray({
    name: "chapters",
    control: form.control,
  });

  // https://github.com/Pondorasti/emojis/blob/9e6c3f0f4308a99eccfe8ec479a84a3051dfaf52/src/app/_components/emoji-form/index.tsx
  const submitRef = useRef<React.ElementRef<"button">>(null);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    if (!values.url) {
      return;
    }
    const matches = values.url.match(youtubeUrlRegex);
    const videoId = matches ? matches[1] : null;

    const postData = {
      videoId,
      chapters: values.chapters,
    };
    fetch(`/api/sub?videoId=${videoId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
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
        toast.success(`${data?.message} ready to redirect`);
        setTimeout(() => {
          router.push(`/video/${videoId}`);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("upload failed");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function onParse(values: z.infer<typeof formSchema>) {
    toast.success(JSON.stringify(values));
    if (!values.url) {
      return;
    }
    const matches = values.url.match(youtubeUrlRegex);
    const videoId = matches ? matches[1] : null;
    setParseLoading(true);
    fetch(`/api/video?videoId=${videoId}`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Failed to fetch");
        }
      })
      .then((data) => {
        toast.success(`parse success`);
        setParsedContent({
          title: data?.items[0]?.snippet?.title,
          description: data?.items[0]?.snippet?.description,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("parse failed");
      })
      .finally(() => {
        setParseLoading(false);
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        // className="flex   rounded-xl bg-transparent  shadow-lg"
      >
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Youtube Url</FormLabel> */}
              <FormControl>
                <div className="relative  flex w-full items-center justify-center gap-3 self-start">
                  <Input
                    className="w-full rounded-md border pr-[2rem]  focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0  md:w-[28vw] "
                    placeholder="Input a youtube URL"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        submitRef.current?.click();
                      }
                    }}
                    {...field}
                  />
                  <Button
                    type="submit"
                    className="flex items-center gap-2"
                    ref={submitRef}
                    disabled={loading}
                  >
                    {loading && <Loader2 className="animate-spin" />}
                    Submit
                  </Button>
                  {/* <CornerDownLeftIcon className="absolute right-2 h-6 w-6" /> */}
                </div>
              </FormControl>
              {/* <FormDescription>Youtube Url</FormDescription> */}
              <FormMessage className="mt-3" />
            </FormItem>
          )}
        />

        {/* dynamic */}
        {/* Dynamic chapters */}
        <div className="mx-auto mt-6">
          {fields.length > 0 && (
            <>
              <h3 className="mb-2 text-center text-lg font-semibold">
                Chapters (Optional)
              </h3>
              <p className="duration-1200 mb-3 text-center text-base text-gray-500 ease-in-out animate-in fade-in slide-in-from-bottom-4">
                Help segment the video subtitles
              </p>
            </>
          )}

          {fields.map((field, index) => (
            <div key={field.id} className="mb-2 flex justify-center gap-2">
              <FormField
                control={form.control}
                name={`chapters.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-full rounded-md border focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        placeholder="title e.g.(Intro Section)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="mt-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`chapters.${index}.timestamp`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-full rounded-md border focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        placeholder="timestamp e.g.(2.33)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="mt-3" />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                onClick={() => remove(index)}
                className="rounded"
              >
                <X className="text-red-500" />
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => append({ title: "", timestamp: "" })}
          >
            Add Chapter
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={() => onParse(form.getValues())}
            disabled={parseLoading}
            className="flex items-center gap-2"
          >
            {parseLoading && <Loader2 className="animate-spin" />}
            Parse Video
          </Button>
        </div>
      </form>

      {/* parsed content */}
      <div className="flex justify-center gap-2">
        <MyCard
          title="youtube title"
          desc="use parse video below are youtube title"
          content={parsedContent?.title}
        />
        <MyCard
          title="youtube desc"
          desc="use parse video below are youtube desc"
          content={parsedContent?.description}
        />
      </div>
    </Form>
  );
}
