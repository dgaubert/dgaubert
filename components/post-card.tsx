import { Blog, Micro, Picture, Media, Post } from "@/utils/posts.ts";

export default function PostCard(props: { post: Post }) {
  const { post } = props;
  const publishedAt = new Date(post.publishedAt).toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  if (post.type === "blog") {
    const blog = post as Blog;
    return (
      <div class="py-8 border-t-2">
        <a href={`/blog/${blog.slug}`}>
          <time class="text-gray-500 mb-8">
            {publishedAt}
          </time>
          <h3 class="text-2xl font-bold my-8">
            {blog.title}
          </h3>
          <img class="my-8" src={blog.picture} />
          <div class="mt-4 text-gray-900">
            {blog.snippet}
          </div>
        </a>
      </div>
    );
  }

  if (post.type === "picture") {
    const picture = post as Picture;
    return (
      <div class="py-8 border-t-2">
        <a href={`/picture/${picture.slug}`}>
          <time class="text-gray-500">
            {publishedAt}
          </time>
          <img class="w-full my-8" src={picture.picture} />
          <div class="mt-4 text-gray-900">
            {picture.snippet}
          </div>
        </a>
      </div>
    );
  }

  // post.type === "micro"
  if (post.type === "micro") {
    const micro = post as Micro;
    return (
      <div class="py-8 border-t-2">
        <a href={`/micro/${micro.slug}`}>
          <time class="text-gray-500">
            {publishedAt}
          </time>
          <div class="mt-4 text-gray-900">
            {micro.snippet}
          </div>
        </a>
      </div>
    );
  }
  
  // post.type === "media"
  const link = post as Media;
  return (
    <div class="py-8 border-t-2">
    <a href={`/media/${link.slug}`}>
      <time class="text-gray-500 mb-8">
        {publishedAt}
      </time>
      <h3 class="text-2xl font-bold my-8">
        {link.title}
      </h3>
      <img class="my-8" src={link.thumbnail} />
      <div class="mt-4 text-gray-900">
        {link.snippet}
      </div>
    </a>
  </div>
);
}
