import Link from "next/link";
import { compareDesc, format, parseISO } from "date-fns";
import { allPosts } from "contentlayer/generated";

export default function Home() {
  // 按照时间排序
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });
  return (
    <div className="container prose mx-auto dark:prose-invert">
      {posts.map((post) => (
        <article key={post._id}>
          <Link href={post.url}>
            <h2>{post.title}</h2>
          </Link>
          <div className="flex items-center gap-3">
            {post.desc && <p>{post.desc}</p>}
            <time dateTime={post.date} className="block text-sm text-slate-600">
              {format(parseISO(post.date), "LLLL d, yyyy")}
            </time>
          </div>
        </article>
      ))}
    </div>
  );
}
