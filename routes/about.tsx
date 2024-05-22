import { Handlers, PageProps } from "$fresh/server.ts";
import { extract } from "$std/front_matter/any.ts";
import { join } from "$std/path/mod.ts";
import { Head } from "$fresh/runtime.ts";
import Header from "@/components/header.tsx";
import { CSS, render } from "@deno/gfm";
import Footer from "@/components/footer.tsx";
import { PageData, RequestState } from "@/routes/types.ts"

const DIRECTORY = "./pages";

export const handler: Handlers<PageData> = {
  async GET(_req, ctx) {
    const content = await Deno.readTextFile(join(DIRECTORY, "about.md"));
    const { body } = extract(content);
    return ctx.render({ content: body });
  },
};

export default function AboutPage(props: PageProps<PageData, RequestState>) {
  const sessionId = props.state.sessionId;
  const content = props.data.content as string;
  return (
    <>
      <Header backHome profile social sessionId={sessionId} />
      <Head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>
      <main class="max-w-screen-sm mx-auto px-6 pt-16">
        <div
          class="mt-8 markdown-body"
          dangerouslySetInnerHTML={{ __html: render(content) }}
        />
      </main>
      <Footer />
    </>
  );
}
