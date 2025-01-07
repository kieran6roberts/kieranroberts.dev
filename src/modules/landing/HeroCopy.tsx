import { useInView, animated } from '@react-spring/web';

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
      rootMargin: '0px',
      once: true,
    }
  );

  return (
    <animated.p
      ref={ref}
      style={copySprings}
      className="text-base md:text-lg text-center font-medium tracking-tight text-zinc-700 dark:text-zinc-200 max-w-[90%] md:max-w-[625px] mx-auto"
    >
      I am a JavaScript-focused problem solver with a passion for building interactive user
      interfaces, and delivering an exceptional user experience. With several years of industry
      experience, I create fast and accessible web products that last.
    </animated.p>
  );
};
