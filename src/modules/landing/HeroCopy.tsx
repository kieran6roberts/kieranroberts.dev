import * as React from "react";
import { useInView, animated } from "@react-spring/web";

export const HeroCopy = () => {
  const [ref, copySprings] = useInView(
    () => ({
      from: {
        opacity: 0,
        y: -25,
      },
      to: {
        opacity: 1,
        y: 0,
      },
      config: {
        delay: 800,
        duration: 300,
        tension: 120,
        friction: 14,
      },
    }),
    {
      rootMargin: "0px",
      once: true,
    },
  );

  return (
    <animated.p
      ref={ref}
      style={copySprings}
      className="text-base text-center lg:text-left tracking-tight sm:text-xl text-zinc-600 dark:text-zinc-300 max-w-[80%] lg:max-w-[525px] mx-auto lg:mx-0"
    >
      I am a JavaScript focused problem solver with a passion for building
      interactive UI's and delivering a top UX. With multiple years worth of
      industry experience, I build fast & accessible products for the web that
      last.
    </animated.p>
  );
};
