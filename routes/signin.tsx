import { PageProps } from "$fresh/server.ts";
import Header from "@/components/header.tsx";
import Footer from "@/components/footer.tsx";
import GoogleOAuthButton from "@/components/google-oauth-button.tsx";
import GithubOAuthButton from "@/components/github-oauth-button.tsx";
import FacebookOAuthButton from "@/components/facebook-oauth-button.tsx";
import { RequestState } from "@/routes/types.ts"

export default function SigninPage(props: PageProps<undefined, RequestState>) {
  const sessionId = props.state.sessionId;
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
