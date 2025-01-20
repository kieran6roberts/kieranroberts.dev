import type { ImageMetadata } from 'astro';

export type Testimonial = {
	name: string;
	company: string;
	role: string;
	description: string;
	image: ImageMetadata;
	profileURL: string;
};
