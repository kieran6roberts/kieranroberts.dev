import { useInView, animated } from '@react-spring/web';

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
      rootMargin: '0px',
      once: true,
    }
  );

  return (
    <animated.h1
      ref={ref}
      style={titleSprings}
      className="font-heading tracking-tight font-semibold max-w-[450px] sm:max-w-[600px] mx-auto lg:mx-0 lg:max-w-[850px] 2xl:max-w-[1100px] text-center bg-gradient-to-r from-black/95 via-black/80 to-black/75 dark:from-white/95 dark:via-white/80 dark:to-white/75 bg-clip-text text-transparent text-4xl sm:text-6xl lg:text-7xl/[75px] 2xl:text-8xl/[100px]"
    >
      I turn complex web <mark className="bg-yellow-300/50 dark:bg-yellow-100/90">problems</mark>{' '}
      into lightning fast business{' '}
      <mark className="bg-yellow-300/50 dark:bg-yellow-100/90">solutions.</mark>
    </animated.h1>
  );
};
