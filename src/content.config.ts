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
		relatedPosts: z.array(reference('blog')),
		categories: z.array(z.enum(['react', 'ui/ux', 'case-studies'])).optional(),
		datePublished: z.coerce.date(),
		slug: z.string(),
		cover: z.string().optional(),
		updatedAt: z.coerce.date().optional(),
	}),
});

export const collections = { blog };
