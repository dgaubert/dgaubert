import FeedButton from "@/components/feed-button.tsx";

export default function Footer() {
  return (
    <div class="max-w-screen-sm mx-auto px-6 my-14 flex-1 flex flex-col">
      <nav class="flex justify-between">
        <ul class="flex items-center">
          <li>
            <div class="flex items-center gap-1">
              <FeedButton />
              <div class="font-bold text-xl">
                Daniel García Aubert
              </div>
            </div>
            <div class="text-gray-500">
              Software Engineer
            </div>
          </li>
        </ul>
        <ul class="flex items-center text-right">
          <li class="text-xs text-gray-500">
            <div><a href="/terms-and-conditions" class="hover:underline">Terms and conditions</a></div>
            <div><a href="/privacy-policy" class="hover:underline">Privacy policy</a></div>
            <div class="pt-2"> Copyright © 2024. All right reserved.</div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
