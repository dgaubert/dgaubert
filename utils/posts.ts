import { extract } from "$std/front_matter/any.ts";
import { join } from "$std/path/mod.ts";

const DIRECTORY = "./posts";

type BlogType = "blog";
type PictureType = "picture";
type MicroType = "micro"

type PostType = BlogType | PictureType | MicroType

export interface Blog {
  slug: string;
  title: string;
  publishedAt: Date;
  picture: string;
  snippet: string;
  content: string;
  type: BlogType;
}

export interface Picture {
  slug: string;
  title: string;
  publishedAt: Date;
  picture: string;
  content: string;
  type: PictureType;
}

export interface Micro {
  slug: string;
  title: string;
  publishedAt: Date;
  snippet: string;
  content: string;
  type: MicroType;
}

export type Post = Blog | Picture | Micro

// Get posts
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

// Get post
export async function getPost(slug: string, sessionId?: string): Promise<Post | null> {
  const text = await Deno.readTextFile(join(DIRECTORY, `${slug}.md`));
  const { attrs, body } = extract(text);

  if (attrs.draft) {
    return null
  }

  if (attrs.private && !sessionId) {
    return null
  }

  const type = attrs.type as PostType

  if (type === "blog") {
    return {
      slug,
      title: attrs.title as string,
      publishedAt: new Date(attrs.published_at as string),
      picture: attrs.picture as string,
      content: body,
      snippet: attrs.snippet as string,
      type
    };
  }

  if (type === "picture") {
    return {
      slug,
      title: attrs.title as string,
      publishedAt: new Date(attrs.published_at as string),
      picture: attrs.picture as string,
      content: body,
      type
    }
  }

  // type === "micro"
  return {
    slug,
    title: attrs.title as string,
    publishedAt: new Date(attrs.published_at as string),
    content: body,
    snippet: attrs.snippet as string,
    type
  };
}