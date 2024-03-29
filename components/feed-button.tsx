import FeedIcon from "$tabler-icons/tsx/rss.tsx";

interface Props {
  size?: number;
  color?: string;
};

export default function FeedButton(props: Props) {
  return (
    <a href="/feed" class="inline-block text-gray-700/80 hover:text-gray-900 transition-colors" title="Feed">
      <FeedIcon size={props.size} color={props.color}/> 
    </a>
  )
}
