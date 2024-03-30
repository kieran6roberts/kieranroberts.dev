import * as React from "react";
import { NavArrowDown, EmojiLookDown } from "iconoir-react";
import {
  fetchPaginatedBlogPosts,
  INITIAL_POST_COUNT,
  getPostsPaginatedData,
} from "@utils/blog";
import { ArticleCard } from "@components/ArticleCard";
import { Button } from "@components/Button";

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
        <a href={`/blog/${post.slug}`} className="block">
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
          startIcon={<EmojiLookDown width={24} height={24} />}
          variant="transparent"
          width="full"
          disabled
          type="button"
        />
      ) : null}
      {hasNext && !loading ? (
        <Button
          onClick={getMore}
          endIcon={<NavArrowDown width={24} height={24} />}
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
