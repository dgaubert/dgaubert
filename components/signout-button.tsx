import SignoutIcon from "$tabler-icons/tsx/user.tsx";

export default function SignoutButton() {
  return (
    <a href="/oauth/signout?success_url=%2F" class="flex items-center gap-1 text-sm text-gray-700/80 hover:text-gray-900 transition-colors" title="Sign Out">
      Sign Out
      <SignoutIcon class="w-5 h-5" />
    </a>
  )
}