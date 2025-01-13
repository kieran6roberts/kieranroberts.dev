import { Themes } from '@consts';

export type Theme = (typeof Themes)[keyof typeof Themes];

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
	companyURL: string;
};

export type BlogPost = {
	id: string;
	title: string;
	slug: string;
	publishedAt: string;
	url: string;
	brief: string;
	readTimeInMinutes: number;
	coverImage: {
		url: string;
	};
};

export type BlogPostsQueryResponse = {
	publication: {
		id: string;
		posts: {
			edges: {
				node: BlogPost;
			}[];
		};
	};
};

export type Project = {
	title: string;
	description: string;
	date: string;
	githubLink: string;
	liveLink: string | null;
	caseStudyLink: string | null;
	image: ImageMetadata;
	status: 'complete' | 'in progress' | 'planned';
};

export type Testimonial = {
	name: string;
	company: string;
	role: string;
	description: string;
	image: ImageMetaData;
	profileURL: string;
};
