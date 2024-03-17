// const BLOG_HOSTNAME = import.meta.env.PUBLIC_BLOG_HOSTNAME;
// const HASHNODE_API_URL = import.meta.env.HASHNODE_API_URL;

const BLOG_HOSTNAME = "blog.kieranroberts.dev"
const HASHNODE_API_URL = "https://gql.hashnode.com"

export const INITIAL_POST_COUNT = 10;

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

export const fetchBlogPosts = async ({ first, after }: { first?: number | null; after?: string | null }) => {
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