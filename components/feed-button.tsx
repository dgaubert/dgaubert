import FeedIcon from "$tabler-icons/tsx/rss.tsx";

export default function FeedButton() {
  return (
    <a href="/feed" class="inline-block text-gray-700/80 hover:text-gray-900 transition-colors" title="Feed">
      <FeedIcon/> 
    </a>
  )
}