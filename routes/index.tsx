import { Handlers, PageProps } from "$fresh/server.ts";
import { getPosts, Post } from "@/utils/posts.ts";
import Header from "@/components/header.tsx"
import PostCard from "@/components/post-card.tsx"
import Footer from "@/components/footer.tsx"

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts();
    return ctx.render(posts);
  }
};

export default function BlogIndexPage(props: PageProps<Post[]>) {
  const posts = props.data;

  return (
    <>
      <Header profile about />
      <main class="max-w-screen-sm mx-auto">
        <div class="pt-16 px-6">
          {posts.map((post) => <PostCard post={post} />)}
        </div>
      </main>
      <Footer />
    </>
  );
}
