import { FreshContext } from "$fresh/server.ts";
import { getSessionId, isFriend } from "@/plugins/oauth.ts";

interface RequestState {
  sessionId?: string;
  isFriend: boolean;
}

export async function handler(req: Request, ctx: FreshContext<RequestState>) {
  const sessionId = await getSessionId(req);
  const isUserAFriend = await isFriend(sessionId);
  ctx.state = { sessionId, isFriend: isUserAFriend }
  return await ctx.next();
}