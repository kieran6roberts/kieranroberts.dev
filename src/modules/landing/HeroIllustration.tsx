// import { useInView, animated } from "@react-spring/web";

export const HeroIllustration = () => {
  // const [firstImageRef, firstImageSprings] = useInView(
  //   () => ({
  //     from: {
  //       opacity: 0,
  //       y: -25,
  //     },
  //     to: {
  //       opacity: 1,
  //       y: 0,
  //     },
  //     config: {
  //       delay: 200,
  //       duration: 300,
  //       tension: 120,
  //       friction: 14,
  //     },
  //   }),
  //   {
  //     rootMargin: "0px",
  //     once: true,
  //   },
  // );
  // const [secondImageRef, secondImageSprings] = useInView(
  //   () => ({
  //     from: {
  //       opacity: 0,
  //       y: -25,
  //     },
  //     to: {
  //       opacity: 1,
  //       y: 0,
  //     },
  //     config: {
  //       delay: 0,
  //       duration: 300,
  //       tension: 120,
  //       friction: 14,
  //     },
  //   }),
  //   {
  //     rootMargin: "0px",
  //     once: true,
  //   },
  // );
  return (
    <section className="w-full bg-gray-50 dark:bg-zinc-900 border-y dark:border-zinc-800 relative w-full lg:h-[500px] 2xl:h-[700px] mb-20 flex flex-col gap-4 py-16 px-4 items-center justify-center [&>div:hover~div]:scale-90 [&>div:hover~div]:brightness-50 [&>div:has(~div:hover)]:scale-90 [&>div:has(~div:hover)]:brightness-40">
      <div className="object-cover z-20 lg:absolute shadow-xl w-full max-w-[450px] 2xl:max-w-[550px] transition-all duration-300 lg:translate-x-40 lg:rotate-6 lg:hover:rotate-0 rounded-xl lg:hover:z-30 lg:hover:scale-[110%] hover:brightness-100 brightness-[0.7]">
        <img
          // ref={firstImageRef}
          // style={firstImageSprings}
          src="/hashnode-team.webp"
          alt="Hashnode Team from 2022 posing for a team photo"
          className="w-full h-full object-cover rounded-xl"
          loading="lazy"
          width={550}
          height={550}
        />
      </div>
      <div className="object-cover lg:absolute z-10 shadow-xl w-full max-w-[450px] lg:max-w-[600px] 2xl:max-w-[700px] transition-all duration-300 lg:-translate-x-40 rounded-xl transform lg:-rotate-12 lg:hover:z-30 lg:hover:-rotate-0 lg:hover:brightness-100 brightness-[0.7]">
        <img
          // ref={secondImageRef}
          // style={secondImageSprings}
          src="/kieran-at-work.webp"
          alt="Kieran discussing a project with a coworker in person while sharing his laptop screen"
          className="w-full h-full object-cover rounded-xl"
          loading="lazy"
          width={700}
          height={700}
        />
      </div>
    </section>
  );
};
