export const EMAIL_ADDRESS = 'kieranroberts6dev@gmail.com';
import universityImage from '@images/university.webp';

export const THEME_STORAGE_KEY = 'theme';

export const Themes = {
	light: 'light',
	dark: 'dark',
} as const;

export type Experience = {
	title: string;
	company: string;
	location: string;
	date: string;
	type: string;
	iconName: string;
	responsibilities: string[];
	image: ImageMetadata | null;
	showCV: boolean;
};

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

export const education = [
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
