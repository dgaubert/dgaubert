import FeedButton from "@/components/feed-button.tsx";

export default function Footer() {
  return (
    <div class="max-w-screen-sm mx-auto flex my-14 px-6">
      <div class="w-1/2 h-12">
        <div class="flex items-center gap-1">
          <FeedButton />
          <div class="font-bold text-xl">
            Daniel García Aubert
          </div>
        </div>
        <div class="text-gray-500">
          Software Engineer
        </div>
      </div>
      <div class="w-1/2 h-12 text-right">
        <div class="text-xs text-gray-500">
          Copyright © 2024<br />
          All right reserved.
        </div>
      </div>
    </div>
  );
}
