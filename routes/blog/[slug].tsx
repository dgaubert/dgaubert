import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getPost, Post } from "@/utils/posts.ts";
import { CSS, render } from "$gfm";
import Footer from "@/components/footer.tsx";
import Header from "@/components/header.tsx";
import FeedButton from "@/components/feed-button.tsx";

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    try {
      const post = await getPost(ctx.params.slug);
      return ctx.render(post as Post);
    } catch {
      return ctx.renderNotFound();
    }
  }
};

export default function PostPage(props: PageProps<Post>) {
  const post = props.data;
  const publishedAt = new Date(post.publishedAt).toLocaleDateString("en-us", { year: "numeric", month: "long", day: "numeric", });
  return (
    <>
      <Header backHome />
      <Head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>
      <main class="max-w-screen-sm mx-auto px-6 pt-16">
        <img class="mb-16" src={post.picture} />
        <h1 class="text-4xl font-bold">{post.title}</h1>
        <div class="pt-4">
          <time class="text-gray-500 text-xl pr-2">
            {publishedAt}
          </time>
          <FeedButton size={16} color="#6b7280" />
        </div>
        <div
          class="mt-8 markdown-body"
          dangerouslySetInnerHTML={{ __html: render(post.content) }}
        />
      </main>
      <Footer />
    </>
  );
}