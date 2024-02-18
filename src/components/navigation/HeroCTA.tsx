import * as React from "react";
import { PcMouse, MouseButtonLeft } from "iconoir-react";
import { useHover } from "@uidotdev/usehooks";
import { animated } from "react-spring";

import { useBoop } from "../../hooks/useBoop";

const HeroCTA = () => {
  const [ref, hovering] = useHover();
  const [style, trigger] = useBoop({ y: 4, scale: 1.05, rotation: 10 });

  return (
    <a
      ref={ref}
      href="/contact"
      className="flex items-center gap-x-2 mt-8 border border-l-primary-dark font-bold rounded-2xl bg-l-tertiary-2 dark:bg-d-tertiary-2 text-l-primary-darkest px-6 py-2.5 link-focus"
      onMouseEnter={trigger as any}
    >
      <animated.span style={style as any}>
        {hovering ? <MouseButtonLeft width={16} /> : <PcMouse width={16} />}
      </animated.span>
      Work with me
    </a>
  );
};

export { HeroCTA };
