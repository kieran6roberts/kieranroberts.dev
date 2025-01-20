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
