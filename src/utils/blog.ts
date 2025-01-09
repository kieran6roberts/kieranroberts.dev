import { gql, request } from 'graphql-request';
import type { BlogPostsQueryResponse } from '@/env';

const BLOG_HOSTNAME = 'blog.kieranroberts.dev';
const HASHNODE_API_URL = 'https://gql.hashnode.com';

export const INITIAL_POST_COUNT = 3;

const BlogPostsDocument = gql`
	query BlogPosts($host: String!, $first: Int!) {
		publication(host: $host) {
			id
			posts(first: $first) {
				edges {
					node {
						id
						title
						slug
						publishedAt
						url
						brief
						readTimeInMinutes
						coverImage {
							url
						}
					}
				}
			}
		}
	}
`;

export const fetchBlogPosts = async ({ first }: { first?: number | null }) => {
	try {
		const blogData: BlogPostsQueryResponse = await request(HASHNODE_API_URL, BlogPostsDocument, {
			host: BLOG_HOSTNAME,
			first: first ?? INITIAL_POST_COUNT,
		});

		const blogPosts = blogData?.publication?.posts;
		const posts = blogPosts?.edges.map((edge) => edge.node) ?? [];
		return posts;
	} catch (err) {
		return [];
	}
};
