import { PageProps } from "$fresh/server.ts";
import Header from "@/components/header.tsx";
import Footer from "@/components/footer.tsx";
import { RequestState } from "@/routes/types.ts"
import Error404Icon from "$tabler-icons/tsx/error-404.tsx";

export default function NotFoundErrorPage(props: PageProps<undefined, RequestState>) {
  const sessionId = props.state.sessionId
  return (
    <>
      <Header backHome about sessionId={sessionId}/>
      <main class="max-w-screen-sm mx-auto py-12 px-6 flex flex-col items-center">
        <Error404Icon class="w-16 h-16"/>
        <p class="text-xl font-bold">Not found</p>
        <p class="pt-6">{ sessionId ? "To see this content, you might need to be a friend of mine." : "To see this content, you might need to be signed up."}</p>
      </main>
      <Footer />
    </>
  );
}
