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
