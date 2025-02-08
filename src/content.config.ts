import { defineCollection, z, reference } from 'astro:content';

import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({
		pattern: '*.md',
		base: 'src/blog',
	}),
	schema: z.object({
		title: z.string(),
		author: z.string().default('Kieran Roberts'),
		seoTitle: z.string().optional(),
		seoDescription: z.string(),
		series: z.string().optional(),
		relatedPosts: z.array(reference('blog')).optional(),
		datePublished: z.coerce.date(),
		slug: z.string(),
		cover: z.string().optional(),
		// tags: z.array(z.string()),
	}),
});

export const collections = { blog };
