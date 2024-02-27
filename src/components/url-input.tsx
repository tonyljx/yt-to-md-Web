"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { CornerDownLeft, CornerDownLeftIcon } from "lucide-react";
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
});

type Props = {};

export default function UrlInputForm({}: Props) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
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
                <div className="relative flex w-full items-center gap-3">
                  <Input
                    className=" w-full rounded-md border pr-[2rem]  focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0  md:w-[28vw] "
                    placeholder="url"
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
        {/* <Button
          // className="flex aspect-square h-8 w-8 items-center justify-center rounded-lg text-white outline-0 ring-0 hover:bg-white/25 focus:bg-white/25"
          type="submit"
          variant="outline"
        >
          <CornerDownLeft className="h-4 w-4" />
        </Button> */}
      </form>
    </Form>
  );
}
