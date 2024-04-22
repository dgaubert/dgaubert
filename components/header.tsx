import Navbar from "@/components/navbar.tsx";
import Profile from "@/components/profile.tsx";
import Social from "@/components/social.tsx";

interface Props {
  profile?: boolean;
  backHome?: boolean;
  about?: boolean;
  social?: boolean;
  sessionId?: string;
};

export default function Header(props: Props) {
  return (
    <header>
      <Navbar backHome={props.backHome} about={props.about} sessionId={props.sessionId} />
      {props.profile && <Profile />}
      {props.social &&  <Social />}
    </header>
  )
}