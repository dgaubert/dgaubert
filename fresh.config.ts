import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
import oAuthPlugin from "@/plugins/oauth.ts";

export default defineConfig({
  plugins: [tailwind(), oAuthPlugin],
});
