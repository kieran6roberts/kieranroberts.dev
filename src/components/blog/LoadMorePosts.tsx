import * as React from "react";
import {
  fetchBlogPosts,
  INITIAL_POST_COUNT,
  getPostsPaginatedData,
} from "../../utils/blog";

interface ILoadMorePosts {
  cursor: string;
  hasNextPage: boolean;
}

export const LoadMorePosts = ({ cursor, hasNextPage }: ILoadMorePosts) => {
  const [posts, setPosts] = React.useState<any[]>([]);
  const [hasNext, setHasNext] = React.useState(hasNextPage);
  const [currentCursor, setCurrentCursor] = React.useState(cursor);
  const [loading, setLoading] = React.useState(false);

  const getMore = async () => {
    setLoading(true);
    const blogPosts = await fetchBlogPosts({
      first: INITIAL_POST_COUNT,
      after: currentCursor,
    });
    const {
      cursor,
      hasNextPage: _hasNextPage,
      postsArray,
    } = getPostsPaginatedData(blogPosts);
    setPosts(postsArray);
    setCurrentCursor(cursor);
    setHasNext(_hasNextPage);
    setLoading(false);
  };

  return (
    <>
      {posts.map((post) => (
        <article>{post.title}</article>
      ))}
      {loading ? (
        <div className="p-4 text-center border opacity-50 rounded-xl">
          Loading...
        </div>
      ) : null}
      {hasNext && !loading ? (
        <button onClick={getMore} className="p-4 border rounded-xl">
          Load more posts
        </button>
      ) : null}
    </>
  );
};
