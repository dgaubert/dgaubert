import ArrowLeftIcon from "$tabler-icons/tsx/arrow-left.tsx";

export default function HomeButton() {
  return (
    <a
      href="/"
      class="flex items-center gap-1 text-sm text-gray-700/80 hover:text-gray-900 transition-colors"
      title="Back to Index Page"
    >
      <ArrowLeftIcon aria-hidden="true" />
      Home
    </a>
  );
}
