import { Handlers, PageProps } from "$fresh/server.ts";
import { extract } from "$std/front_matter/any.ts";
import { join } from "$std/path/mod.ts";
import { Head } from "$fresh/runtime.ts";
import Header from "@/components/header.tsx";
import { CSS, render } from "$gfm";
import Footer from "@/components/footer.tsx";
import { getSessionId } from "@/plugins/oauth.ts"

const DIRECTORY = "./pages";

interface Page {
  content: string;
  sessionId?: string
};

export const handler: Handlers<Page> = {
  async GET(req, ctx) {
    const sessionId = await getSessionId(req)
    const content = await Deno.readTextFile(join(DIRECTORY, "about.md"))
    const { body } = extract(content);
    return ctx.render({ content: body, sessionId });
  }
}

export default function AboutPage(props: PageProps<Page>) {
  const sessionId = props.data.sessionId
  const content = props.data.content;
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