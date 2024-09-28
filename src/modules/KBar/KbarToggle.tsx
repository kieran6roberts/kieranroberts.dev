import * as React from "react";
import { useKBar } from "kbar";
import { animated } from "react-spring";

import { SearchSVG } from "@components/icons";
import { useBoop } from "@hooks/useBoop";

export const KBarToggle = () => {
  const { query } = useKBar();
  const btnRef = React.useRef<HTMLButtonElement>(null);

  const { styleToApplyOnBoop, handleBoopTrigger } = useBoop({ scale: 0.9 });

  // const onKBarClose = () => {
  //   if (btnRef.current) {
  //     btnRef.current.focus();
  //   }
  // };

  return (
    <button
      ref={btnRef}
      {...(styleToApplyOnBoop && { style: styleToApplyOnBoop })}
      onMouseEnter={handleBoopTrigger}
      className="hidden md:flex items-center justify-center px-2 rounded-md text-l-secondary dark:text-d-tertiary-2 border border-l-secondary dark:border-d-tertiary-2 outline-none link-focus icon-button-hover"
      type="button"
      onMouseDown={query.toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          query.toggle();
        }
      }}
      aria-label="Open site search"
    >
      <SearchSVG />
      <kbd className="flex gap-px text-sm items-center">
        <animated.span
          {...(styleToApplyOnBoop && { style: styleToApplyOnBoop })}
          className="text-xl"
        >
          ⌘
        </animated.span>
        K
      </kbd>
    </button>
  );
};
