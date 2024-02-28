"use client";
import React, { useRef } from "react";
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
import { CornerDownLeft, CornerDownLeftIcon, X } from "lucide-react";
import toast from "react-hot-toast";

// 定义 YouTube URL 的正则表达式
const youtubeUrlRegex =
  /^https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)$/;

const formSchema = z.object({
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

export default function UrlInputForm({}: Props) {
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
    console.log(values);
    console.log("onSubmit");
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (!values.url) {
      return;
    }
    const matches = values.url.match(youtubeUrlRegex);
    const videoId = matches ? matches[1] : null;
    toast.success(`Videoid: ${videoId}`);
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
                <div className="relative flex w-full items-center gap-3 self-start">
                  <Input
                    className=" w-full rounded-md border pr-[2rem]  focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0  md:w-[28vw] "
                    placeholder="Input a youtube URL"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        submitRef.current?.click();
                      }
                    }}
                    {...field}
                  />
                  <CornerDownLeftIcon className="absolute right-2 h-6 w-6" />
                </div>
              </FormControl>
              {/* <FormDescription>Youtube Url</FormDescription> */}
              <FormMessage className="mt-3" />
            </FormItem>
          )}
        />

        {/* dynamic */}
        {/* Dynamic chapters */}
        <div className="mt-6">
          {fields.length > 0 && (
            <>
              <h3 className="mb-2 text-lg font-semibold">
                Chapters (Optional)
              </h3>
              <p className="duration-1200 mb-3 text-base text-gray-500 ease-in-out animate-in fade-in slide-in-from-bottom-4">
                Help segment the video subtitles
              </p>
            </>
          )}

          {fields.map((field, index) => (
            <div key={field.id} className="mb-2 flex gap-2">
              <FormField
                control={form.control}
                name={`chapters.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-full rounded-md border focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        placeholder="title e.g.(2:33)"
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
                        placeholder="timestamp e.g.(2:33)"
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
            onClick={() => append({ title: "", timestamp: "" })}
          >
            Add Chapter
          </Button>

          <Button type="submit" ref={submitRef}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
