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
