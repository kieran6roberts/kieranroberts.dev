type Status = 'complete' | 'in progress' | 'planned' | 'MVP done' | 'updates planned';

export type Project = {
	title: string;
	description: string;
	date: string;
	githubLink: string;
	liveLink: string | null;
	caseStudyLink: string | null;
	image: string;
	status: Status[];
};
