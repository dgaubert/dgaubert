import { Handlers, PageProps } from "$fresh/server.ts";
import { extract } from "$std/front_matter/any.ts";
import { join } from "$std/path/mod.ts";
import { Head } from "$fresh/runtime.ts";
import Header from "@/components/header.tsx";
import { CSS, render } from "$gfm";
import Footer from "@/components/footer.tsx";

const DIRECTORY = "./pages";

type Page = {
  content: string;
};

export const handler: Handlers<Page> = {
  async GET(_req, ctx) {
    const content = await Deno.readTextFile(join(DIRECTORY, "about.md"))
    const { body } = extract(content);
    return ctx.render({ content: body });
  }
}

export default function AboutPage(props: PageProps<Page>) {
  const page = props.data;
  return (
    <>
      <Header backHome profile />
      <Head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>
      <main class="max-w-screen-sm mx-auto px-6 pt-16">
        <div
          class="mt-8 markdown-body"
          dangerouslySetInnerHTML={{ __html: render(page.content) }}
        />
      </main>
      <Footer />
    </>
  );
}