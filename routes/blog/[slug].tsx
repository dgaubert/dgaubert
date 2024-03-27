import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getPost, Post } from "@/utils/posts.ts";
import { CSS, render } from "$gfm";
import Footer from "@/components/footer.tsx";
import GithubIcon from "$tabler-icons/tsx/brand-github.tsx";
import XIcon from "$tabler-icons/tsx/brand-x.tsx";
import MailIcon from "$tabler-icons/tsx/at.tsx";
import LinkedInIcon from "$tabler-icons/tsx/brand-linkedin.tsx";
import ArrowLeftIcon from "$tabler-icons/tsx/arrow-left.tsx";

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
  return (
    <>
      <header>
        <div class="max-w-screen-sm mx-auto px-6 py-8">
          <a href="/" class="inline-flex items-center gap-1 text-sm text-gray-500/80 hover:text-gray-700 transition-colors" title="Back to Index Page">
            <ArrowLeftIcon aria-hidden="true" />
            Home
          </a>
        </div>
        <div class="flex flex-col items-center">
          <nav class="pt-8">
            <a href="mailto:danielgarciaaubert@gmail.com" class="inline-block px-1" aria-label="Email">
              <MailIcon aria-hidden="true" />
            </a>
            <a href="https://github.com/dgaubert" class="inline-block px-1" aria-label="GitHub">
              <GithubIcon aria-hidden="true" />
            </a>
            <a href="https://twitter.com/danigaubert" class="inline-block px-1" aria-label="Twitter">
              <XIcon aria-hidden="true" />
            </a>
            <a href="https://www.linkedin.com/in/danielgarciaaubert/" class="inline-block px-1" aria-label="LinkedIn">
              <LinkedInIcon aria-hidden="true" />
            </a>
          </nav>
        </div>
      </header>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>
      <main class="max-w-screen-sm mx-auto px-6 pt-16">
        <h1 class="text-4xl font-bold">{post.title}</h1>
        <time class="text-gray-500">
          {new Date(post.publishedAt).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <div
          class="mt-8 markdown-body"
          dangerouslySetInnerHTML={{ __html: render(post.content) }}
        />
      </main>
      <Footer />
    </>
  );
}