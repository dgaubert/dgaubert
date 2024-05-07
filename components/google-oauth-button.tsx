import GoogleIcon from "$tabler-icons/tsx/brand-google.tsx";

export default function GoogleOAuthButton() {
  return (
    <a
      href="/oauth/google/signin?success_url=%2F"
      class="flex gap-1 cursor-pointer px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
      title="Sign In with Google"
    >
      <GoogleIcon />
      Sign In with your Google account
    </a>
  );
}
