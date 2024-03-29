import HomeButton from "@/components/home-button.tsx";
import AboutButton from "@/components/about-button.tsx";

interface Props {
  backHome?: boolean;
  about?: boolean;
};

export default function Navbar(props: Props) {
  return (
    <div class="max-w-screen-sm mx-auto px-6 py-8 flex-1 flex flex-col">
      <nav class="flex justify-between">
        <ul class="flex items-center">
          <li>
            {props.backHome && <HomeButton />}
          </li>
        </ul>
        <ul class="flex items-center">
          <li>
            {props.about && <AboutButton />}
          </li>
        </ul>
      </nav>
    </div>
  )
}