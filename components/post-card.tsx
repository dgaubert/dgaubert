import { Post } from "@/utils/posts.ts";

export default function PostCard(props: { post: Post }) {
  const { post } = props;
  const publishedAt = new Date(post.publishedAt).toLocaleDateString("en-us", { year: "numeric", month: "long", day: "numeric" })
  return (
    <div class="py-8">
      <a href={`/blog/${post.slug}`}>
        <img class="mb-8" src={post.picture} />
        <h3 class="text-2xl font-bold mb-2">
          {post.title}
        </h3>
        <time class="text-gray-500">
          {publishedAt}
        </time>
        <div class="mt-4 text-gray-900">
          {post.snippet}
        </div>
      </a>
    </div>
  );
}