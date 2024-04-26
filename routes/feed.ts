import { Handlers } from "$fresh/server.ts";
import { getPosts, Post, Blog, Picture, Micro } from "@/utils/posts.ts";
import { Feed, type Item as FeedItem } from "feed";
import { strip } from "@deno/gfm";

export const handler: Handlers<Post[]> = {
  async GET(req, _ctx) {
    const posts = await getPosts();
    const url = new URL(req.url);
    const origin = url.origin;
    const copyright = `Copyright ${new Date().getFullYear()} ${origin}`;
    const feed = new Feed({
      title: "Daniel García Aubert",
      description: "Software Engineer",
      id: `${origin}/blog`,
      link: `${origin}/blog`,
      language: "en",
      favicon: `${origin}/favicon.ico`,
      copyright: copyright,
      generator: "Feed (https://github.com/jpmonette/feed) for Deno",
      feedLinks: {
        atom: `${origin}/feed`,
      }
    });

    posts.forEach((post: Post) => {
      let item: FeedItem

      if (post.type === "blog") {
        const blog = post as Blog
        item = {
          id: `${origin}/${blog.title}`,
          title: blog.title,
          description: blog.snippet,
          date: blog.publishedAt,
          link: `${origin}/blog/${blog.slug}`,
          copyright,
          published: blog.publishedAt,
        }
        feed.addItem(item);
        return
      }

      if (post.type === "picture") {
        const picture = post as Picture

        item = {
          id: `${origin}/${picture.title}`,
          title: picture.title,
          description: strip(picture.content),
          date: picture.publishedAt,
          link: `${origin}/picture/${picture.slug}`,
          copyright,
          published: picture.publishedAt,
        }

        feed.addItem(item);
        return
      }

      const micro = post as Micro

      item = {
        id: `${origin}/${micro.title}`,
        title: micro.title,
        description: micro.snippet,
        date: post.publishedAt,
        link: `${origin}/micro/${micro.slug}`,
        copyright,
        published: micro.publishedAt,
      };

      feed.addItem(item);
    });

    const atomFeed = feed.atom1();
    return new Response(atomFeed, {
      headers: {
        "content-type": "application/atom+xml; charset=utf-8",
      }
    });
  }
};