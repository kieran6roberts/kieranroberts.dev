import * as React from "react";
import {
  fetchPaginatedBlogPosts,
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
    const blogPosts = await fetchPaginatedBlogPosts({
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
        <article>
          <a className="flex flex-col gap-y-2" href={`/blog/${post.slug}`}>
            <h2 className="max-w-[450px] mx-auto text-center prose-xl dark:prose-invert">
              {post.title}
            </h2>
            <p className="prose dark:prose-invert">{post.brief}</p>
          </a>
        </article>
      ))}
      {loading ? (
        <div className="p-4 mx-auto text-center border opacity-50 rounded-xl">
          Loading...
        </div>
      ) : null}
      {hasNext && !loading ? (
        <button onClick={getMore} className="mx-auto p-4 border rounded-xl">
          Load more posts
        </button>
      ) : null}
    </>
  );
};
