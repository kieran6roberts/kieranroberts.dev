import { useInView, animated } from "@react-spring/web";

export const HeroIllustration = () => {
  const [firstImageRef, firstImageSprings] = useInView(
    () => ({
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
      config: {
        delay: 200,
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
  const [secondImageRef, secondImageSprings] = useInView(
    () => ({
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
      config: {
        delay: 0,
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
    <section className="w-full bg-gray-50 dark:bg-zinc-900 border-y dark:border-zinc-800 relative w-full mb-20 flex flex-col items-center justify-center gap-4 py-16 px-4">
      <p className="relative -top-8 text-center text-zinc-400 dark:text-zinc-600">
        I love to collaborate with others
        <div className="absolute -bottom-1 left-0 right-0 w-3/4 mx-auto h-px bg-zinc-200 dark:bg-zinc-800 rounded-full" />
      </p>

      <div className="relative w-full flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-0 [&>div:hover~div]:scale-90 [&>div:hover~div]:brightness-50 [&>div:has(~div:hover)]:scale-90 [&>div:has(~div:hover)]:brightness-50">
        <animated.div
          ref={firstImageRef}
          style={firstImageSprings}
          className="object-cover z-20 shadow-xl w-full max-w-[450px] lg:max-w-[550px] transition-all duration-300 lg:translate-x-20 lg:rotate-6 lg:hover:rotate-0 rounded-xl lg:hover:z-30 lg:hover:scale-105 hover:brightness-100 brightness-[0.8]"
        >
          <img
            src="/hashnode-team.webp"
            alt="Hashnode Team from 2022 posing for a team photo"
            className="w-full h-full object-cover rounded-xl"
            loading="lazy"
            width={550}
            height={550}
          />
        </animated.div>

        <animated.div
          ref={secondImageRef}
          style={secondImageSprings}
          className="object-cover z-10 shadow-xl w-full max-w-[450px] lg:max-w-[550px] transition-all duration-300 lg:-translate-x-20 rounded-xl transform lg:-rotate-[5deg] lg:hover:z-30 lg:hover:scale-105 lg:hover:-rotate-0 lg:hover:brightness-100 brightness-[0.8]"
        >
          <img
            src="/kieran-at-work.webp"
            alt="Kieran discussing a project with a coworker in person while sharing his laptop screen"
            className="w-full h-full object-cover rounded-xl"
            loading="lazy"
            width={550}
            height={550}
          />
        </animated.div>
      </div>
    </section>
  );
};
