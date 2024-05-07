import GithubIcon from "$tabler-icons/tsx/brand-github.tsx";

export default function GoogleOAuthButton() {
  return (
    <a
      href="/oauth/github/signin?success_url=%2F"
      class="flex gap-1 cursor-pointer px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
      title="Sign In with Github"
    >
      <GithubIcon />
      Sign In with your Github account
    </a>
  );
}
