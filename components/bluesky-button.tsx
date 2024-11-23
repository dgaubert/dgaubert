import BlueskyIcon from "$tabler-icons/tsx/brand-bluesky.tsx";

export default function BlueskyButton() {
  return (
    <a
      href="https://bsky.app/profile/dgaubert.dev"
      class="inline-block px-1 text-gray-700/80 hover:text-gray-900 transition-colors"
      title="BlueSky"
    >
      <BlueskyIcon aria-hidden="true" />
    </a>
  );
}
