import FacebookIcon from "$tabler-icons/tsx/brand-facebook.tsx";

export default function FacebookOAuthButton() {
  return (
    <a href="/oauth/facebook/signin?success_url=%2F" class="flex gap-1 cursor-pointer px-3 py-2 bg-gray-100 rounded hover:bg-gray-200" title="Sign In with Facebook">
      <FacebookIcon />
      Sign In with your Facebook account
    </a>
  )
}