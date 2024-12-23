import * as React from "react";
import { useInView, animated } from "@react-spring/web";

export const HeroTitle = () => {
  const [ref, titleSprings] = useInView(
    () => ({
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
      config: {
        duration: 200,
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
    <animated.h1
      ref={ref}
      style={titleSprings}
      className="font-heading tracking-tight font-medium max-w-[450px] sm:max-w-[550px] mx-auto lg:mx-0 lg:max-w-[675px] text-center lg:text-left bg-gradient-to-r from-black/95 via-black/80 to-black/75 dark:from-white/95 dark:via-white/80 dark:to-white/75 bg-clip-text text-transparent text-3xl sm:text-5xl lg:text-6xl"
    >
      Turning complex web <br />
      problems into lightning fast business solutions.
    </animated.h1>
  );
};
