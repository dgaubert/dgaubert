import GithubIcon from "$tabler-icons/tsx/brand-github.tsx";

export default function GithubButton() {
  return (
    <a
      href="https://github.com/dgaubert"
      class="inline-block px-1 text-gray-700/80 hover:text-gray-900  transition-colors"
      title="GitHub"
    >
      <GithubIcon aria-hidden="true" />
    </a>
  );
}
