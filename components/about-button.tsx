import AboutIcon from "$tabler-icons/tsx/info-circle.tsx";

export default function AboutButton() {
  return (
    <a
      href="/about"
      class="flex items-center gap-1 text-sm text-gray-700/80 hover:text-gray-900 transition-colors"
      title="About"
    >
      About
      <AboutIcon />
    </a>
  );
}
