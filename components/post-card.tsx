import { Post } from "@/utils/posts.ts";

export default function PostCard(props: { post: Post }) {
  const { post } = props;
  return (
    <div class="py-8">
      <a class="sm:col-span-2" href={`/blog/${post.slug}`}>
        <h3 class="text-2xl font-bold">
          {post.title}
        </h3>
        <time class="text-gray-500">
          {new Date(post.publishedAt).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <div class="mt-4 text-gray-900">
          {post.snippet}
        </div>
      </a>
    </div>
  );
}