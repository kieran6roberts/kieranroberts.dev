import * as React from "react";
import { animated } from "react-spring";

import { RSSSVG } from "@components/icons";
import { useBoop } from "@hooks/useBoop";

export const RSSLink = () => {
  const { styleToApplyOnBoop, handleBoopTrigger } = useBoop({
    rotation: 10,
    y: 2,
    x: 2,
  });
  return (
    <a
      href="/blog/rss.xml"
      title="Kieran6Dev RSS feed"
      className="flex items-center justify-center text-white p-2 rounded-full outline-none focus:ring ring-offset-gray-900 ring-offset-4 ring-d-tertiary-2 icon-button-hover"
      onMouseEnter={handleBoopTrigger}
      {...(styleToApplyOnBoop && { style: styleToApplyOnBoop })}
    >
      <animated.span
        style={styleToApplyOnBoop}
        className="block text-white w-6 h-6"
      >
        <RSSSVG />
      </animated.span>
    </a>
  );
};
