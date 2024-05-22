import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { CSS } from "@deno/gfm";
import { getPosts, Post } from "@/utils/posts.ts";
import Header from "@/components/header.tsx";
import PostCard from "@/components/post-card.tsx";
import Footer from "@/components/footer.tsx";
import { PageData, RequestState } from "@/routes/types.ts"

export const handler: Handlers<PageData, RequestState> = {
  async GET(_req, ctx) {
    const sessionId = ctx.state.sessionId;
    const isFriend = ctx.state.isFriend;
    const posts = await getPosts(sessionId, isFriend);
    return ctx.render({ posts });
  },
};

export default function BlogIndexPage(props: PageProps<PageData, RequestState>) {
  const posts = props.data.posts as Post[];
  const sessionId = props.state.sessionId;

  return (
    <>
      <Header about profile social sessionId={sessionId} />
      <Head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>
      <main class="max-w-screen-sm mx-auto">
        <div class="pt-16 px-6">
          {posts.map((post) => <PostCard post={post} />)}
        </div>
      </main>
      <Footer />
    </>
  );
}
