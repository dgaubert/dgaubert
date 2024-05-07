import XIcon from "$tabler-icons/tsx/brand-x.tsx";

export default function TwitterButton() {
  return (
    <a
      href="https://twitter.com/danigaubert"
      class="inline-block px-1 text-gray-700/80 hover:text-gray-900 transition-colors"
      title="Twitter"
    >
      <XIcon aria-hidden="true" />
    </a>
  );
}
