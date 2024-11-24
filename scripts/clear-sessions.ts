/// <reference lib="deno.unstable" />

import { UserInfo } from "@/plugins/oauth.ts";

const databaseId = Deno.env.get("DENO_KV_DATABASE_ID");

if (!databaseId) {
  throw new Error("Missing DENO_KV_DATABASE_ID env variable");
}

const kv = await Deno.openKv(
  `https://api.deno.com/databases/${databaseId}/connect`,
);

const sessionIter = kv.list<UserInfo>({ prefix: ["users"] });
let sessionsRemovedCount = 0
for await (const session of sessionIter) {
    if (Deno.args.length === 0) {
        console.info(`Removing session`, session.key[1], session.value.email)
        await kv.delete(session.key);
        sessionsRemovedCount++
    } else if (Deno.args.includes(session.value.email)) {
        console.info(`Removing session`, session.key[1], session.value.email)
        await kv.delete(session.key);
        sessionsRemovedCount++
    } else {
        console.info(`Keeping session`, session.key[1], session.value.email)
    }
}
console.log("Removed %s sessions", sessionsRemovedCount)
