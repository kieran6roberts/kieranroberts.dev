import type { CollectionEntry } from 'astro:content';

export const sortPostsByRecent = (posts: CollectionEntry<'blog'>[]) => {
	return posts.sort(
		(a, b) => new Date(b.data.datePublished).getTime() - new Date(a.data.datePublished).getTime(),
	);
};
