import Link from "next/link";
import { compareDesc, format, parseISO } from "date-fns";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function Home() {
  // 按照时间排序

  // 1) Set blogs directory
  const blogDir = "blogs";

  // 2) Find all files in the blog directory
  const files = fs.readdirSync(path.join(blogDir));

  // 3) For each blog found
  const blogs = files.map((filename) => {
    // 4) Read the content of that blog
    const fileContent = fs.readFileSync(path.join(blogDir, filename), "utf-8");

    // 5) Extract the metadata from the blog's content
    const { data: frontMatter } = matter(fileContent);

    // 6) Return the metadata and page slug
    return {
      meta: frontMatter,
      slug: filename.replace(".mdx", ""),
    };
  });

  const posts = blogs.sort((a, b) => {
    return compareDesc(new Date(a.meta?.date), new Date(b.meta?.date));
  });
  return (
    <div className="flex flex-col items-stretch gap-6 md:gap-8">
      {posts.map((post) => (
        <div
          key={post.slug}
          className="mx-auto flex w-full max-w-xl flex-col justify-center rounded bg-slate-200/50 px-4 py-3"
        >
          <Link href={"/blogs/" + post.slug} passHref>
            <h2 className="text-2xl font-bold tracking-tight">
              {post.meta.title}
            </h2>
          </Link>
          <div className="flex items-center gap-3">
            {post.meta.desc && <p>{post.meta.desc}</p>}
            <time
              dateTime={post.meta.date}
              className="block text-sm text-slate-600"
            >
              {format(post.meta.date, "LLLL d, yyyy")}
            </time>
          </div>
        </div>
      ))}
    </div>
  );
}
