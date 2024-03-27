import GithubIcon from "$tabler-icons/tsx/brand-github.tsx";
import XIcon from "$tabler-icons/tsx/brand-x.tsx";
import MailIcon from "$tabler-icons/tsx/at.tsx";
import LinkedInIcon from "$tabler-icons/tsx/brand-linkedin.tsx";

export default function Header() {
  return (
    <header class="flex flex-col items-center">
      <a href="/" class="pt-14">
        <img width={150} class="rounded-full" src="/me.png" />
      </a>
      <h1 class="pt-4 px-6 text-3xl font-bold">Daniel García Aubert</h1>
      <p class="px-6 text-gray-500">Software Engineer</p>
      <nav class="pt-8">
        <a href="mailto:danielgarciaaubert@gmail.com" class="inline-block px-1" aria-label="Email">
          <MailIcon aria-hidden="true" />
        </a>
        <a href="https://github.com/dgaubert" class="inline-block px-1" aria-label="GitHub">
          <GithubIcon aria-hidden="true" />
        </a>
        <a href="https://twitter.com/danigaubert" class="inline-block px-1" aria-label="Twitter">
          <XIcon aria-hidden="true" />
        </a>
        <a href="https://www.linkedin.com/in/danielgarciaaubert/" class="inline-block px-1" aria-label="LinkedIn">
          <LinkedInIcon aria-hidden="true" />
        </a>
      </nav>
    </header>
  )
}