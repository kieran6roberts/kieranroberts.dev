import * as React from "react";
import { animated } from "react-spring";

import { RSSSVG } from "@components/icons";
import { useBoop } from "@hooks/useBoop";
import { BLOG_URL } from "@consts/urls";

export const RSSLink = () => {
  const { styleToApplyOnBoop, handleBoopTrigger } = useBoop({
    scale: 1.1,
  });
  return (
    <a
      href={`${BLOG_URL}/rss.xml`}
      title="Kieran6Dev RSS feed"
      className="flex items-center justify-center p-1.5 rounded-full outline-none link-focus icon-button-hover"
      onMouseEnter={handleBoopTrigger}
      {...(styleToApplyOnBoop && { style: styleToApplyOnBoop })}
    >
      <animated.span
        style={styleToApplyOnBoop}
        className="block text-black dark:text-white w-6 h-6"
      >
        <RSSSVG />
      </animated.span>
    </a>
  );
};
