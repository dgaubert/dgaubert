import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getPost, Post } from "@/utils/posts.ts";
import { CSS, render } from "$gfm";
import Footer from "@/components/footer.tsx";
import Header from "@/components/header.tsx";
import FeedButton from "@/components/feed-button.tsx";
import { getSessionId } from "@/plugins/oauth.ts"

interface PageData {
  post: Post
  sessionId?: string
}

export const handler: Handlers<PageData> = {
  async GET(req, ctx) {
    try {
      const slug = ctx.params.slug
      const sessionId = await getSessionId(req)
      const post = await getPost(slug, sessionId);

      if (!post) {
        return ctx.renderNotFound();
      }

      return ctx.render({ post: post as Post, sessionId });
    } catch {
      return ctx.renderNotFound();
    }
  }
};

export default function PostPage(props: PageProps<PageData>) {
  const post = props.data.post;
  const sessionId = props.data.sessionId
  const publishedAt = new Date(post.publishedAt).toLocaleDateString("en-us", { year: "numeric", month: "long", day: "numeric", });
  return (
    <>
      <Header backHome social sessionId={sessionId}/>
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