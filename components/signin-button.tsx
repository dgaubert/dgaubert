import SigninIcon from "$tabler-icons/tsx/user-x.tsx";

export default function SiginButton() {
  return (
    <a href="/signin" class="flex items-center gap-1 text-sm text-gray-700/80 hover:text-gray-900 transition-colors" title="Sign In">
      Sign In
      <SigninIcon class="w-5 h-5" />
    </a>
  )
}