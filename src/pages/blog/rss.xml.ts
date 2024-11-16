// // @ts-ignore
// import rss from "@astrojs/rss";
// import { getAllPostPagePosts } from "@utils/blog";
// import type { APIContext } from "astro";

// export async function GET({ site }: APIContext) {
//   const posts = await getAllPostPagePosts();
//   const postItems = posts.map((post) => ({
//     title: post.title,
//     pubDate: new Date(post.publishedAt),
//     description: post.seo?.description || post.brief || "",
//     content: post.content.html,
//     link: `${site}blog/${post.slug}`,
//   }));

//   return rss({
//     title: "@Kieran6Dev Blog",
//     site: `${site!}/blog`,
//     items: postItems,
//     description:
//       "Modern web development blog with content in tech such as React, Next.js, Astro and more.",
//     customData: `<language>en-us</language>`,
//   });
// }
