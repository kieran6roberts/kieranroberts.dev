import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
	const blog = await getCollection('blog');
	return rss({
		title: "Kieran's Web Dev Blog",
		description:
			'Learn by building! I write about frontend UI/UX, React/Next.js, software testing, web accessibility, and more.',
		site: context.site as unknown as string,
		items: blog.map((post) => ({
			title: post.data.title,
			pubDate: post.data.datePublished,
			description: post.data.seoDescription,
			link: `/blog/${post.data.slug}/`,
			content: post.body,
		})),
		customData: `<language>en-us</language>`,
	});
}
