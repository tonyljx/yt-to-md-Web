import { notFound } from "next/navigation";
import { Metadata } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { compareDesc, format, parseISO } from "date-fns";
import { Tweet } from "react-tweet";
interface PostProps {
  params: {
    slug: string;
  };
}

// export async function generateMetadata(params: {
//   slug: string;
// }): Promise<Metadata> {
//   const post = await getPost(params);

//   if (!post) {
//     return {};
//   }

//   return {
//     title: post.frontMatter.title,
//     description: post.frontMatter.desc,
//   };
// }

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join("blogs"));

  const paths = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));

  console.log(paths);

  return paths;
}

function getPost({ slug }: { slug: string }) {
  const markdownFile = fs.readFileSync(
    path.join("blogs", slug + ".mdx"),
    "utf-8",
  );

  const { data: frontMatter, content } = matter(markdownFile);

  return {
    frontMatter,
    slug,
    content,
  };
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPost(params);

  const components = { Tweet };

  // 查到的文章
  // console.log("post slug", post)
  if (!post) {
    notFound();
  }

  return (
    <article className="container prose mx-auto py-6 dark:prose-invert">
      <h1 className="mb-2">{post.frontMatter.title}</h1>
      {post.frontMatter.desc && (
        <p className="mt-0 text-xl text-slate-700 dark:text-slate-200">
          {post.frontMatter.desc}
        </p>
      )}
      <p>{format(post.frontMatter.date, "LLLL d, yyyy")}</p>
      <hr className="my-4" />
      <MDXRemote source={post.content} components={components} />
      {/* <div className="" dangerouslySetInnerHTML={{ __html: post.body.html }} /> */}
    </article>
  );
}
