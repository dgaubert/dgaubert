import GhostIcon from "$tabler-icons/tsx/ghost-3.tsx";

export default function Footer() {
  return (
    <div class="max-w-screen-sm mx-auto flex my-14 px-6">
      <div class="w-1/2 h-12">
        <div class="flex items-center gap-1">
          <GhostIcon class="inline-block" aria-hidden="true" />
          <div class="font-bold text-xl">
            Daniel García Aubert
          </div>
        </div>
        <div class="text-gray-500">
          Software Engineer
        </div>
      </div>
      <div class="w-1/2 h-12 text-right">
        <div class="text-xs">
          Copyright © 2024<br />
          All right reserved.
        </div>
      </div>
    </div>
  );
}
