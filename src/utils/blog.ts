import {
  BlogPostsDocument,
  PostPagePostsDocument,
  type BlogPostsQuery,
  type PostPagePostsQuery,
} from "generated/graphql";
import { request } from "graphql-request";

const BLOG_HOSTNAME = "blog.kieranroberts.dev";
const HASHNODE_API_URL = "https://gql.hashnode.com";

export const INITIAL_POST_COUNT = 10;

export type BlogPosts = NonNullable<BlogPostsQuery["publication"]>["posts"];
export type PostPagePosts = NonNullable<
  PostPagePostsQuery["publication"]
>["posts"];

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
    return blogPosts ?? null;
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
    return blogPosts ?? null;
  } catch (err) {
    throw new Error("Error fetching blog posts");
  }
};

export const getAllPostPagePosts = async () => {
  let currentCursor: string | undefined | null = "";
  let hasNext = true;
  let posts: ReturnType<
    typeof getPostsPaginatedData<PostPagePosts>
  >["postsArray"] = [];

  while (hasNext) {
    const blogPostData = await getPaginatedPostPagePosts({
      first: 20,
      ...(currentCursor && { after: currentCursor }),
    });
    if (blogPostData) {
      const { cursor, hasNextPage, postsArray } =
        getPostsPaginatedData(blogPostData);

      posts = [...posts, ...postsArray];
      currentCursor = cursor;
      hasNext = !!hasNextPage;
    }
  }
  return posts;
};

export const getPostsPaginatedData = <T extends BlogPosts | PostPagePosts>(
  blogPosts: T,
) => {
  return {
    cursor: blogPosts?.pageInfo?.endCursor,
    hasNextPage: blogPosts?.pageInfo?.hasNextPage,
    postsArray: (blogPosts?.edges || []).map((pwn) => ({ ...pwn.node })),
  };
};
