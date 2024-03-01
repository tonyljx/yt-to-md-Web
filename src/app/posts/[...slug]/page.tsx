import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";

import { Metadata } from "next";
import MDXContent from "@/components/mdx-content";

interface PostProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/");
  // console.log("查找: ",slug);
  // console.log(allPosts);
  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.desc,
  };
}

// to be supported
// export async function generateStaticParams(): Promise<PostProps["params"][]> {
//   return allPosts.map((post) => ({
//     slug: post.slugAsParams.split("/"),
//   }));
// }

export default async function PostPage({ params }: PostProps) {
  // console.log("posts slug", params);
  const post = await getPostFromParams(params);

  // 查到的文章
  // console.log("post slug", post)
  if (!post) {
    notFound();
  }

  return (
    <article className="container prose mx-auto py-6 dark:prose-invert">
      <h1 className="mb-2">{post.title}</h1>
      {post.desc && (
        <p className="mt-0 text-xl text-slate-700 dark:text-slate-200">
          {post.desc}
        </p>
      )}
      <hr className="my-4" />
      <MDXContent code={post.body.code} />
      {/* <div className="" dangerouslySetInnerHTML={{ __html: post.body.html }} /> */}
    </article>
  );
}
