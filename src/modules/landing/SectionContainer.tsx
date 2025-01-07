export const SectionContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center max-w-[1400px] mx-auto gap-8 py-16 2xl:py-28 px-4 md:px-16 lg:px-24">
      {children}
    </div>
  );
};
