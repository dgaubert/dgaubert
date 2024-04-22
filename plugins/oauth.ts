import { createGitHubOAuthConfig, createTwitterOAuthConfig, createGoogleOAuthConfig, createFacebookOAuthConfig, createHelpers } from "jsr:@deno/kv-oauth";
import type { Plugin } from "$fresh/server.ts";

const { signIn: signInGithub, handleCallback: handleCallbackGithub } = createHelpers(
  createGitHubOAuthConfig()
);

const redirectHost = Deno.env.get('DENO_ENV') === "production" ? "https://dgaubert.dev" : "http://localhost:8000"
const redirectTwitterUri = `${redirectHost}/oauth/twitter/callback`

const { signIn: signInTwitter, handleCallback: handleCallbackTwitter } = createHelpers(
  createTwitterOAuthConfig({
    redirectUri: redirectTwitterUri,
    scope: "users.read",
  })
);

const redirectGoogleUri = `${redirectHost}/oauth/google/callback`

const { signIn: signInGoogle, handleCallback: handleCallbackGoogle } = createHelpers(
  createGoogleOAuthConfig({
    redirectUri: redirectGoogleUri,
    scope: "https://www.googleapis.com/auth/userinfo.profile"
  })
);

const { signOut, getSessionId } = createHelpers({
  clientId: "fake",
  authorizationEndpointUri: "fake",
  tokenUri: "fake"
});

export { getSessionId }

export default {
  name: "oauth",
  routes: [
    {
      path: "/oauth/github/signin",
      async handler(req) {
        return await signInGithub(req);
      }
    },
    {
      path: "/oauth/github/callback",
      async handler(req) {
        // Return object also includes `accessToken` and `sessionId` properties.
        const { response } = await handleCallbackGithub(req);
        return response;
      }
    },
    {
      path: "/oauth/twitter/signin",
      async handler(req) {
        return await signInTwitter(req);
      }
    },
    {
      path: "/oauth/twitter/callback",
      async handler(req) {
        // Return object also includes `accessToken` and `sessionId` properties.
        const { response } = await handleCallbackTwitter(req);
        return response;
      }
    },
    {
      path: "/oauth/google/signin",
      async handler(req) {
        return await signInGoogle(req);
      }
    },
    {
      path: "/oauth/google/callback",
      async handler(req) {
        // Return object also includes `accessToken` and `sessionId` properties.
        const { response } = await handleCallbackGoogle(req);
        return response;
      }
    },
    {
      path: "/oauth/signout",
      async handler(req) {
        return await signOut(req);
      }
    }
  ]
} as Plugin;

