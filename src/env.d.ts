import {
	BlogPostsDocument,
	PostPagePostsDocument,
	type BlogPostsQuery,
	type PostPagePostsQuery,
} from 'generated/graphql';

export type BlogPosts = NonNullable<BlogPostsQuery['publication']>['posts'];
export type PostPagePosts = NonNullable<PostPagePostsQuery['publication']>['posts'];

export type Experience = {
	title: string;
	company: string;
	location: string;
	date: string;
	type: string;
	logo: React.ReactNode;
	responsibilities: string[];
	image: ImageMetadata | null;
};
