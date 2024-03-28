import Navbar from "@/components/navbar.tsx";
import Profile from "@/components/profile.tsx";
import Social from "@/components/social.tsx";

export default function Header(props: { profile?: boolean, backHome?: boolean, about?: boolean }) {
  return (
    <header>
      <Navbar backHome={props.backHome} about={props.about} />
      {props.profile && <Profile />}
      <Social />
    </header>
  )
}