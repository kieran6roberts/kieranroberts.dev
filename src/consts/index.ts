export const EMAIL_ADDRESS = 'kieranroberts6dev@gmail.com';
import CoverSnapImage from '@images/cover-snap.webp';
import PortfolioImage from '@images/portfolio.webp';
import universityImage from '@images/university.webp';
export const THEME_STORAGE_KEY = 'theme';
import type { Experience, Project } from '@env';

export const Themes = {
	light: 'light',
	dark: 'dark',
} as const;

export const experience: Experience[] = [
	{
		title: 'Software Engineer',
		company: 'Hashnode',
		location: 'Remote',
		date: 'May 2021 - Present',
		type: 'Full-time',
		iconName: 'hashnode',
		responsibilities: [
			'Working closely with a dynamic 10 person developer team writing code largely in TypeScript and React, tending to a +100k active user base.',
			'Coordinating with a product manager and design team to deliver several key features for our popular blog product. Contributing to a roughly 250% increase in new blogs created per month since joining the team.',
			'Contributed to building out an in-house UI library from scratch, coordinating with the design team to bring consistency and accessibility across the site UI/UX.',
			'Spearheaded an end-to-end test setup for the frontend including a continuous integration pipeline using GitHub Actions that helped increase confidence in code and decrease the number of bugs.',
		],
		image: null,
		showCV: true,
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
	},
];

export const projects: Project[] = [
	{
		title: 'kieranroberts.dev (This site)',
		description:
			'My personal developer portfolio and playground showcasing my skills, projects, and blog. Built using Astro to reduce JavaScript overhead and optimize for performance.',
		date: '2024',
		githubLink: 'https://github.com/kieran6roberts/kieranroberts.dev',
		liveLink: null,
		caseStudyLink: null,
		image: PortfolioImage,
		status: 'in progress',
	},
	{
		title: 'CoverSnap',
		description:
			"CoverSnap empowers users to create great looking blog cover images in seconds using the editing dashboard. No design skills required and it's completely free to download final images.",
		date: '2025',
		githubLink: 'https://github.com/kieran6roberts/CoverSnap',
		liveLink: 'https://coversnap.pages.dev/',
		caseStudyLink: null,
		image: CoverSnapImage,
		status: 'in progress',
	},
];
