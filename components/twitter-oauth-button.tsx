import TwitterIcon from "$tabler-icons/tsx/brand-x.tsx";

export default function TwitterOAuthButton() {
  return (
    <a href="/oauth/twitter/signin?success_url=%2F" class="flex gap-1 cursor-pointer px-3 py-2 bg-gray-100 rounded hover:bg-gray-200" title="Sign In with X">
      <TwitterIcon />
      Sign In with your X account
    </a>
  )
}