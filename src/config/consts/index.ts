import type { Experience } from '@features/experience/types';
import type { Project } from '@features/projects/types';
import type { Testimonial } from '@features/testimonials/types';

import CoverSnapImage from '@images/cover-snap.webp';
import universityImage from '@images/university.webp';
import PortfolioImage from '@images/portfolio.webp';
import TestimonialImage1 from '@images/testimonial-1.webp';
import TestimonialImage2 from '@images/testimonial-2.webp';
import TestimonialImage3 from '@images/testimonial-3.webp';

export const EMAIL_ADDRESS = 'kieranroberts6dev@gmail.com';
export const THEME_STORAGE_KEY = 'theme';
export const DEFAULT_SEO_TITLE = 'Kieran Roberts - Software Engineer';
export const DEFAULT_SEO_DESCRIPTION =
	"I'm a full-stack JavaScript-focused engineer with multiple years of industry experience working closely on UI/UX, AWS based infra, and GraphQL API's. Let's talk";

export const Themes = {
	light: 'light',
	dark: 'dark',
} as const;

export const experience: Experience[] = [
	{
		title: 'Software Engineer (Full-Stack)',
		company: 'Hashnode',
		location: 'Remote',
		date: 'May 2021 - Present',
		type: 'Full-time',
		iconName: 'hashnode',
		responsibilities: [
			'Working closely with a dynamic 6-12 person developer team writing code largely in TypeScript and React, tending to a +50k monthly active user base.',
			'Coordinating with a product manager and design team to deliver several key full-stack features for our popular blogs product. Contributing to a roughly 250% increase in new blogs created per month since joining the team.',
			'Assisted in building out an in-house UI library from scratch, coordinating with the design team to bring consistency and accessibility across the site UI/UX.',
			'Spearheaded an end-to-end test setup for the frontend including a continuous integration pipeline using GitHub Actions that helped increase confidence in code and decrease the number of bugs.',
		],
		image: null,
		showCV: true,
		companyURL: 'https://hashnode.com',
	},
];

export const education: Experience[] = [
	{
		title: 'MEng Electronic Engineering',
		company: 'Bangor University',
		location: 'Bangor, Wales',
		type: 'Full-time',
		date: '2013 - 2017',
		iconName: 'bangor-university',
		responsibilities: [
			'Integrated Masters Degree in Electronic Engineering (MEng) with first-class honors.',
		],
		image: universityImage,
		showCV: false,
		companyURL: 'https://www.bangor.ac.uk/',
	},
];

export const projects: Project[] = [
	{
		title: 'kieranroberts.dev (This site)',
		description:
			'My personal developer portfolio and playground showcasing my skills, projects, and blog. Built using Astro to reduce JavaScript overhead, optimized for performance.',
		date: '2024',
		githubLink: 'https://github.com/kieran6roberts/kieranroberts.dev',
		liveLink: null,
		caseStudyLink:
			'https://blog.kieranroberts.dev/kieranrobertsdev-my-new-dev-portfolio-built-with-astro-tailwindcss-and-typescript',
		image: PortfolioImage,
		status: 'complete',
	},
	{
		title: 'CvrSnap',
		description:
			"CvrSnap empowers you to create great looking cover images for your blog posts in seconds, skipping the design hassle. It's completely free to download as many images as you like.",
		date: '2025',
		githubLink: 'https://github.com/kieran6roberts/CoverSnap',
		liveLink: 'https://cvrsnap.com/',
		caseStudyLink: null,
		image: CoverSnapImage,
		status: 'in progress',
	},
];

export const testimonials: Testimonial[] = [
	{
		name: 'Pritam Paul',
		company: 'Hashnode',
		role: 'Lead Product Designer',
		description:
			"Kieran has been an absolute rockstar to work with on front-end tasks. His ability to bring my designs, whether landing pages or UI elements, to life with precision and flair is truly impressive. Beyond his prolific development skills, his knack for optimization and making sites faster has been invaluable. On top of that, he's a fantastic friend and teammate who makes every collaboration enjoyable. Can’t recommend him enough!",
		image: TestimonialImage3,
		profileURL: 'https://www.linkedin.com/in/pritam-paul360/',
	},
	{
		name: 'Lakshya Thakur',
		company: 'Hashnode',
		role: 'Senior Software Engineer',
		description:
			'I have worked with Kieran on several significant projects at Hashnode. I can vouch for his attention to detail, web accessibility standards, and ability to deliver a great user experience. He iterates quickly on feedback and ensures that there is a harmony between user experience and developer experience while building features.',
		image: TestimonialImage1,
		profileURL: 'https://www.linkedin.com/in/lakshyathakur/',
	},
	{
		name: 'Sam Adebayo',
		company: 'Hashnode',
		role: 'Software Engineer',
		description:
			'Kieran is an exceptional professional with a strong commitment to web accessibility, consistently going the extra mile to ensure high standards in product development. He excels in code testing, provides thoughtful feedback during code reviews, and showcases remarkable skill in analyzing and simplifying complex requirements like UI component libraries to enhance team understanding and implementation. His dedication, expertise, and attention to detail make him an invaluable asset to any team or project.',
		image: TestimonialImage2,
		profileURL: 'https://www.linkedin.com/in/unclebigbay/',
	},
];
