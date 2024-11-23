import MailButton from "@/components/mail-button.tsx";
import GithubButton from "@/components/github-button.tsx";
import TwitterButton from "@/components/bluesky-button.tsx";
import LinkedinButton from "@/components/linkedin-button.tsx";

export default function Social() {
  return (
    <div class="max-w-screen-sm mx-auto flex flex-col items-center">
      <nav class="px-6 py-8 pt-8">
        <MailButton />
        <GithubButton />
        <TwitterButton />
        <LinkedinButton />
      </nav>
    </div>
  );
}
