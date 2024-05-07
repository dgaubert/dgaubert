import { createGitHubOAuthConfig, createGoogleOAuthConfig, createFacebookOAuthConfig, createHelpers } from "jsr:@deno/kv-oauth";
import type { Plugin } from "$fresh/server.ts";
import friends from "@/utils/friends.ts";

const { signIn: signInGithub, handleCallback: handleCallbackGithub } = createHelpers(
  createGitHubOAuthConfig()
);

const redirectHost = Deno.env.get('ENVIRONMENT') === "production" ? "https://dgaubert.dev" : "http://localhost:8000"

const redirectGoogleUri = `${redirectHost}/oauth/google/callback`
const { signIn: signInGoogle, handleCallback: handleCallbackGoogle } = createHelpers(
  createGoogleOAuthConfig({
    redirectUri: redirectGoogleUri,
    scope: "https://www.googleapis.com/auth/userinfo.email"
  })
);

const redirectFacebookUri = `${redirectHost}/oauth/facebook/callback`
const { signIn: signInFacebook, handleCallback: handleCallbackFacebook } = createHelpers(
  createFacebookOAuthConfig({
    redirectUri: redirectFacebookUri,
    scope: "email"
  })
);

const { signOut, getSessionId } = createHelpers({
  clientId: "fake",
  authorizationEndpointUri: "fake",
  tokenUri: "fake"
});

async function isFriend(sessionId?: string): Promise<boolean> {
  if (!sessionId) {
    return false;
  }
  const userInfo = await getUserInfo(sessionId)
  return userInfo?.isFriend ? true : false
}

export { getSessionId, isFriend }

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
        const { response, tokens, sessionId } = await handleCallbackGithub(req);
        const user = await getGitHubUser(tokens.accessToken)
        await setUserInfo(sessionId, user.email)
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
        const { response, tokens, sessionId } = await handleCallbackGoogle(req);
        const user = await getGoogleUser(tokens.accessToken)
        await setUserInfo(sessionId, user.email)
        return response;
      }
    },
    {
      path: "/oauth/facebook/signin",
      async handler(req) {
        return await signInFacebook(req);
      }
    },
    {
      path: "/oauth/facebook/callback",
      async handler(req) {
        const { response, tokens, sessionId } = await handleCallbackFacebook(req);
        const user = await getFacebookUser(tokens.accessToken)
        await setUserInfo(sessionId, user.email)
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

const DENO_KV_PATH_KEY = "DENO_KV_PATH";
let path = undefined;
const { state } = await Deno.permissions.query({ name: "env", variable: DENO_KV_PATH_KEY })

if (state === "granted") {
  path = Deno.env.get(DENO_KV_PATH_KEY);
}

const kv = await Deno.openKv(path);

interface UserInfo {
  email: string;
  isFriend: boolean;
}

async function syncFriends(friends?: string[]) {  
  const iter = kv.list<UserInfo>({ prefix: ["users"] });

  const users = []
  for await (const res of iter) {
    users.push(res);
  }

  await Promise.all(users.map(user => {
    user.value.isFriend = friends ? friends.includes(user.value.email) : false
    return kv.set(user.key, user.value);
  }))
}

await syncFriends(friends)

async function setUserInfo(sessionId: string, email: string) {
  const key = ["users", sessionId ];
  const value = {
    isFriend: friends?.includes(email),
    email: email 
  };
  await kv.set(key, value);
}

async function getUserInfo(sessionId: string): Promise<UserInfo | null> {
  const key = ["users", sessionId ];
  const result = await kv.get<UserInfo>(key);
  return result.value
}

interface GitHubUser {
  email: string;
}

async function getGitHubUser(accessToken: string): Promise<GitHubUser> {
  const response = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `bearer ${accessToken}`,
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub user profile");
  }

  return await response.json() as GitHubUser;
}

interface GoogleUser {
  email: string;
}

async function getGoogleUser(accessToken: string): Promise<GoogleUser> {
  const response = await fetch("https://www.googleapis.com/oauth2/v1/userinfo", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Google user profile");
  }

  return await response.json() as GoogleUser;
}

interface FacebookUser {
  email: string;
}

async function getFacebookUser(accessToken: string): Promise<FacebookUser> {
  const response = await fetch(`https://graph.facebook.com/v19.0/me?fields=email&access_token=${accessToken}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Facebook user profile");
  }

  return await response.json() as FacebookUser;
}

