/// <reference lib="deno.unstable" />

const siteSessions = [];

// 79638f4a-856e-4f8f-8a71-e734b09ae10f
const databaseId = Deno.env.get("DENO_KV_DATABASE_ID");

if (!databaseId) {
  throw new Error("Missing DENO_KV_DATABASE_ID env variable");
}

const kv = await Deno.openKv(
  `https://api.deno.com/databases/${databaseId}/connect`,
);

const iter = kv.list<string>({ prefix: ["site_sessions"] });

for await (const res of iter) {
  siteSessions.push(res);
}

console.info(`Number of active sessions: ${siteSessions.length}`);
