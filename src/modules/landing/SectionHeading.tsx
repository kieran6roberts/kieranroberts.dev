import { useInView, animated } from '@react-spring/web';

interface Props {
  title?: string;
  copy?: string;
}

export const SectionHeading = ({ title, copy }: Props) => {
  const [titleRef, titleSprings] = useInView(
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
        delay: 100,
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

  const [copyRef, copySprings] = useInView(
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
        delay: 200,
        duration: 300,
        tension: 120,
        friction: 14,
      },
    }),
    {
      rootMargin: '0px 0px 0px 0px',
      once: true,
    }
  );
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      {title ? (
        <animated.h2
          ref={titleRef}
          style={titleSprings}
          className="text-4xl text-center text-zinc-800 dark:text-zinc-200 xl:text-5xl font-bold"
        >
          {title}
        </animated.h2>
      ) : null}
      {copy ? (
        <animated.p
          ref={copyRef}
          style={copySprings}
          className="text-center text-sm md:text-base xl:text-lg border-t pt-4 dark:border-zinc-800 max-w-[400px] xl:max-w-[500px] mx-auto text-zinc-600 dark:text-zinc-400"
        >
          {copy}
        </animated.p>
      ) : null}
    </div>
  );
};
