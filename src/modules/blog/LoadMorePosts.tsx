import * as React from "react";

import { NavArrowDownSVG, EmojiLookDownSVG } from "@components/icons";
import {
  fetchPaginatedBlogPosts,
  INITIAL_POST_COUNT,
  getPostsPaginatedData,
  type PostPagePosts,
} from "@utils/blog";
import { BlogCard } from "@modules/blog/BlogCard";
import { Button } from "@components/base/Button";
import { BLOG_URL } from "@consts/urls";

interface ILoadMorePosts {
  cursor: string | null | undefined;
  hasNextPage: boolean;
}

export const LoadMorePosts = ({ cursor, hasNextPage }: ILoadMorePosts) => {
  const [posts, setPosts] = React.useState<
    ReturnType<typeof getPostsPaginatedData<PostPagePosts>>["postsArray"]
  >([]);
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
    } = getPostsPaginatedData(blogPosts!);
    setPosts(postsArray);
    setCurrentCursor(cursor);
    setHasNext(_hasNextPage!);
    setLoading(false);
  };

  return (
    <>
      {posts.map((post) => (
        <a href={`${BLOG_URL}/${post.slug}`} key={post.id} className="block">
          <BlogCard
            title={post.title}
            description={post.brief}
            date={post.publishedAt}
            options={{ formatDate: true }}
          />
        </a>
      ))}
      {loading ? (
        <Button
          startIcon={
            <span className="block w-6 h-6 text-white">
              <EmojiLookDownSVG />
            </span>
          }
          width="full"
          disabled
          type="button"
        />
      ) : null}
      {hasNext && !loading ? (
        <Button
          onClick={getMore}
          endIcon={
            <span className="block w-6 h-6 text-white">
              <NavArrowDownSVG />
            </span>
          }
          iconAnimationSettings={{ y: 4 }}
          width="full"
          type="button"
        >
          Show more posts
        </Button>
      ) : null}
      {!hasNext && !loading ? (
        <h2 className="font-header text-center text-2xl my-12">The end</h2>
      ) : null}
    </>
  );
};
