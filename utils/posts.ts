import { extract } from "$std/front_matter/any.ts";
import { join } from "$std/path/mod.ts";

const DIRECTORY = "./posts";

export interface Post {
  slug: string;
  title: string;
  publishedAt: Date;
  picture: string;
  snippet: string;
  content: string;
}

// Get posts.
export async function getPosts(sessionId?: string): Promise<Post[]> {
  const files = Deno.readDir(DIRECTORY);
  const promises = [];
  for await (const file of files) {
    const slug = file.name.replace(".md", "");
    promises.push(getPost(slug, sessionId));
  }
  const posts = (await Promise.all(promises) as Post[]).filter(p => p !== null);
  posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  return posts;
}

// Get post.
export async function getPost(slug: string, sessionId?: string): Promise<Post | null> {
  const text = await Deno.readTextFile(join(DIRECTORY, `${slug}.md`));
  const { attrs, body } = extract(text);

  if (attrs.private && !sessionId) {
    return null
  }

  return {
    slug,
    title: attrs.title as string,
    publishedAt: new Date(attrs.published_at as string),
    picture: attrs.picture as string,
    content: body,
    snippet: attrs.snippet as string,
  };
}