import { Handlers, PageProps } from "$fresh/server.ts";
import Header from "@/components/header.tsx";
import Footer from "@/components/footer.tsx";
import { getSessionId } from "@/plugins/oauth.ts"
import GoogleOAuthButton from "@/components/google-oauth-button.tsx"
import GithubOAuthButton from "@/components/github-oauth-button.tsx"
import FacebookOAuthButton from "@/components/facebook-oauth-button.tsx";

interface Page {
  sessionId?: string
};

export const handler: Handlers<Page> = {
  async GET(req, ctx) {
    const sessionId = await getSessionId(req)
    return ctx.render({ sessionId });
  }
}

export default function AboutPage(props: PageProps<Page>) {
  const sessionId = props.data.sessionId
  return (
    <>
      <Header backHome sessionId={sessionId} />
      <div class="max-w-screen-sm mx-auto px-6 py-8">
        <nav class="px-4">
          <ul class="px-4">
            <li class="pb-4">
              <GoogleOAuthButton />
            </li>
            <li class="pb-4">
              <FacebookOAuthButton />
            </li>
            <li class="pb-4">
              <GithubOAuthButton />
            </li>
          </ul>
        </nav>
      </div>
      <Footer />
    </>
  );
}