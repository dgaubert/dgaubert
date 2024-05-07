import MailIcon from "$tabler-icons/tsx/at.tsx";

export default function MailButton() {
  return (
    <a
      href="mailto:danielgarciaaubert@gmail.com"
      class="inline-block px-1 text-gray-700/80 hover:text-gray-900 transition-colors"
      title="Mail"
    >
      <MailIcon />
    </a>
  );
}
