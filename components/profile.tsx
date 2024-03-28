
export default function Profile() {
  return (
    <div class="max-w-screen-sm mx-auto flex flex-col items-center">
      <a href="/" class="pt-14">
        <img width={150} class="rounded-full" src="/me.png" />
      </a>
      <h1 class="pt-4 px-6 text-3xl font-bold">Daniel García Aubert</h1>
      <p class="px-6 text-gray-500">Software Engineer</p>
    </div>
  )
}