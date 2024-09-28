import {
  BlogPostsDocument,
  PostPagePostsDocument,
  type PublicationPostConnection,
  type PageInfo,
  type PostEdge,
  type Post,
} from "generated/graphql";
import { request } from "graphql-request";

const BLOG_HOSTNAME = import.meta.env.PUBLIC_BLOG_HOSTNAME;
const HASHNODE_API_URL = import.meta.env.PUBLIC_HASHNODE_API_URL;

export const INITIAL_POST_COUNT = 10;

export const fetchPaginatedBlogPosts = async ({
  first,
  after,
}: {
  first?: number | null;
  after?: string | null;
}) => {
  try {
    const blogData = await request(HASHNODE_API_URL, BlogPostsDocument, {
      host: BLOG_HOSTNAME,
      first: first ?? INITIAL_POST_COUNT,
      ...(after && { after }),
    });

    const blogPosts = blogData?.publication?.posts;
    return blogPosts;
  } catch (err) {
    throw new Error("Error fetching blog posts");
  }
};

export const getPaginatedPostPagePosts = async ({
  first,
  after,
}: {
  first?: number | null;
  after?: string | null;
}) => {
  try {
    const blogData = await request(HASHNODE_API_URL, PostPagePostsDocument, {
      host: BLOG_HOSTNAME,
      first: first ?? INITIAL_POST_COUNT,
      ...(after && { after }),
    });

    const blogPosts = blogData?.publication?.posts;
    return blogPosts;
  } catch (err) {
    throw new Error("Error fetching blog posts");
  }
};

export const getAllPostPagePosts = async () => {
  let currentCursor: string | undefined | null = "";
  let hasNext = true;
  let posts: Post[] = [];

  while (hasNext) {
    const blogPostData = await getPaginatedPostPagePosts({
      first: 20,
      ...(currentCursor && { after: currentCursor }),
    });
    if (blogPostData) {
      const { cursor, hasNextPage, postsArray } = getPostsPaginatedData(
        blogPostData as any,
      );

      posts = [...posts, ...postsArray];
      currentCursor = cursor;
      hasNext = !!hasNextPage;
    }
  }
  return posts;
};

export const getPostsPaginatedData = (
  blogPosts: PublicationPostConnection[] & {
    pageInfo: PageInfo;
    edges: [PostEdge];
  },
) => {
  return {
    cursor: blogPosts.pageInfo.endCursor,
    hasNextPage: blogPosts.pageInfo.hasNextPage,
    postsArray: (blogPosts?.edges || []).map((pwn) => ({ ...pwn.node })),
  };
};
