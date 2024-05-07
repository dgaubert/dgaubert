import LinkedInIcon from "$tabler-icons/tsx/brand-linkedin.tsx";

export default function LinkedinButton() {
  return (
    <a
      href="https://www.linkedin.com/in/danielgarciaaubert/"
      class="inline-block px-1 text-gray-700/80 hover:text-gray-900 transition-colors"
      title="LinkedIn"
    >
      <LinkedInIcon aria-hidden="true" />
    </a>
  );
}
