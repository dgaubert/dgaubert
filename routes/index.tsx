import { Handlers, PageProps } from "$fresh/server.ts";
import { getPosts, Post } from "@/utils/posts.ts";
import Header from "@/components/header.tsx"
import PostCard from "@/components/post-card.tsx"
import Footer from "@/components/footer.tsx"
import { getSessionId } from "../plugins/oauth.ts"

interface PageData {
  posts: Post[]
  sessionId?: string
}

export const handler: Handlers<PageData> = {
  async GET(req, ctx) {
    const sessionId = await getSessionId(req)
    const posts = await getPosts(sessionId);
    return ctx.render({ posts, sessionId });
  }
};

export default function BlogIndexPage(props: PageProps<PageData>) {
  const posts = props.data.posts;
  const sessionId = props.data.sessionId

  return (
    <>
      <Header about profile social sessionId={sessionId} />
      <main class="max-w-screen-sm mx-auto">
        <div class="pt-16 px-6">
          {posts.map((post) => <PostCard post={post} />)}
        </div>
      </main>
      <Footer />
    </>
  );
}
