import type { Experience } from '@features/experience/types';
import type { Project } from '@features/projects/types';
import type { Testimonial } from '@features/testimonials/types';

import TestimonialImage1 from '@images/testimonial-1.webp';
import TestimonialImage2 from '@images/testimonial-2.webp';
import TestimonialImage3 from '@images/testimonial-3.webp';
import TestimonialImage4 from '@images/testimonial-4.webp';
import TestimonialImage5 from '@images/testimonial-5.webp';

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
		title: 'Full-Stack Engineer',
		company: 'Hashnode',
		location: 'Remote',
		date: 'May 2021 - Jan 2025',
		type: 'Full-time',
		iconName: 'hashnode',
		responsibilities: [
			'Working closely with a dynamic 6-12 person developer team writing code largely in React and TypeScript to enable the growth of one of the top online developer communities, with a +50k monthly active user base.',
			'Coordinating with the design team and product managers to deliver several key full-stack features for our popular blogs product. Contributing to a roughly 250% increase in new blogs created by users per month since joining the team.',
			'Spearheaded an end-to-end Cypress test setup for the frontend including CI pipelines using GitHub Actions that helped increase confidence in code and decrease the number of bugs.',
			'Assisted in building and maintaining an in-house React UI library from scratch built on Radix UI, coordinating with the design team to bring consistency and accessibility across site UI/UX',
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
		image: 'university.webp',
		showCV: false,
		companyURL: 'https://www.bangor.ac.uk/',
	},
];

export const projects: Project[] = [
	{
		title: 'kieranroberts.dev (This site)',
		description:
			'My personal developer portfolio and CV showcasing my skills, experience, projects, and my recent blog posts. Built using Astro to reduce JavaScript overhead, optimized for performance and SEO.',
		date: '2024',
		githubLink: 'https://github.com/kieran6roberts/kieranroberts.dev',
		liveLink: null,
		caseStudyLink:
			'https://blog.kieranroberts.dev/kieranrobertsdev-my-new-dev-portfolio-built-with-astro-tailwindcss-and-typescript',
		image: 'portfolio.webp',
		status: ['complete'],
	},
	{
		title: 'CvrSnap',
		description:
			"CvrSnap empowers you to create great looking cover images for your blog posts using templates and simple editing tools. It's completely free to download as many images as you like. Built with React Router(v7) and provisioned by the SST(v3) Framework.",
		date: '2025',
		githubLink: 'https://github.com/kieran6roberts/cvrsnap',
		liveLink: 'https://cvrsnap.com/',
		caseStudyLink: 'https://blog.kieranroberts.dev/cvrsnapcom-blog-post-cover-image-creator',
		image: 'cvrsnap.webp',
		status: ['MVP done', 'updates planned'],
	},
	{
		title: 'SST/React-Router v7 SPA Start Kit',
		description:
			'A single page React starter kit provisioned by the SST(v3) Framework (Monorepo setup), powered by React Router framework (currently v7), TypeScript, and TailwindCSS(v4). This stack was part of the setup to build CvrSnap.',
		date: '2025',
		githubLink: 'https://github.com/kieran6roberts/sst-react-router-spa-starter-kit',
		liveLink: null,
		caseStudyLink: null,
		image: 'sst-rr-kit.webp',
		status: ['in progress'],
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
		name: 'Sandro Volpicella',
		company: 'Ex Hashnode',
		role: 'Platform Engineering Lead',
		description:
			"I've worked with Kieran for about 3 years together at Hashnode. What really impressed me is that despite Kieran's profession as a more Frontend developer, he was still able to quickly and reliably build tasks on AWS without much background in it. He was able to understand tasks fast, researched best practices and implementation details by himself, and didn't need much help to implement those. His self-driven approach to learning new technologies really stood out. Also, his preparation for code reviews and his code reviews for others was always very good and thought through. He consistently provided valuable feedback while keeping a constructive attitude. Kieran combines very strong technical knowledge about frontend, especially React, Tailwind CSS, and Next.js with a knack for design. But he also knows how to implement tasks like APIs, asynchronous tasks, or more on AWS efficiently. I'll definitely recommend him for any Fullstack or Frontend position! It was a pleasure working with him.",
		image: TestimonialImage4,
		profileURL: 'https://www.linkedin.com/in/alessandro-volpicella/',
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
	{
		name: 'Devender Shekhawat',
		company: 'Ex Hashnode',
		role: 'Senior Software Engineer',
		description:
			'I have worked with Kieran for 18 months while we built great things at Hashnode. During this time, he took sole ownership of implementing and managing the end-to-end test suites for the entire project. He has an eye for good design and demonstrates remarkable creativity when it comes to building amazing user interfaces and digital experiences. His knowledge of Frontend development and testing (React, Next.js, Cypress, etc.) is very impressive, and his attention to detail makes him a great contributor to any engineering team looking for an all-around software engineer.​​​​​​​​​​​​​​​​',
		image: TestimonialImage5,
		profileURL: 'https://www.linkedin.com/in/devender-shekhawat-659380239',
	},
];
