export const SectionContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col items-center justify-center max-w-[1400px] mx-auto gap-8 pt-12 pb-24 px-4 md:px-8 lg:px-16">
      {children}
    </div>
  );
};
