const BLOG_HOSTNAME = "blog.kieranroberts.dev"
const HASHNODE_API_URL = "https://gql.hashnode.com"

export const INITIAL_POST_COUNT = 10;

const postPagePostsQuery = `
 query PostPagePosts($host: String!, $first: Int!, $after: String) {
  publication(host: $host) {
    id
    posts(first: $first, after: $after) {
      edges {
        node {
          slug
          content {
           markdown
         }
         title
         subtitle
         coverImage {
          url
         }
         readTimeInMinutes
        }
        cursor
      }
      pageInfo {
       hasNextPage
       endCursor
     }
    }
  }
 }`
;

const postsQuery = `
 query BlogPosts($host: String!, $after: String, $first: Int!) {
   publication(host: $host) {
     id
     posts(after: $after, first: $first) {
       edges {
         node {
           __typename
           id
           title
           slug
           publishedAt
           url
           subtitle
           brief
           readTimeInMinutes
           views
           author {
             __typename
             id
             username
             name
             profilePicture
           }
           coverImage {
             __typename
             url
           }
         }
         cursor
       }
       pageInfo {
         hasNextPage
         endCursor
       }
     }
   }
 }`
;

export const fetchPaginatedBlogPosts = async ({ first, after }: { first?: number | null; after?: string | null }) => {
 try {
  const blogResponse = await fetch(HASHNODE_API_URL, {
   method: "POST",
   headers: {
     "Content-Type": "application/json",
   },
   body: JSON.stringify({
     query: postsQuery,
     variables: {
       host: BLOG_HOSTNAME,
       first: first ?? INITIAL_POST_COUNT,
       ...(after && { after })
     },
   }),
 });
 const blogData = await blogResponse.json();
 const blogPosts = blogData?.data?.publication?.posts ?? [];
 return blogPosts;
 } catch(err) {
  throw new Error('Error fetching blog posts');
 }
}; 

export const getPaginatedPostPagePosts = async ({ first, after }: { first?: number | null, after?: string | null }) => {
 try {
  const blogResponse = await fetch(HASHNODE_API_URL, {
   method: "POST",
   headers: {
     "Content-Type": "application/json",
   },
   body: JSON.stringify({
     query: postPagePostsQuery,
     variables: {
       host: BLOG_HOSTNAME,
       first: first ?? INITIAL_POST_COUNT,
       ...(after && { after })
     },
   }),
 });
 const blogData = await blogResponse.json();
 const blogPosts = blogData?.data?.publication?.posts ?? [];
 return blogPosts;
 } catch(err) {
  throw new Error('Error fetching blog posts');
 }
};

// Hashnode API only gives paginated posts
export const getAllPostPagePosts = async () => {
 let currentCursor = '';
 let hasNext = true;
 let posts: any[] = [];

 while (hasNext) {
   const blogPostData = await getPaginatedPostPagePosts({ 
    first: 20, 
    ...(currentCursor && { after: currentCursor })
   });
   const { cursor, hasNextPage, postsArray } = getPostsPaginatedData(blogPostData);

   posts = [...posts, ...postsArray];
   currentCursor = cursor;
   hasNext = hasNextPage;
 }
 return posts;
};

export const getPostsPaginatedData = (blogPosts: {
 edges: any[];
 pageInfo: {
  hasNextPage: boolean;
  endCursor: string;
 };
}) => {
 return ({
  cursor: blogPosts.pageInfo.endCursor,
  hasNextPage: blogPosts.pageInfo.hasNextPage,
  postsArray: (blogPosts?.edges || []).map((pwn) => ({ ...pwn.node }))
})
};