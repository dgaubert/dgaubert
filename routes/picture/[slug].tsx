import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getPost, Picture } from "@/utils/posts.ts";
import { CSS, render } from "@deno/gfm";
import Footer from "@/components/footer.tsx";
import Header from "@/components/header.tsx";
import { getSessionId, isFriend } from "@/plugins/oauth.ts"

interface PageData {
  post: Picture
  sessionId?: string
}

export const handler: Handlers<PageData> = {
  async GET(req, ctx) {
    try {
      const slug = ctx.params.slug
      const sessionId = await getSessionId(req)
      const isUserAFriend = await isFriend(sessionId)
      const post = await getPost(slug, sessionId, isUserAFriend);

      if (!post) {
        return ctx.renderNotFound();
      }

      return ctx.render({ post: post as Picture, sessionId });
    } catch {
      return ctx.renderNotFound();
    }
  }
};

export default function PostPage(props: PageProps<PageData>) {
  const post = props.data.post as Picture;
  const sessionId = props.data.sessionId
  const publishedAt = new Date(post.publishedAt).toLocaleDateString("en-us", { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" });
  return (
    <>
      <Header backHome social sessionId={sessionId}/>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>
      <main class="max-w-screen-sm mx-auto px-6 pt-16">
        <time class="text-gray-500 text-xl pr-2">
          {publishedAt}
        </time>
        <img class="mt-8 mb-16" src={post.picture} />
        <div
          class="mt-8 markdown-body"
          dangerouslySetInnerHTML={{ __html: render(post.content) }}
        />
      </main>
      <Footer />
    </>
  );
}