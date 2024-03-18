import * as React from "react";
import { NavArrowDown, EmojiLookDown } from "iconoir-react";
import {
  fetchPaginatedBlogPosts,
  INITIAL_POST_COUNT,
  getPostsPaginatedData,
} from "../../utils/blog";
import { useBoop } from "../../hooks/useBoop";
import { useSpring, animated } from "react-spring";

interface ILoadMorePosts {
  cursor: string;
  hasNextPage: boolean;
}

export const LoadMorePosts = ({ cursor, hasNextPage }: ILoadMorePosts) => {
  const [posts, setPosts] = React.useState<any[]>([]);
  const [hasNext, setHasNext] = React.useState(hasNextPage);
  const [currentCursor, setCurrentCursor] = React.useState(cursor);
  const [loading, setLoading] = React.useState(false);

  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [style, trigger] = useBoop({ y: 4 });

  const loadingSpring = useSpring({
    from: { y: 0, transform: "scale(1)" },
    to: [
      { y: 3, transform: "scale(1.1)" },
      { y: 0, transform: "scale(1)" },
    ],
    loop: true,
  });

  const loadingIconStyle = {
    ...loadingSpring,
  };
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
        <div className="flex items-center mt-12 justify-center gap-2 w-full font-medium mx-auto px-4 py-3 border-2 bg-[#100114] text-white border-[#100114] dark:border-d-tertiary-2 rounded-full">
          <animated.span style={loadingIconStyle}>
            <EmojiLookDown width={24} height={24} />
          </animated.span>
        </div>
      ) : null}
      {hasNext && !loading ? (
        <animated.button
          ref={buttonRef}
          onClick={getMore}
          onMouseEnter={trigger as any}
          className="flex items-center mt-12 justify-center gap-2 w-full font-medium mx-auto px-4 py-3 border-2 bg-[#100114] text-white border-[#100114] dark:border-d-tertiary-2 rounded-full link-focus"
        >
          Show more
          <animated.span style={style as any}>
            <NavArrowDown width={24} height={24} />
          </animated.span>
        </animated.button>
      ) : null}
    </>
  );
};
