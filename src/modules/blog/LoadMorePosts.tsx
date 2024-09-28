import * as React from "react";
import { NavArrowDownSVG, EmojiLookDownSVG } from "@components/icons";
import {
  fetchPaginatedBlogPosts,
  INITIAL_POST_COUNT,
  getPostsPaginatedData,
} from "@utils/blog";
import { ArticleCard } from "@modules/blog/ArticleCard";
import { Button } from "@components/base/Button";

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
    } = getPostsPaginatedData(blogPosts as any);
    setPosts(postsArray);
    setCurrentCursor(cursor as any);
    setHasNext(_hasNextPage as any);
    setLoading(false);
  };

  return (
    <>
      {posts.map((post) => (
        <a href={`/blog/${post.slug}`} key={post.id} className="block">
          <ArticleCard
            title={post.title}
            description={post.brief}
            date={post.publishedAt}
            options={{ formatDate: true }}
          />
        </a>
      ))}
      {loading ? (
        <Button
          onClick={() => {}}
          startIcon={
            <span className="block w-6 h-6 text-white">
              <EmojiLookDownSVG />
            </span>
          }
          variant="transparent"
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
          variant="transparent"
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