/// <reference lib="deno.unstable" />

import { UserInfo } from "@/plugins/oauth.ts";

let activeSessions = 0;
const uniqueSession = new Set<string>()

const databaseId = Deno.env.get("DENO_KV_DATABASE_ID");

if (!databaseId) {
  throw new Error("Missing DENO_KV_DATABASE_ID env variable");
}

const kv = await Deno.openKv(
  `https://api.deno.com/databases/${databaseId}/connect`,
);

const iter = kv.list<UserInfo>({ prefix: ["users"] });

for await (const res of iter) {
  console.info("key:", res.key[1])
  activeSessions++;
  uniqueSession.add(res.value.email)
}

console.info(`Number of active sessions: ${activeSessions}`);
console.info(`Number of unique sessions: ${uniqueSession.size}`);
